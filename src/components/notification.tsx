"use client"

import { useParams, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { CircleX } from "lucide-react"
import { useTranslations } from "next-intl"

export default function NotificationSnackbar() {
  const params = useParams<{ locale: string }>()
  const t = useTranslations("NotificationSnackbar")
  const pathname = usePathname()
  const notifications = [
    { id: 1, user: "John Doe", plan: t("plans.sixMonth"), time: t("timeAgo.minutes", { count: 9 }) },
    { id: 2, user: "Sarah Lee", plan: t("plans.oneYear"), time: t("timeAgo.minutes", { count: 15 }) },
    { id: 3, user: "Ali Ahmed", plan: t("plans.threeMonth"), time: t("timeAgo.minutes", { count: 5 }) },
    { id: 4, user: "Maria Gonzalez", plan: t("plans.oneYear"), time: t("timeAgo.minutes", { count: 20 }) },
    { id: 5, user: "Chen Wei", plan: t("plans.sixMonth"), time: t("timeAgo.minutes", { count: 30 }) },
    { id: 6, user: "Yuki Tanaka", plan: t("plans.threeMonth"), time: t("timeAgo.minutes", { count: 40 }) },
    { id: 7, user: "Omar Hassan", plan: t("plans.oneYear"), time: t("timeAgo.minutes", { count: 50 }) },
    { id: 8, user: "Elena Petrova", plan: t("plans.sixMonth"), time: t("timeAgo.hours", { count: 1 }) },
    { id: 9, user: "Raj Patel", plan: t("plans.threeMonth"), time: t("timeAgo.minutes", { count: 10 }) },
    { id: 10, user: "Fatima Al-Farsi", plan: t("plans.oneYear"), time: t("timeAgo.minutes", { count: 20 }) },
  ]

  const [currentNotification, setCurrentNotification] = useState<any>(notifications[0])
  const [show, setShow] = useState(false)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setShow(true)
      setCurrentNotification(notifications[index])

      setTimeout(() => setShow(false), 6000) 

      setIndex((prevIndex) => (prevIndex + 1) % notifications.length)
    }, 10000) 

    return () => clearInterval(interval)
  }, [index, notifications.length, notifications[index]]) 

  return (
    <div
    style={{ display: pathname.includes("orders") ? "none" : "" }}
    className={`z-50 fixed top-16 bg-white text-black px-6 py-3 rounded-lg shadow-lg transition-all duration-500 w-80 flex items-center gap-3 
      ${show ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-5 pointer-events-none"} 
      ${params.locale === "ar" ? "right-5" : "left-5"}`}
  >
  
      <CircleX
      
        onClick={() => setShow(false)}
        className="w-4 absolute top-0 right-[4px] text-black font-extrabold cursor-pointer"
      />
      <span className="text-yellow-400 text-xl">🔔</span>
      <p className="text-sm">
        <strong>{currentNotification.user}</strong> {t("notificationMessage.part1")}{" "}
        <strong>{currentNotification.plan}</strong> {t("notificationMessage.part2")}{" "}
        <span className="opacity-80">{currentNotification.time}</span>.
      </p>
    </div>
  )
}

