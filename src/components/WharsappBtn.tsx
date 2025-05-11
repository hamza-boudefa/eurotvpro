'use client'
import { useTranslations } from 'next-intl'
import React from 'react'

export default function WharsappBtn() {
    const t = useTranslations("whatsappbtn")
  
  const openWhatsApp = () => {
    window.open("https://wa.me/+216 55 899 901", "_blank")
  }

  return (
    <div>
       <button
        onClick={openWhatsApp}
        className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
      >
{t('title')}
      </button>
    </div>
  )
}
