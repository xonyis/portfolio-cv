const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: '*' } })

// Stockage en mémoire
const generalMessages = []
const julianConversations = {} // { username: [messages...] }
const connectedUsers = new Set()

io.on('connection', (socket) => {
  socket.on('set username', (username) => {
    socket.username = username
    connectedUsers.add(username)

    // Envoie l'historique général
    socket.emit('chat history', { room: 'general', messages: generalMessages })

    // Envoie l'historique privé
    if (username === "Julian") {
      // Julian reçoit toutes ses conversations privées
      Object.entries(julianConversations).forEach(([user, messages]) => {
        socket.emit('chat history', { room: 'julian', user, messages })
      })
      // Julian reçoit la liste des utilisateurs pour la sidebar
      socket.emit('private users', Array.from(Object.keys(julianConversations)))
    } else {
      // Un utilisateur reçoit sa conversation privée avec Julian
      socket.emit('chat history', { room: 'julian', user: username, messages: julianConversations[username] || [] })
    }
  })

  socket.on('chat message', (msg) => {
    if (msg.room === "general") {
      generalMessages.push(msg)
      io.emit('chat message', msg)
    } else if (msg.room === "julian") {
      // msg.user = expéditeur, msg.to = destinataire (si Julian)
      const targetUser = msg.user === "Julian" ? msg.to : msg.user
      if (!julianConversations[targetUser]) julianConversations[targetUser] = []
      julianConversations[targetUser].push(msg)

      // Envoie à l'utilisateur destinataire et à Julian (si connecté)
      io.sockets.sockets.forEach((s) => {
        if ((s.username === targetUser && targetUser !== "Julian") || s.username === "Julian") {
          s.emit('chat message', msg)
        }
      })
      // Met à jour la liste des users privés pour Julian
      io.sockets.sockets.forEach((s) => {
        if (s.username === "Julian") {
          s.emit('private users', Array.from(Object.keys(julianConversations)))
        }
      })
    }
  })

  socket.on('disconnect', () => {
    if (socket.username) {
      connectedUsers.delete(socket.username)
    }
  })
})

server.listen(3001, () => console.log('Socket.io server running'))