"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

interface PlanTranslation {
  id: number
  planId: number
  language: string
  duration: string
  features: string[]
}

interface Plan {
  id: number
  price: number
  isBestValue: boolean
  PlanTranslations: PlanTranslation[]
}

export default function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState<{
    show: boolean
    title: string
    message: string
    type: "success" | "error"
  } | null>(null)
  const [deleteModal, setDeleteModal] = useState<{ show: boolean; planId: number | null }>({
    show: false,
    planId: null,
  })

  useEffect(() => {
    fetchPlans()
  }, [])

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
    return
  }, [toast])

  const fetchPlans = async () => {
    try {
      setLoading(true)
      const response = await fetch("http://localhost:5000/admin/plans/getAllPlans")
      if (!response.ok) throw new Error("Failed to fetch plans")
      const data:any = await response.json()
      setPlans(data)
    } catch (error) {
      console.error("Error fetching plans:", error)
      setToast({
        show: true,
        title: "Error",
        message: "Failed to load plans. Please try again.",
        type: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePlan = async (id: number) => {
    try {
      const response = await fetch(`/api/deletePlan/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete plan")

      setToast({
        show: true,
        title: "Success",
        message: "Plan deleted successfully",
        type: "success",
      })

      // Refresh plans list
      fetchPlans()
    } catch (error) {
      console.error("Error deleting plan:", error)
      setToast({
        show: true,
        title: "Error",
        message: "Failed to delete plan. Please try again.",
        type: "error",
      })
    } finally {
      setDeleteModal({ show: false, planId: null })
    }
  }

  const getTranslationsByLanguage = (plan: Plan) => {
    const languages = ["en", "fr", "de", "es", "ar"]
    const translationMap: Record<string, PlanTranslation | undefined> = {}

    languages.forEach((lang) => {
      translationMap[lang] = plan.PlanTranslations.find((t) => t.language === lang)
    })

    return translationMap
  }

  if (loading) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Plans Management</h1>
          <div className="h-10 w-32 bg-gray-200 animate-pulse rounded-md"></div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 w-full bg-gray-200 animate-pulse rounded-lg"></div>
          ))}
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
                onClick={() => setDeleteModal({ show: false, planId: null })}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteModal.planId && handleDeletePlan(deleteModal.planId)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Plans Management</h1>
        <Link href="/plans/new">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New Plan
          </button>
        </Link>
      </div>

      {plans.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-4">No plans found</h2>
          <p className="text-gray-500 mb-6">Create your first subscription plan to get started.</p>
          <Link href="/plans/new">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New Plan
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => {
            const translations = getTranslationsByLanguage(plan)
            const enTranslation = translations["en"]

            return (
              <div key={plan.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">
                        {enTranslation ? enTranslation.duration : "Untitled Plan"}
                      </h3>
                      <p className="text-gray-500 mt-1">${plan.price.toFixed(2)}</p>
                    </div>
                    {plan.isBestValue && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Best Value
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap gap-1 mb-4">
                    {Object.entries(translations).map(([lang, translation]) => (
                      <span
                        key={lang}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          translation ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {lang.toUpperCase()}
                      </span>
                    ))}
                  </div>
                  {enTranslation && (
                    <div>
                      <h4 className="font-medium mb-2">Features:</h4>
                      <ul className="text-sm text-gray-500 list-disc pl-5">
                        {enTranslation.features.slice(0, 3).map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                        {enTranslation.features.length > 3 && <li>...</li>}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="flex justify-between p-4 border-t border-gray-200">
                  <Link href={`/plans/${plan.id}`}>
                    <button className="px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => setDeleteModal({ show: true, planId: plan.id })}
                    className="px-3 py-1.5 border border-gray-300 rounded-md text-sm text-red-600 hover:bg-red-50 flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
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
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

