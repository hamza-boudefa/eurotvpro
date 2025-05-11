"use client"

import { useState, useEffect, useRef } from "react"
import { Trash2, ChevronDown } from "lucide-react"
import { getCartItems, removeFromCart } from "@/utils/cart"
import { useSubscription } from "@/contexts/subscription-context"
import { useTranslations } from "next-intl"
import Image from "next/image"
import Select, { type StylesConfig } from "react-select"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import Toast from "../../../components/Toast"
import Spinner from "../../../components/Spinner"


interface CartItem {
  id?: number; // For apps
  name?: string; // For apps
  duration?: string; // For plans
  price: string;
  quantity: number;
  promo?: string; // For apps
  image?: string; // For apps
  features?: string[]; // For plans
  isBestValue?: boolean; // For plans
}

interface PaymentMethod {
  name: string
  src: string
}

interface Country {
  label: string
  value: string
}

interface FormData {
  firstName: string
  lastName: string
  country: Country | null
  phoneNumber: string
  email: string
}

interface FormErrors {
  firstName?: string
  lastName?: string
  country?: string
  phoneNumber?: string
  email?: string
}

const paymentMethods: PaymentMethod[] = [
  { name: "D17", src: "/images/WhatsApp Image 2025-05-02 at 02.46.12_b56d715d.jpg" },
  { name: "e-dinar", src: "/images/WhatsApp Image 2025-05-02 at 02.46.12_b475de3f.jpg" },
  { name: "binance", src: "/images/WhatsApp Image 2025-05-02 at 02.46.12_0f2290ce.jpg" },
  { name: "virement", src: "/images/WhatsApp Image 2025-05-02 at 02.46.12_2f8075ec.jpg" },
  { name: "western", src: "/images/WhatsApp Image 2025-05-02 at 02.46.12_0bd91cfa.jpg" },
  { name: "", src: "/images/WhatsApp Image 2025-05-02 at 02.46.13_98299d7d.jpg" },

]

