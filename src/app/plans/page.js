"use client";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { apiService } from "../../utils/APIService.js";

export default function PlansPage() {
    useEffect(() => {
        if (typeof window !== "undefined" && window.Paddle) {
            window.Paddle.Setup({
                vendor: 34469,
                sandbox: true, // Set to false when going live
            });
        }
    }, []);

    const openCheckout = async () => {
        if (!apiService.isAuthenticated()) {
            alert("Not Authenticated");
            return;
        }

        const token = apiService.getToken();

        let userId = null;
        let userEmail = null;

        try {
            const decoded = jwtDecode(token);
            userId = decoded.id || decoded.sub || decoded.user_id;
            userEmail = decoded.email || decoded.user_email;

            if (!userId || !userEmail) {
                throw new Error("Couldn’t extract user data from token");
            }
        } catch (err) {
            console.error("❌ Failed to decode token", err);
            return alert("Authentication error. Please log in again.");
        }

        const subscriptionTypeName = "starter";
        const subscriptionPeriod = "monthly";
        const amountPaid = 3.99;

        window.Paddle.Checkout.open({
            product: "pro_01k05gqhkkc3wmb3ww6bfhd0t0", // Your Paddle Product ID
            email: userEmail,
            passthrough: JSON.stringify({
                userId,
                plan: subscriptionTypeName,
            }),
            successCallback: async (data) => {
                console.log("✅ Checkout success!", data);

                try {
                    const res = await fetch("/api/paddle/success", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            paddlePaymentId: data.checkout.id, // May vary
                            subscriptionTypeName,
                            subscriptionPeriod,
                            amountPaid,
                        }),
                    });

                    const result = await res.json();

                    if (result.status === "success") {
                        alert("🎉 Subscription activated!");
                        window.location.reload();
                    } else {
                        alert("❌ Something went wrong: " + result.msg);
                    }
                } catch (error) {
                    console.error("❌ Server error:", error);
                    alert("Something went wrong. Please try again.");
                }
            },
        });
    };

    return (
        <main className="p-6">
            <h1 className="text-3xl font-bold mb-4">Subscribe to PrepPal</h1>
            <button
                onClick={openCheckout}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
                Subscribe - Starter
            </button>
        </main>
    );
}
