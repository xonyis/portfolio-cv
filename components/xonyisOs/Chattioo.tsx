import React, { useState, useRef, useEffect } from "react"

type Message = {
  id: number
  text: string
  sender: "user" | "bot"
}

type Conversation = {
  id: number
  name: string
  messages: Message[]
}

export default function Chattioo() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      name: "Support",
      messages: [
        { id: 1, text: "Bonjour ! Comment puis-je t'aider ?", sender: "bot" }
      ]
    },
    {
      id: 2,
      name: "Julian",
      messages: [
        { id: 1, text: "Salut Julian !", sender: "bot" }
      ]
    }
  ])
  const [activeConvId, setActiveConvId] = useState(1)
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const activeConv = conversations.find(c => c.id === activeConvId)!

  // Scroll automatique vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [activeConv.messages])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    setConversations(convs => convs.map(conv =>
      conv.id === activeConvId
        ? { ...conv, messages: [...conv.messages, { id: Date.now(), text: input, sender: "user" }] }
        : conv
    ))
    setInput("")
    // Ici tu peux ajouter une réponse automatique ou appeler une API
  }

  return (
    <div className="flex h-full bg-gray-100 rounded-lg shadow-lg border border-gray-300 max-w-2xl mx-auto">
      {/* Sidebar */}
      <div className="w-40 bg-gray-200 border-r border-gray-300 flex flex-col">
        <div className="font-bold text-center py-2 bg-blue-600 text-white rounded-tl-lg">Conversations</div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map(conv => (
            <button
              key={conv.id}
              className={`w-full text-left px-4 py-2 hover:bg-blue-100 focus:outline-none ${activeConvId === conv.id ? "bg-blue-200 font-semibold" : ""}`}
              onClick={() => setActiveConvId(conv.id)}
            >
              {conv.name}
            </button>
          ))}
        </div>
        <button
          className="m-2 py-1 px-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => {
            const newId = Date.now()
            setConversations([...conversations, { id: newId, name: `Conv ${newId}`, messages: [] }])
            setActiveConvId(newId)
          }}
        >
          + Nouvelle
        </button>
      </div>
      {/* Chat */}
      <div className="flex flex-col flex-1 h-full">
        {/* Header */}
        <div className="bg-blue-600 text-white px-4 py-2 font-bold text-center rounded-tr-lg">{activeConv.name} 💬</div>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {activeConv.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-3 py-2 rounded-lg max-w-xs break-words ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {/* Input */}
        <form onSubmit={handleSend} className="flex p-2 border-t border-gray-200 bg-white rounded-b-lg">
          <input
            type="text"
            className="flex-1 px-3 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Écris un message…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  )
}