"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

interface ToastProps {
  message: string
  type: "success" | "error"
  onClose: () => void
}

export default function Toast({ message, type, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  if (!isVisible) return null

  return (
    <div
      className={` z-50 fixed bottom-16 right-4 p-4 rounded-md shadow-lg flex items-center justify-between ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      <p className="text-white mr-4">{message}</p>
      <button onClick={onClose} className="text-white">
        <X size={20} />
      </button>
    </div>
  )
}

