import React, { useState, useEffect, useRef } from "react"
import { io, Socket } from "socket.io-client"

const protocol = 'https:'
const SOCKET_URL = `${protocol}//vps.julianmayer.fr`;

type Message = {
  user: string
  text: string
  room: "general" | "julian"
}

export default function Chattioo() {
  const [username, setUsername] = useState<string>("")
  const [input, setInput] = useState("")
  const [activeRoom, setActiveRoom] = useState<{room: "general" | "julian", user?: string}>({room: "general"})
  const [privateUsers, setPrivateUsers] = useState<string[]>([])
  const [privateMessages, setPrivateMessages] = useState<{[user: string]: Message[]}>({})
  const [generalMessages, setGeneralMessages] = useState<Message[]>([])
  const socketRef = useRef<Socket | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Récupère ou demande le pseudo
  useEffect(() => {
    let stored = localStorage.getItem("username")
    if (!stored) {
      stored = prompt("Choisis un pseudo !") || "Anonyme"
      localStorage.setItem("username", stored)
    }
    setUsername(stored)
  }, [])

  // Connexion socket
  useEffect(() => {
    if (!username) return
    socketRef.current = io(SOCKET_URL, {
      path: '/socket.io/',
      transports: ['websocket', 'polling'],
      secure: protocol === 'https:',
    })
    socketRef.current.emit("set username", username)
    socketRef.current.on("private users", (users: string[]) => setPrivateUsers(users))
    socketRef.current.on("chat history", (data) => {
      if (data.room === "general") setGeneralMessages(data.messages)
      else if (data.room === "julian" && data.user) {
        setPrivateMessages(prev => ({...prev, [data.user]: data.messages}))
      }
    })
    socketRef.current.on("chat message", (msg: any) => {
      if (msg.room === "general") {
        setGeneralMessages(prev => [...prev, msg])
      } else if (msg.room === "julian") {
        let key = msg.user
        if (username === "Julian" && msg.user === "Julian" && msg.to) {
          key = msg.to
        } else if (username !== "Julian" && msg.user === "Julian" && msg.to === username) {
          // L'utilisateur courant reçoit un message privé de Julian
          key = username
        }
        setPrivateMessages(prev => ({
          ...prev,
          [key]: [...(prev[key] || []), msg]
        }))
      }
    })
    return () => {
      socketRef.current?.disconnect()
    }
  }, [username])

  // Scroll auto
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [generalMessages, privateMessages, activeRoom])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || !socketRef.current) return
    if (activeRoom.room === "general") {
      socketRef.current.emit("chat message", { user: username, text: input, room: "general" })
    } else if (activeRoom.room === "julian") {
      if (username === "Julian" && !activeRoom.user) return // Empêche l'envoi sans destinataire
      const msg: any = { user: username, text: input, room: "julian" }
      if (username === "Julian") msg.to = activeRoom.user
      socketRef.current.emit("chat message", msg)
    }
    setInput("")
  }

  // Sidebar dynamique
  let sidebarItems: {id: string, name: string, user?: string}[] = []
  if (username === "Julian") {
    sidebarItems = [
      {id: "general", name: "Général"},
      ...privateUsers
        .filter(u => u !== "Julian")
        .map(u => ({id: `julian-${u}`, name: u, user: u}))
    ]
  } else {
    sidebarItems = [
      {id: "general", name: "Général"},
      {id: "julian", name: "Julian", user: username}
    ]
  }

  // Affichage des messages selon la room
  let messagesToShow: Message[] = []
  if (activeRoom.room === "general") {
    messagesToShow = generalMessages
  } else if (activeRoom.room === "julian") {
    const userForPrivate = username === "Julian" ? activeRoom.user : username
    messagesToShow = privateMessages[userForPrivate || ""] || []
  }

  // Fonction pour savoir si un item est actif
  const isSidebarItemActive = (item: {id: string, user?: string}) => {
    if (item.id === "general" && activeRoom.room === "general") return true
    if (item.id.startsWith("julian-") && username === "Julian" && activeRoom.room === "julian" && activeRoom.user === item.user) return true
    if (item.id === "julian" && username !== "Julian" && activeRoom.room === "julian") return true
    return false
  }

  return (
    <div className="flex h-full bg-gray-100 s shadow-lg border border-gray-300 w-full mx-auto">
      {/* Sidebar */}
      <div className="w-40 bg-gray-200 border-r border-gray-300 flex flex-col">
        <div className="font-bold text-center py-2 bg-blue-600 text-white ">Conversations</div>
        <div className="flex-1 overflow-y-auto">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              className={`w-full text-left text-gray-800 px-4 py-2 hover:bg-blue-100 focus:outline-none ${isSidebarItemActive(item) ? "bg-blue-200 " : ""}`}
              onClick={() => {
                if (item.id === "general") setActiveRoom({room: "general"})
                else setActiveRoom({room: "julian", user: item.user})
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
      {/* Chat */}
      <div className="flex flex-col flex-1 h-full">
        <div className="bg-blue-600 text-white px-4 py-2 font-bold text-center ">
          {username === "Julian" && activeRoom.room === "julian" && activeRoom.user ? `Julian & ${activeRoom.user}` :
            username !== "Julian" && activeRoom.room === "julian" ? `Julian` :
            "Général"} 💬
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messagesToShow.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.user === username ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-3 py-2 rounded-lg max-w-xs break-words ${
                  msg.user === username
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <span className="block text-xs font-bold mb-1">{msg.user}</span>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSend} className="flex p-2 border-t text-gray-800  border-gray-200 bg-white rounded-b-lg">
          <input
            type="text"
            className="flex-1 px-3 py-2 rounded-l-lg border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Écris un message…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={username === "Julian" && activeRoom.room === "julian" && !activeRoom.user}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition"
            disabled={username === "Julian" && activeRoom.room === "julian" && !activeRoom.user}
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  )
}