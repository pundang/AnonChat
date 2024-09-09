"use client"

import { Message } from "@/utils/interfaces"
import { ABeeZee } from "next/font/google"
import { BiSend } from "react-icons/bi"
import { socket } from "@/app/lib/socket"
import { useEffect, useRef } from "react"
import Button from "./button"

const _ABeeZee = ABeeZee({
  subsets: ["latin"],
  display: "auto",
  weight: "400",
  style: "italic",
})

interface Props {
  messages: Message[]
}

export default function Chat({ messages }: Props) {
  const divRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<string>("")

  function sendMessage() {
    if (inputRef.current === "") return

    socket.send(
      JSON.stringify({
        author: "anon",
        content: inputRef.current,
      })
    )
  }

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="bg-stone-900 border-2 rounded-md size-5/6 grid grid-cols-4 grid-rows-6 overflow-clip">
      <div className="col-span-4 flex items-center px-8 bg-white/5 border-b-4 border-white/20">
        <h1 className={`text-7xl ${_ABeeZee.className}`}>AnonChat</h1>
      </div>

      <div className="col-span-1 row-span-5 text-center bg-white/5 border-r-4 border-white/20">
        <h1 className="text-2xl py-4">Channels are coming "soon..."</h1>
      </div>

      <div className="col-span-3 row-span-5 grid grid-rows-8">
        <div
          className="row-span-7 flex flex-col overflow-y-scroll scrollbar-thin"
          ref={divRef}
        >
          {messages.map((msg, index) => (
            <p key={index}>
              {msg.content} (Index: {index})
            </p>
          ))}
        </div>
        <div className="grid grid-cols-5 bg-white/5">
          <textarea
            className="bg-white/10 resize-none m-2 rounded-lg col-span-4 p-2 scrollbar-thin"
            onChange={(e) => {
              inputRef.current = e.currentTarget.value
            }}
          />
          <div className="flex items-center justify-center">
            <Button onClick={sendMessage}>
              <BiSend size={40} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
