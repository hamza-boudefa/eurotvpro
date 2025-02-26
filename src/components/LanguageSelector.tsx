import { Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"
import Image from "next/image"

interface Language {
  code: string
  name: string
  flag: string
}

const languages: Language[] = [
  { code: "en", name: "English", flag: "/images/eng.svg" },
  { code: "es", name: "Español", flag: "/images/es.svg" },
  { code: "fr", name: "Français", flag: "/images/fr.svg" },
  { code: "de", name: "Deutsch", flag: "/images/ger.svg" },
  { code: "ar", name: "عربي", flag: "/images/ar.svg" },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

interface LanguageSelectorProps {
  onLanguageChange: (locale: string) => void
  currentLocale: string
  isMobile?: boolean
}

export default function LanguageSelector({ onLanguageChange, currentLocale, isMobile = false }: LanguageSelectorProps) {
  const selectedLanguage = languages.find((lang) => lang.code === currentLocale) || languages[0]

  if (isMobile) {
    return (
      <>
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onLanguageChange(lang.code)}
            className="flex w-full items-center px-4 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
          >
            <Image src={lang.flag || "/placeholder.svg"} alt={lang.name} width={20} height={20} className="mr-2" />
            {lang.name}
          </button>
        ))}
      </>
    )
  }

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex items-center rounded-sm bg-transparent text-sm">
          <span className="sr-only">Select language</span>
          <Image
            src={selectedLanguage?.flag || "/placeholder.svg"}
            alt={selectedLanguage?.name || "english"}
            width={24}
            height={24}
            className="rounded-sm mr-2"
          />
          <span className="text-gray-300 hover:text-white transition-colors duration-200">{selectedLanguage?.name}</span>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {languages.map((lang) => (
            <Menu.Item key={lang.code}>
              {({ active }) => (
                <button
                  onClick={() => onLanguageChange(lang.code)}
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "flex w-full items-center px-4 py-2 text-sm text-gray-700 transition-colors duration-200",
                  )}
                >
                  <Image
                    src={lang.flag || "/placeholder.svg"}
                    alt={lang.name}
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  {lang.name}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

