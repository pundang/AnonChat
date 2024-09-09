"use client"

import { useEffect, useState, useRef } from "react"
import { socket } from "./lib/socket"
import { Message } from "@/utils/interfaces"
import Chat from "./components/chat"

export default function Home() {
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected)
  const [messages, setMessages] = useState<Message[]>([])
  const msgInput = useRef("")

  function onConnect() {
    setIsConnected(true)
  }

  function onDisconnect() {
    setIsConnected(false)
  }

  function onMessage(value: string) {
    const message: Message = JSON.parse(value)

    setMessages((previous) => [...previous, message])
  }

  useEffect(() => {
    socket.on("connect", onConnect)
    socket.on("disconnect", onDisconnect)
    socket.on("message", onMessage)

    return () => {
      socket.off("connect", onConnect)
      socket.off("disconnect", onDisconnect)
      socket.off("message", onMessage)
    }
  }, [messages])

  return (
    <main className="flex items-center justify-center h-screen w-screen bg-gradient-to-br from-[#151515] to-[#101010]">
      <Chat messages={messages} />
    </main>
  )
}
