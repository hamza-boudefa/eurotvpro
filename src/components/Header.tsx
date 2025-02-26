"use client";

import { useState, useEffect } from "react"
import { Bars3Icon, XMarkIcon, ShoppingCartIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
// import { getCartItems } from "@/utils/cart"
import LanguageSelector from "./LanguageSelector"
import { useSubscription } from "@/contexts/subscription-context"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [menuHeight, setMenuHeight] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  // const [cartItemCount, setCartItemCount] = useState(0)

  const pathname = usePathname()
  const router = useRouter()
  const currentLocale = useLocale()
  const t = useTranslations('Navigation')
const { subscriptionCount } = useSubscription()

  const navigation = [
    { name: t('home'), href: `/${currentLocale}`, current: pathname === `/${currentLocale}` },
    { name: t('Pricing'), href: `/${currentLocale}/pricing`, current: pathname === `/${currentLocale}/pricing` },
    { name: t('Blog'), href: `/${currentLocale}/blog`, current: pathname === `/${currentLocale}/blog` },
    { name: t('About'), href: `/${currentLocale}/about`, current: pathname === `/${currentLocale}/about` },
    { name: t('Contact'), href: `/${currentLocale}/contact`, current: pathname === `/${currentLocale}/contact` },
  ];
  

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      const menuElement = document.getElementById("mobile-menu")
      if (menuElement) {
        setMenuHeight(menuElement.scrollHeight)
      }
    } else {
      setMenuHeight(0)
    }
  }, [mobileMenuOpen])

  // useEffect(() => {
  //   const items = getCartItems()
  //   setCartItemCount(items.length)
  // }, [])

  const handleCartClick = () => {
    router.push("/cart")
  }

  const handleLanguageChange = (newLocale: string) => {
    const currentPathname = pathname
    if (currentPathname) {
      const newPathname = `/${newLocale}${currentPathname.replace(/^\/[^/]+/, "")}`
      router.push(newPathname)
    }
  }

  return (
    <nav
    style={{ display: pathname.includes("orders") ? "none" : "block" }} // Conditionally hide the nav

      className={classNames(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-transparent",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Image className="h-16 w-16" src="/images/logo.png" alt="Smart IPTV" width={500} height={500} />
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  style={{marginLeft:"30px !important"}}
                  className={classNames(
                    item.current
                      ? "border-red-500 text-white"
                      : "border-transparent text-gray-300 hover:border-gray-300 hover:text-white",
                    "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition-colors duration-200",
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button
              onClick={handleCartClick}
              className="relative rounded-full bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <span className="sr-only">{t('open_cart')}</span>
              <ShoppingCartIcon
                className="h-6 w-6 text-gray-300 hover:text-white transition-colors duration-200"
                aria-hidden="true"
              />
              {subscriptionCount > 0 && (
                <span className="absolute -top-1 -right-1 block h-4 w-4 text-xs font-bold text-white bg-red-600 rounded-full flex items-center justify-center">
                  {subscriptionCount}
                </span>
              )}
            </button>

            <LanguageSelector onLanguageChange={handleLanguageChange} currentLocale={currentLocale} />
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500 transition-colors duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">{t('open_main_menu')}</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={classNames(
          "sm:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isScrolled ? "bg-black/20 backdrop-blur-md" : "bg-black/80 backdrop-blur-md",
        )}
        style={{ maxHeight: `${menuHeight}px` }}
      >
        <div className="space-y-1 pb-3 pt-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={classNames(
                item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block py-2 pl-3 pr-4 text-base font-medium transition-colors duration-200",
              )}
              aria-current={item.current ? "page" : undefined}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="border-t border-gray-700 pb-3 pt-4">
          <div className="mt-3 space-y-1">
            <Link
              href="/cart"
              className="block px-4 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
            >
              {t('view_cart')}
            </Link>
            <LanguageSelector onLanguageChange={handleLanguageChange} currentLocale={currentLocale} isMobile={true} />
          </div>
        </div>
      </div>
    </nav>
  )
}