const countries: Country[] = [
  { label: "Afghanistan", value: "AF" },
  { label: "Albania", value: "AL" },
  { label: "Algeria", value: "DZ" },
  { label: "Andorra", value: "AD" },
  { label: "Angola", value: "AO" },
  { label: "Antigua and Barbuda", value: "AG" },
  { label: "Argentina", value: "AR" },
  { label: "Armenia", value: "AM" },
  { label: "Australia", value: "AU" },
  { label: "Austria", value: "AT" },
  { label: "Azerbaijan", value: "AZ" },
  { label: "Bahamas", value: "BS" },
  { label: "Bahrain", value: "BH" },
  { label: "Bangladesh", value: "BD" },
  { label: "Barbados", value: "BB" },
  { label: "Belarus", value: "BY" },
  { label: "Belgium", value: "BE" },
  { label: "Belize", value: "BZ" },
  { label: "Benin", value: "BJ" },
  { label: "Bhutan", value: "BT" },
  { label: "Bolivia", value: "BO" },
  { label: "Bosnia and Herzegovina", value: "BA" },
  { label: "Botswana", value: "BW" },
  { label: "Brazil", value: "BR" },
  { label: "Brunei", value: "BN" },
  { label: "Bulgaria", value: "BG" },
  { label: "Burkina Faso", value: "BF" },
  { label: "Burundi", value: "BI" },
  { label: "Cabo Verde", value: "CV" },
  { label: "Cambodia", value: "KH" },
  { label: "Cameroon", value: "CM" },
  { label: "Canada", value: "CA" },
  { label: "Central African Republic", value: "CF" },
  { label: "Chad", value: "TD" },
  { label: "Chile", value: "CL" },
  { label: "China", value: "CN" },
  { label: "Colombia", value: "CO" },
  { label: "Comoros", value: "KM" },
  { label: "Congo (Congo-Brazzaville)", value: "CG" },
  { label: "Costa Rica", value: "CR" },
  { label: "Croatia", value: "HR" },
  { label: "Cuba", value: "CU" },
  { label: "Cyprus", value: "CY" },
  { label: "Czechia (Czech Republic)", value: "CZ" },
  { label: "Denmark", value: "DK" },
  { label: "Djibouti", value: "DJ" },
  { label: "Dominica", value: "DM" },
  { label: "Dominican Republic", value: "DO" },
  { label: "Ecuador", value: "EC" },
  { label: "Egypt", value: "EG" },
  { label: "El Salvador", value: "SV" },
  { label: "Equatorial Guinea", value: "GQ" },
  { label: "Eritrea", value: "ER" },
  { label: "Estonia", value: "EE" },
  { label: "Eswatini", value: "SZ" },
  { label: "Ethiopia", value: "ET" },
  { label: "Fiji", value: "FJ" },
  { label: "Finland", value: "FI" },
  { label: "France", value: "FR" },
  { label: "Gabon", value: "GA" },
  { label: "Gambia", value: "GM" },
  { label: "Georgia", value: "GE" },
  { label: "Germany", value: "DE" },
  { label: "Ghana", value: "GH" },
  { label: "Greece", value: "GR" },
  { label: "Grenada", value: "GD" },
  { label: "Guatemala", value: "GT" },
  { label: "Guinea", value: "GN" },
  { label: "Guinea-Bissau", value: "GW" },
  { label: "Guyana", value: "GY" },
  { label: "Haiti", value: "HT" },
  { label: "Honduras", value: "HN" },
  { label: "Hungary", value: "HU" },
  { label: "Iceland", value: "IS" },
  { label: "India", value: "IN" },
  { label: "Indonesia", value: "ID" },
  { label: "Iran", value: "IR" },
  { label: "Iraq", value: "IQ" },
  { label: "Ireland", value: "IE" },
  { label: "Italy", value: "IT" },
  { label: "Jamaica", value: "JM" },
  { label: "Japan", value: "JP" },
  { label: "Jordan", value: "JO" },
  { label: "Kazakhstan", value: "KZ" },
  { label: "Kenya", value: "KE" },
  { label: "Kiribati", value: "KI" },
  { label: "Kuwait", value: "KW" },
  { label: "Kyrgyzstan", value: "KG" },
  { label: "Laos", value: "LA" },
  { label: "Latvia", value: "LV" },
  { label: "Lebanon", value: "LB" },
  { label: "Lesotho", value: "LS" },
  { label: "Liberia", value: "LR" },
  { label: "Libya", value: "LY" },
  { label: "Liechtenstein", value: "LI" },
  { label: "Lithuania", value: "LT" },
  { label: "Luxembourg", value: "LU" },
  { label: "Madagascar", value: "MG" },
  { label: "Malawi", value: "MW" },
  { label: "Malaysia", value: "MY" },
  { label: "Maldives", value: "MV" },
  { label: "Mali", value: "ML" },
  { label: "Malta", value: "MT" },
  { label: "Marshall Islands", value: "MH" },
  { label: "Mauritania", value: "MR" },
  { label: "Mauritius", value: "MU" },
  { label: "Mexico", value: "MX" },
  { label: "Micronesia", value: "FM" },
  { label: "Moldova", value: "MD" },
  { label: "Monaco", value: "MC" },
  { label: "Mongolia", value: "MN" },
  { label: "Montenegro", value: "ME" },
  { label: "Morocco", value: "MA" },
  { label: "Mozambique", value: "MZ" },
  { label: "Myanmar (Burma)", value: "MM" },
  { label: "Namibia", value: "NA" },
  { label: "Nauru", value: "NR" },
  { label: "Nepal", value: "NP" },
  { label: "Netherlands", value: "NL" },
  { label: "New Zealand", value: "NZ" },
  { label: "Nicaragua", value: "NI" },
  { label: "Niger", value: "NE" },
  { label: "Nigeria", value: "NG" },
  { label: "North Korea", value: "KP" },
  { label: "North Macedonia", value: "MK" },
  { label: "Norway", value: "NO" },
  { label: "Oman", value: "OM" },
  { label: "Pakistan", value: "PK" },
  { label: "Palau", value: "PW" },
  { label: "Palestine", value: "PS" },
  { label: "Panama", value: "PA" },
  { label: "Papua New Guinea", value: "PG" },
  { label: "Paraguay", value: "PY" },
  { label: "Peru", value: "PE" },
  { label: "Philippines", value: "PH" },
  { label: "Poland", value: "PL" },
  { label: "Portugal", value: "PT" },
  { label: "Qatar", value: "QA" },
  { label: "Romania", value: "RO" },
  { label: "Russia", value: "RU" },
  { label: "Rwanda", value: "RW" },
  { label: "Saint Kitts and Nevis", value: "KN" },
  { label: "Saint Lucia", value: "LC" },
  { label: "Saint Vincent and the Grenadines", value: "VC" },
  { label: "Samoa", value: "WS" },
  { label: "San Marino", value: "SM" },
  { label: "Sao Tome and Principe", value: "ST" },
  { label: "Saudi Arabia", value: "SA" },
  { label: "Senegal", value: "SN" },
  { label: "Serbia", value: "RS" },
  { label: "Seychelles", value: "SC" },
  { label: "Sierra Leone", value: "SL" },
  { label: "Singapore", value: "SG" },
  { label: "Slovakia", value: "SK" },
  { label: "Slovenia", value: "SI" },
  { label: "Solomon Islands", value: "SB" },
  { label: "Somalia", value: "SO" },
  { label: "South Africa", value: "ZA" },
  { label: "South Korea", value: "KR" },
  { label: "South Sudan", value: "SS" },
  { label: "Spain", value: "ES" },
  { label: "Sri Lanka", value: "LK" },
  { label: "Sudan", value: "SD" },
  { label: "Suriname", value: "SR" },
  { label: "Sweden", value: "SE" },
  { label: "Switzerland", value: "CH" },
  { label: "Syria", value: "SY" },
  { label: "Taiwan", value: "TW" },
  { label: "Tajikistan", value: "TJ" },
  { label: "Tanzania", value: "TZ" },
  { label: "Thailand", value: "TH" },
  { label: "Timor-Leste", value: "TL" },
  { label: "Togo", value: "TG" },
  { label: "Tonga", value: "TO" },
  { label: "Trinidad and Tobago", value: "TT" },
  { label: "Tunisia", value: "TN" },
  { label: "Turkey", value: "TR" },
  { label: "Turkmenistan", value: "TM" },
  { label: "Tuvalu", value: "TV" },
  { label: "Uganda", value: "UG" },
  { label: "Ukraine", value: "UA" },
  { label: "United Arab Emirates", value: "AE" },
  { label: "United Kingdom", value: "GB" },
  { label: "United States", value: "US" },
  { label: "Uruguay", value: "UY" },
  { label: "Uzbekistan", value: "UZ" },
  { label: "Vanuatu", value: "VU" },
  { label: "Vatican City", value: "VA" },
  { label: "Venezuela", value: "VE" },
  { label: "Vietnam", value: "VN" },
  { label: "Yemen", value: "YE" },
  { label: "Zambia", value: "ZM" },
  { label: "Zimbabwe", value: "ZW" },
];

