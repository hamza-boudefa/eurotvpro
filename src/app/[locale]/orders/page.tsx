"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, RefreshCcw } from "lucide-react"

interface OrderItem {
  duration: string
  price: string
  quantity: number
}

interface Order {
  updatedAt: string
  id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  paymentMethod: string
  totalAmount: number
  items: OrderItem[]
  createdAt: string
  status: "on hold" | "confirmed" // Add status field
  confirmationDate?: string // Optional confirmation date
}

type FilterOption = "all" | "today" | "lastWeek" | "lastMonth"

export default function Page() {
  const [orders, setOrders] = useState<Order[]>([])
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set())
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState<FilterOption>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("adminOrdersFilter") as FilterOption) || "all"
    }
    return "all"
  })

  // New filter states
  const [fullNameFilter, setFullNameFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [confirmationDateFilter, setConfirmationDateFilter] = useState("")
  const [emailFilter, setEmailFilter] = useState("")
  const [phoneNumberFilter, setPhoneNumberFilter] = useState("")

  // Fetch orders function
  const fetchOrders = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`http://localhost:5000/admin/orders`, {
        params: {
          page: currentPage,
          filter,
          fullName: fullNameFilter,
          status: statusFilter,
          confirmationDate: confirmationDateFilter,
          email: emailFilter,
          phoneNumber: phoneNumberFilter,
        },
      })
      setOrders(response.data?.orders || [])
      setTotalPages(response.data?.totalPages || 1)
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setLoading(false)
    }
  }

  // Reload function
  const reload = () => {
    fetchOrders()
  }

  // Update order status function
  const updateOrderStatus = async (orderId: string, status: "on hold" | "confirmed") => {
    try {
      const response = await axios.put(`http://localhost:5000/api/updateOrderStatus/${orderId}`, {
        status,
      })
      console.log("Order status updated:", response.data)
      fetchOrders() // Refresh the orders list
    } catch (error) {
      console.error("Error updating order status:", error)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [currentPage, filter, fullNameFilter, statusFilter, confirmationDateFilter, emailFilter, phoneNumberFilter])

  useEffect(() => {
    localStorage.setItem("adminOrdersFilter", filter)
  }, [filter])

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(orderId)) {
        newSet.delete(orderId)
      } else {
        newSet.add(orderId)
      }
      return newSet
    })
  }

  const handleFilterChange = (newFilter: FilterOption) => {
    setFilter(newFilter)
    setCurrentPage(1)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="admin-orders bg-black text-white min-h-screen py-8 px-4 sm:px-6 lg:px-8 z-[9999999]">
      <h1 className="text-3xl font-bold mb-6 text-gray-100">Admin - Orders</h1>

      <div className="mb-4 flex justify-between items-center">
        <div className="space-x-2">
          {/* Old filters */}
          <button
            onClick={() => handleFilterChange("all")}
            className={`px-3 py-1 rounded ${filter === "all" ? "bg-blue-600" : "bg-gray-700"}`}
          >
            All
          </button>
          <button
            onClick={() => handleFilterChange("today")}
            className={`px-3 py-1 rounded ${filter === "today" ? "bg-blue-600" : "bg-gray-700"}`}
          >
            Today
          </button>
          <button
            onClick={() => handleFilterChange("lastWeek")}
            className={`px-3 py-1 rounded ${filter === "lastWeek" ? "bg-blue-600" : "bg-gray-700"}`}
          >
            Last Week
          </button>
          <button
            onClick={() => handleFilterChange("lastMonth")}
            className={`px-3 py-1 rounded ${filter === "lastMonth" ? "bg-blue-600" : "bg-gray-700"}`}
          >
            Last Month
          </button>

          {/* New filters */}
          <input
            type="text"
            placeholder="Full Name"
            value={fullNameFilter}
            onChange={(e) => setFullNameFilter(e.target.value)}
            className="px-3 py-1 rounded bg-gray-700 text-white"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1 rounded bg-gray-700 text-white"
          >
            <option value="">All Statuses</option>
            <option value="on hold">On Hold</option>
            <option value="confirmed">Confirmed</option>
          </select>
          <input
            type="date"
            value={confirmationDateFilter}
            onChange={(e) => setConfirmationDateFilter(e.target.value)}
            className="px-3 py-1 rounded bg-gray-700 text-white"
          />
          <input
            type="text"
            placeholder="Email"
            value={emailFilter}
            onChange={(e) => setEmailFilter(e.target.value)}
            className="px-3 py-1 rounded bg-gray-700 text-white"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumberFilter}
            onChange={(e) => setPhoneNumberFilter(e.target.value)}
            className="px-3 py-1 rounded bg-gray-700 text-white"
          />
          <button
            onClick={() => {
              setFullNameFilter("")
              setStatusFilter("")
              setConfirmationDateFilter("")
              setEmailFilter("")
              setPhoneNumberFilter("")
              setFilter("all")
              setCurrentPage(1)
            }}
            className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600"
          >
            Reset Filters
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={reload}
            className="p-1 bg-gray-700 rounded hover:bg-gray-600 transition-colors duration-200"
            disabled={loading}
          >
            <RefreshCcw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1 || loading}
            className="p-1 bg-gray-700 rounded disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || loading}
            className="p-1 bg-gray-700 rounded disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Confirmation Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Items
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {orders.map((order) => (
                <React.Fragment key={order.id}>
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-black hover:bg-gray-700 transition-colors duration-150 ease-in-out"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">{formatDate(order.createdAt)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-100">
                        {order.firstName} {order.lastName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">{order.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">{order.phoneNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">{order.paymentMethod}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-green-400">{order.totalAmount}€</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={order.status || "on hold"}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as "on hold" | "confirmed")}
                        className="bg-gray-700 text-white px-2 py-1 rounded"
                      >
                        <option value="on hold">On Hold</option>
                        <option value="confirmed">Confirmed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.status === "confirmed" ? formatDate(order.updatedAt) : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200"
                        onClick={() => toggleOrderExpansion(order.id)}
                      >
                        {expandedOrders.has(order.id) ? (
                          <>
                            Hide <ChevronUp className="ml-1" />
                          </>
                        ) : (
                          <>
                            Show <ChevronDown className="ml-1" />
                          </>
                        )}
                      </button>
                    </td>
                  </motion.tr>
                  {expandedOrders.has(order.id) && (
                    <motion.tr
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td colSpan={9} className="px-6 py-4 bg-gray-700">
                        <table className="min-w-full divide-y divide-gray-600">
                          <thead>
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Duration
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Price
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Quantity
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-600">
                            {order.items.map((item, index) => (
                              <tr key={index}>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">{item.duration}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">{item.price}€</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">{item.quantity}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </motion.tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}