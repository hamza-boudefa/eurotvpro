'use client'

import Image from "next/image"
import { addToCart, getCartItems } from "@/utils/cart"
import { useSubscription } from "@/contexts/subscription-context"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { SectionTitle } from "./SectionTitle"

const subscriptions = [
  {
    name: "ESP TV", // Plain string, not a translation key
    duration: "ESP TV", // Plain string, not a translation key
    image: "/images/esptv.png?height=100&width=100",
    price: "44€",
  },
  {
    name: "Avatar Pro", // Plain string, not a translation key
    duration: "Avatar Pro", // Plain string, not a translation key
    image: "/images/avatarpro.png?height=100&width=100",
    price: "44€",
  },
  {
    name: "Waka TV", // Plain string, not a translation key
    duration: "Waka TV", // Plain string, not a translation key
    image: "/images/wakatv.png?height=100&width=100",
    price: "35€",
  },
  {
    name: "Orca Pro Plus", // Plain string, not a translation key
    duration: "Orca Pro Plus", // Plain string, not a translation key
    image: "/images/orca.png?height=100&width=100",
    price: "49€",
  },
]

export default function SubscriptionApps() {
  const t = useTranslations("subscriptionsApp")
  const { setSubscriptionCount } = useSubscription()
  const [count, setCount] = useState(0)
  const router = useRouter()

  const handleSubscriptionChange = (subscription: any) => {
    console.log(subscription)
    addToCart(subscription)
    setCount(count + 1)
  }

  useEffect(() => {
    const items = getCartItems()
    setSubscriptionCount(items.length)
  }, [setSubscriptionCount])

  const goTo = (subscription: any) => {
    handleSubscriptionChange(subscription)
    router.push("/cart")
  }

  return (
    <section className="bg-black text-white py-16 px-4 md:py-24">
      <div className="container mx-auto max-w-6xl">
        <SectionTitle translation="subscriptionsApp"></SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subscriptions.map((subscription, index) => (
            <div key={index} className="border border-red-600 rounded-lg p-6 flex flex-col">
              <Image
                src={subscription.image || "/placeholder.svg"}
                alt={subscription.name}
                width={100}
                height={100}
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-bold mb-2 text-center">{subscription.name}</h3>
              <p className="text-3xl font-bold mb-4 text-center">{subscription.price}</p>
              <div className="flex flex-col gap-2 mt-auto">
                <button
                  onClick={() => handleSubscriptionChange(subscription)}
                  className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
                >
                  {t("add_to_cart")}
                </button>
                <button
                  onClick={() => goTo(subscription)}
                  className="border border-white text-white py-2 px-4 rounded hover:bg-white hover:text-black transition-colors"
                >
                  {t("subscribe_now")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}