const customStyles: StylesConfig<Country, false> = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "transparent",
    borderColor: "#4B5563",
    "&:hover": {
      borderColor: "#6B7280",
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#1F2937",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#374151" : "#1F2937",
    color: "white",
    "&:active": {
      backgroundColor: "#4B5563",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "white",
  }),
  input: (provided) => ({
    ...provided,
    color: "white",
  }),
}

export default function CartPage() {
  const t = useTranslations("plans")
  const [items, setItems] = useState<CartItem[]>([])
  const [total, setTotal] = useState(0)
  const { setSubscriptionCount } = useSubscription()
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState<"top" | "bottom">("bottom")
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    country: null,
    phoneNumber: "",
    email: "",
  })
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState<"success" | "error">("success")

  useEffect(() => {
    const fetchedItems = getCartItems();
    console.log(fetchedItems);
  
    const itemMap = fetchedItems.reduce((acc: any, item: any) => {
      // Use `duration` for plans and `id` for apps
      const key = item.duration || item.id;
  
      if (acc[key]) {
        acc[key].quantity += 1; // Increment quantity if the item already exists
      } else {
        acc[key] = { ...item, quantity: 1 }; // Add the item with quantity 1 if it doesn't exist
      }
  
      return acc;
    }, {});
  
    const itemList: CartItem[] = Object.values(itemMap);
    setItems(itemList);
    console.log(itemList);
  
    const totalAmount = itemList.reduce((sum: number, item: CartItem) => {
      // Parse the price correctly (remove "€" if present)
      const price = typeof item.price === 'string' ? Number.parseFloat(item.price.replace("€", "")) : item.price;
      return sum + price * item.quantity;
    }, 0);
  
    setTotal(totalAmount);
    console.log(totalAmount);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleRemoveFromCart = (identifier: any) => {
    // Remove one instance of the item from the cart
    removeFromCart(identifier);
  
    // Update the items state
    const updatedItems = items.map((item) => {
      if (item.duration === identifier || item.id === identifier) {
        return { ...item, quantity: item.quantity - 1 }; // Decrement the quantity by 1
      }
      return item;
    }).filter((item) => item.quantity > 0); // Remove the item if its quantity is 0
  
    setItems(updatedItems);
  
    // Recalculate the total
    const updatedTotal = updatedItems.reduce((sum: number, item: CartItem) => {
      const price = typeof item.price === 'string' ? Number.parseFloat(item.price.replace("€", "")) : item.price;
      return sum + price * item.quantity;
    }, 0);
  
    setTotal(updatedTotal);
  
    // Update the subscription count
    const totalItemsCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
    setSubscriptionCount(totalItemsCount);
  };
  const toggleDropdown = () => {  
    if (!isDropdownOpen) {
      const buttonRect = buttonRef.current?.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const spaceBelow = windowHeight - (buttonRect?.bottom || 0)
      const spaceAbove = buttonRect?.top || 0
      const dropdownHeight = 300 // Approximate height of the dropdown

      if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
        setDropdownPosition("top")
      } else {
        setDropdownPosition("bottom")
      }
    }
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method)
    setIsDropdownOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    validateField(name, value)
  }

  const handleCountryChange = (selected: Country | null) => {
    setFormData((prev) => ({ ...prev, country: selected }))
    validateField("country", selected)
  }

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, phoneNumber: value }))
    validateField("phoneNumber", value)
  }

  const validateField = (name: string, value: any) => {
    let error = ""
    switch (name) {
      case "firstName":
      case "lastName":
        if (!value) error = t("required")
        break
      case "country":
        if (!value) error = t("selectCountry")
        break
      case "phoneNumber":
        if (!value) error = t("required")
        else if (!/^\+?[1-9]\d{1,14}$/.test(value)) error = t("invalidPhone")
        break
      case "email":
        if (!value) error = t("required")
        else if (!/\S+@\S+\.\S+/.test(value)) error = t("invalidEmail")
        break
    }
    setFormErrors((prev) => ({ ...prev, [name]: error }))
  }

  const validateForm = () => {
    const errors: FormErrors = {}
    if (!formData.firstName) errors.firstName = t("required")
    if (!formData.lastName) errors.lastName = t("required")
    if (!formData.country) errors.country = t("selectCountry")
    if (!formData.phoneNumber) errors.phoneNumber = t("required")
    else if (!/^\+?[1-9]\d{1,14}$/.test(formData.phoneNumber)) errors.phoneNumber = t("invalidPhone")
    if (!formData.email) errors.email = t("required")
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = t("invalidEmail")
    
    // Add validation for payment method
    if (!selectedPaymentMethod) {
      setToastMessage(t("selectPaymentMethod"))
      setToastType("error")
      setShowToast(true)
      setTimeout(() => setShowToast(false), 5000)
      return false
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check if payment method is selected
    if (!selectedPaymentMethod) {
      setToastMessage(t("selectPaymentMethod"))
      setToastType("error")
      setShowToast(true)
      setTimeout(() => setShowToast(false), 5000)
      return
    }

    if (validateForm()) {
      try {
        setLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/orders/placeOrder`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            country: formData.country?.label,
            phoneNumber: formData.phoneNumber,
            email: formData.email,
            paymentMethod: selectedPaymentMethod?.name || '',
            items: items,
            totalAmount: total,
          }),
        })

        // const data = await response.json()

        if (response.ok) {
          setToastMessage(t("orderSuccessful"))
          setToastType("success")
        } else {
          setToastMessage(t("orderFailed"))
          setToastType("error")
        }
      } catch (error) {
        setToastMessage(t("orderFailed"))
        setToastType("error")
      } finally {
        setLoading(false)
        setShowToast(true)
        setTimeout(() => setShowToast(false), 5000) // Hide toast after 5 seconds
      }
    }
  }
console.log(total)
  return (
    <>
      <div className="min-h-screen bg-black text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">{t("orderPayment")}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="border border-red-600 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">{t("personalInformation")}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        name="firstName"
                        placeholder={t("firstName")}
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="bg-transparent border border-gray-600 rounded p-2 w-full"
                      />
                      {formErrors.firstName && <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>}
                    </div>
                    <div>
                      <input
                        type="text"
                        name="lastName"
                        placeholder={t("lastName")}
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="bg-transparent border border-gray-600 rounded p-2 w-full"
                      />
                      {formErrors.lastName && <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>}
                    </div>
                  </div>
                  <div>
                    <Select
                      instanceId="country-select" // Add instanceId to fix hydration error
                      options={countries}
                      value={formData.country}
                      onChange={handleCountryChange}
                      placeholder={t("selectCountry")}
                      styles={customStyles}
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                    {formErrors.country && <p className="text-red-500 text-sm mt-1">{formErrors.country}</p>}
                  </div>
                  <div dir="ltr">
                    <PhoneInput
                      country={formData.country?.value.toLowerCase() || ""}
                      value={formData.phoneNumber}
                      onChange={handlePhoneChange}
                      inputClass="!w-full !bg-transparent !text-white !border-gray-600 !rounded !h-[40px]"
                      buttonClass="!bg-transparent !border-gray-600 !border-r-0"
                      dropdownClass="!bg-gray-800 !text-white"
                      placeholder={t("phoneNumber")}
                    />
                    {formErrors.phoneNumber && <p className="text-red-500 text-sm mt-1">{formErrors.phoneNumber}</p>}
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder={t("email")}
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border border-gray-600 rounded p-2"
                    />
                    {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                  </div>
                </form>
              </div>

              <div className="border border-red-600 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">{t("paymentMethodval")}</h2>
                <div className="relative" ref={dropdownRef}>
                  <button
                    ref={buttonRef}
                    onClick={toggleDropdown}
                    className="w-full bg-transparent border border-gray-600 rounded p-2 flex justify-between items-center"
                    aria-haspopup="listbox"
                    aria-expanded={isDropdownOpen}
                  >
                    {selectedPaymentMethod ? (
                      <span className="flex items-center">
                        <Image
                          src={selectedPaymentMethod.src || "/placeholder.svg"}
                          alt={selectedPaymentMethod.name}
                          width={40}
                          height={25}
                          className="mr-2"
                        />
                        {selectedPaymentMethod.name}
                      </span>
                    ) : (
                      t("selectPaymentMethod")
                    )}
                    <ChevronDown className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isDropdownOpen && (
                    <ul
                      className={`absolute z-10 w-full mt-1 bg-gray-800 border border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto ${
                        dropdownPosition === "top" ? "bottom-full mb-1" : "top-full mt-1"
                      }`}
                      role="listbox"
                    >
                      {paymentMethods.map((method) => (
                        <li
                          key={method.name}
                          className="flex items-center p-2 hover:bg-gray-700 cursor-pointer"
                          onClick={() => handlePaymentMethodSelect(method)}
                          role="option"
                          aria-selected={selectedPaymentMethod?.name === method.name}
                        >
                          <Image
                            src={method.src || "/placeholder.svg"}
                            alt={method.name}
                            width={40}
                            height={25}
                            className="mr-2"
                          />
                          <span>{method.name}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {/* Display error message if payment method is not selected */}
                {!selectedPaymentMethod && (
                  <p className="text-red-500 text-sm mt-1">{t("selectPaymentMethod")}</p>
                )}
              </div>
            </div>

            <div className="border border-red-600 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">{t("orderDetailsval")}</h2>
              {/* <div className="space-y-4 mb-6">
                {items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">
                        {t(item.duration)} {item.quantity > 1 && `x${item.quantity}`}
                      </h3>
                      <p className="text-sm text-gray-400">{item.price}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveFromCart(item.duration)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div> */}
<div className="space-y-4 mb-6">
  {items.map((item, index) => (
    <div key={index} className="flex justify-between items-center">
      <div>
        <h3 className="font-bold">
          {item.name ? item.name : item.duration } {/* Display name for apps or duration for plans */}
          {item.quantity > 1 && `x${item.quantity}`} {/* Display quantity if greater than 1 */}
        </h3>
        <p className="text-sm text-gray-400">
          {typeof item.price === 'string' ? item.price : `${item.price}€`} {/* Display price with "€" if it's a number */}
        </p>
      </div>
      <button
        onClick={() => handleRemoveFromCart(item.duration || item.id || '')} // Remove by duration or id
        className="text-red-500 hover:text-red-600"
      >
        <Trash2 size={20} />
      </button>
    </div>
  ))}
</div>
              <div className="border-t border-gray-600 pt-4">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-bold">{t("orderTotal")}:</span>
                  <span className="font-bold">{total.toFixed(2)}€</span>
                </div>
                <button
                  onClick={handleSubmit}
                  className="w-full bg-red-600 text-white py-3 px-4 rounded hover:bg-red-700 transition-colors flex justify-center items-center"
                  disabled={loading || total === 0}
                >
                  {loading ? <Spinner className="mr-2" /> : null}
                  {loading ? t("processing") : t("placeOrder")}
                </button>
              </div>
            </div>
          </div>
        </div>
        <style jsx global>{`
          .react-select-container .react-select__control {
            border-color: #4B5563;
          }
          .react-select-container .react-select__control:hover {
            border-color: #6B7280;
          }
          .react-select-container .react-select__menu {
            background-color: #1F2937;
          }
          .react-select-container .react-select__option {
            background-color: #1F2937;
            color: white;
          }
          .react-select-container .react-select__option--is-focused {
            background-color: #374151;
          }
          .react-select-container .react-select__single-value {
            color: white;
          }
          .react-select-container .react-select__input-container {
            color: white;
          }
          .react-phone-input-2 .country-list {
            background-color: #1F2937 !important;
          }
          .react-phone-input-2 .country-list .country:hover {
            background-color: #374151 !important;
          }
          .react-phone-input-2 .country-list .country.highlight {
            background-color: #4B5563 !important;
          }
        `}</style>
      </div>
      {showToast && <Toast message={toastMessage} type={toastType} onClose={() => setShowToast(false)} />}
    </>
  )
}