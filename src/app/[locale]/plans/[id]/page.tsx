"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface PlanTranslation {
  id?: number
  planId?: number
  language: string
  duration: string
  features: string[]
}

interface Plan {
  id?: number
  price: number
  isBestValue: boolean
  translations: PlanTranslation[]
}

interface ApiData {
  price: number
  isBestValue: boolean
  translations: Record<string, { duration: string; features: string[] }>
}

export default async function PlanDetailPage({ params }: { params:Promise<{ id: string }>}) {
  const router = useRouter()
  const isNewPlan = (await params).id === "new"
  const planId = isNewPlan ? null : Number.parseInt((await params).id)

  const [loading, setLoading] = useState(!isNewPlan)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("en")
  const [toast, setToast] = useState<{
    show: boolean
    title: string
    message: string
    type: "success" | "error"
  } | null>(null)
  const [deleteModal, setDeleteModal] = useState<{ show: boolean }>({ show: false })
  const [plan, setPlan] = useState<Plan>({
    price: 0,
    isBestValue: false,
    translations: [
      { language: "en", duration: "", features: [] },
      { language: "fr", duration: "", features: [] },
      { language: "de", duration: "", features: [] },
      { language: "es", duration: "", features: [] },
      { language: "ar", duration: "", features: [] },
    ],
  })

  useEffect(() => {
    if (!isNewPlan) {
      fetchPlan()
    }
  }, [isNewPlan])

useEffect(() => {
  if (toast) {
    const timer = setTimeout(() => {
      setToast(null);
    }, 3000);
    return () => clearTimeout(timer);
  }

  return undefined; // Ensures all paths return a value
}, [toast]);


  const fetchPlan = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/getAllPlans`)
      if (!response.ok) throw new Error("Failed to fetch plans")

      const plans: any = await response.json()
      const currentPlan = plans.find((p: any) => p.id === planId)

      if (!currentPlan) {
        setToast({
          show: true,
          title: "Error",
          message: "Plan not found",
          type: "error",
        })
        router.push("/plans")
        return
      }

      // Transform the data to match our state structure
      const transformedPlan: Plan = {
        id: currentPlan.id,
        price: currentPlan.price,
        isBestValue: currentPlan.isBestValue,
        translations: [],
      }

      // Create a map of all languages
      const languages = ["en", "fr", "de", "es", "ar"]
      const translationsMap: Record<string, PlanTranslation> = {}

      // Initialize with empty translations for all languages
      languages.forEach((lang) => {
        translationsMap[lang] = {
          language: lang,
          duration: "",
          features: [],
        }
      })

      // Fill in the existing translations
      currentPlan.PlanTranslations.forEach((translation: any) => {
        translationsMap[translation.language] = {
          id: translation.id,
          planId: translation.planId,
          language: translation.language,
          duration: translation.duration,
          features: typeof translation.features === "string" ? JSON.parse(translation.features) : translation.features,
        }
      })

      // Convert map back to array
      transformedPlan.translations = Object.values(translationsMap)

      setPlan(transformedPlan)
    } catch (error) {
      console.error("Error fetching plan:", error)
      setToast({
        show: true,
        title: "Error",
        message: "Failed to load plan details. Please try again.",
        type: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value) || 0
    setPlan((prev) => ({ ...prev, price: value }))
  }

  const handleBestValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlan((prev) => ({ ...prev, isBestValue: e.target.checked }))
  }

  const handleTranslationChange = (language: string, field: "duration" | "features", value: string | string[]) => {
    setPlan((prev) => {
      const newTranslations = prev.translations.map((t) => {
        if (t.language === language) {
          return { ...t, [field]: value }
        }
        return t
      })
      return { ...prev, translations: newTranslations }
    })
  }

  const handleFeaturesChange = (language: string, value: string) => {
    // Split by new lines and filter out empty lines
    const features = value.split("\n").filter((line) => line.trim() !== "")
    handleTranslationChange(language, "features", features)
  }

  const handleSave = async () => {
    try {
      setSaving(true)

      // Validate form
      if (plan.price <= 0) {
        setToast({
          show: true,
          title: "Validation Error",
          message: "Price must be greater than 0",
          type: "error",
        })
        setSaving(false)
        return
      }

      // Check if at least English translation is provided
      const enTranslation = plan.translations.find((t) => t.language === "en")
      if (!enTranslation || !enTranslation.duration || enTranslation.features.length === 0) {
        setToast({
          show: true,
          title: "Validation Error",
          message: "English translation is required with duration and at least one feature",
          type: "error",
        })
        setSaving(false)
        return
      }

      // Prepare data for API
      const apiData: ApiData = {
        price: plan.price,
        isBestValue: plan.isBestValue,
        translations: {},
      }

      // Only include translations that have data
      plan.translations.forEach((translation) => {
        if (translation.duration || translation.features.length > 0) {
          apiData.translations[translation.language] = {
            duration: translation.duration,
            features: translation.features,
          }
        }
      })

      let response

      if (isNewPlan) {
        // Create new plan
        response = await fetch("/api/CreatePlan", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiData),
        })
      } else {
        // Update existing plan
        response = await fetch(`/api/updatePlan/${planId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            price: plan.price,
            isBestValue: plan.isBestValue,
            translations: plan.translations,
          }),
        })
      }

      if (!response.ok) throw new Error(isNewPlan ? "Failed to create plan" : "Failed to update plan")

      setToast({
        show: true,
        title: "Success",
        message: isNewPlan ? "Plan created successfully" : "Plan updated successfully",
        type: "success",
      })

      // Redirect to plans list
      router.push("/plans")
    } catch (error) {
      console.error("Error saving plan:", error)
      setToast({
        show: true,
        title: "Error",
        message: isNewPlan ? "Failed to create plan" : "Failed to update plan",
        type: "error",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (isNewPlan) return

    try {
      setSaving(true)
      const response = await fetch(`/api/deletePlan/${planId}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete plan")

      setToast({
        show: true,
        title: "Success",
        message: "Plan deleted successfully",
        type: "success",
      })

      // Redirect to plans list
      router.push("/plans")
    } catch (error) {
      console.error("Error deleting plan:", error)
      setToast({
        show: true,
        title: "Error",
        message: "Failed to delete plan. Please try again.",
        type: "error",
      })
    } finally {
      setSaving(false)
      setDeleteModal({ show: false })
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-10 px-4 flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p>Loading plan details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Toast notification */}
      {toast && toast.show && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-md max-w-md ${
            toast.type === "success" ? "bg-green-100 border border-green-200" : "bg-red-100 border border-red-200"
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className={`font-medium ${toast.type === "success" ? "text-green-800" : "text-red-800"}`}>
                {toast.title}
              </h3>
              <p className={`text-sm ${toast.type === "success" ? "text-green-700" : "text-red-700"}`}>
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => setToast(null)}
              className={`ml-4 ${toast.type === "success" ? "text-green-600" : "text-red-600"} hover:opacity-75`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium mb-2">Are you absolutely sure?</h3>
            <p className="text-gray-500 mb-4">
              This action cannot be undone. This will permanently delete the plan and all its translations.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteModal({ show: false })}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <Link href="/plans">
            <button className="p-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </Link>
          <h1 className="text-3xl font-bold">{isNewPlan ? "Create New Plan" : "Edit Plan"}</h1>
        </div>
        <div className="flex gap-2">
          {!isNewPlan && (
            <button
              onClick={() => setDeleteModal({ show: true })}
              className="px-4 py-2 border border-gray-300 rounded-md text-red-600 hover:bg-red-50 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center ${saving ? "opacity-75 cursor-not-allowed" : ""}`}
          >
            {saving ? (
              <>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                  />
                </svg>
                Save
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="border border-gray-200 rounded-lg bg-white shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Plan Details</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={plan.price}
                    onChange={handlePriceChange}
                    className="pl-7 w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2 pt-8">
                <input
                  type="checkbox"
                  id="best-value"
                  checked={plan.isBestValue}
                  onChange={handleBestValueChange}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="best-value" className="text-sm font-medium text-gray-700">
                  Mark as "Best Value" plan
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg bg-white shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Plan Translations</h2>
          </div>
          <div className="p-6">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px space-x-8">
                {["en", "fr", "de", "es", "ar"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setActiveTab(lang)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === lang
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {lang === "en"
                      ? "English"
                      : lang === "fr"
                        ? "French"
                        : lang === "de"
                          ? "German"
                          : lang === "es"
                            ? "Spanish"
                            : "Arabic"}
                  </button>
                ))}
              </nav>
            </div>

            <div className="mt-4">
              {plan.translations.map((translation) => (
                <div
                  key={translation.language}
                  className={`space-y-4 ${activeTab === translation.language ? "block" : "hidden"}`}
                >
                  <div className="space-y-2">
                    <label
                      htmlFor={`duration-${translation.language}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Duration
                    </label>
                    <input
                      id={`duration-${translation.language}`}
                      placeholder={
                        translation.language === "en" ? "e.g., Monthly" : `Duration in ${translation.language}`
                      }
                      value={translation.duration}
                      onChange={(e) => handleTranslationChange(translation.language, "duration", e.target.value)}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <p className="text-sm text-gray-500">
                      {translation.language === "en"
                        ? "Required. Example: Monthly, Yearly, Lifetime, etc."
                        : `Translation for "${plan.translations.find((t) => t.language === "en")?.duration || "Duration"}"`}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor={`features-${translation.language}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Features
                    </label>
                    <textarea
                      id={`features-${translation.language}`}
                      placeholder={
                        translation.language === "en"
                          ? "Enter features (one per line)"
                          : `Features in ${translation.language} (one per line)`
                      }
                      value={translation.features.join("\n")}
                      onChange={(e) => handleFeaturesChange(translation.language, e.target.value)}
                      rows={6}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <p className="text-sm text-gray-500">
                      {translation.language === "en"
                        ? "Required. Enter one feature per line."
                        : "Enter one feature per line. These should be translations of the English features."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}