'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Create a Context for the subscription data
const SubscriptionContext = createContext<{
  subscriptionCount: number;
  setSubscriptionCount: (count: number) => void;
} | undefined>(undefined);

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error("useSubscription must be used within a SubscriptionProvider");
  }
  return context;
};

type SubscriptionProviderProps = {
  children: ReactNode;
};

export const SubscriptionProvider = ({ children }: SubscriptionProviderProps) => {
  // Initialize state with a value from local storage, or default to 0
  const [subscriptionCount, setSubscriptionCount] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const storedCount = localStorage.getItem("subscriptionCount");
      return storedCount ? parseInt(storedCount, 10) : 0;
    }
    return 0;
  });

  // Update local storage whenever subscriptionCount changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("subscriptionCount", subscriptionCount.toString());
    }
  }, [subscriptionCount]);

  return (
    <SubscriptionContext.Provider value={{ subscriptionCount, setSubscriptionCount }}>
      {children}
    </SubscriptionContext.Provider>
  );
};