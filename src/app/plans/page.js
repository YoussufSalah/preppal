"use client";

import { usePaddleCheckout } from "../lib/usePaddleCheckout";

export default function PlansPage() {
    const { openCheckout } = usePaddleCheckout();

    const handleSubscribe = () => {
        openCheckout({
            priceId: "pri_01k05gx1bbtpna0kjzh92jvmf2", // Paddle price ID
            amountPaid: 35.88, // Price
            subscriptionTypeName: "starter", // e.g., "starter"
            subscriptionPeriod: "yearly", // e.g., "monthly"
            token: localStorage.getItem("token"), // or Supabase user session
        });
    };

    return (
        <main className="p-6">
            <h1 className="text-3xl font-bold mb-4">Subscribe to PrepPal</h1>
            <button
                onClick={handleSubscribe}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
                Subscribe - Starter Annual ($35.88)
            </button>
        </main>
    );
}
