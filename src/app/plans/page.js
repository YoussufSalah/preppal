"use client";
import { useEffect, useState } from "react";
import { apiService } from "@/utils/APIService";
import { jwtDecode } from "jwt-decode";

const PRODUCTS = {
    starter_monthly: "pri_01k05grsa4vqw35evbbj16scvb",
};

export default function PlansPage() {
    const [ready, setReady] = useState(false);
    const token = apiService.getToken();
    const decoded = token ? jwtDecode(token) : null;

    useEffect(() => {
        if (typeof window !== "undefined" && window.Paddle) {
            window.Paddle.Environment.set("sandbox"); // or "production"
            window.Paddle.Initialize({
                token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
                eventCallback: (data) => {
                    console.log("Paddle event:", data);
                },
            });
            setReady(true);
        }
    }, []);

    if (!decoded) {
        return <p className="p-6">You must be logged in to subscribe.</p>;
    }

    const handleCheckout = () => {
        if (!window?.Paddle || !ready) return alert("Checkout not ready");

        console.log({
            items: [
                {
                    priceId: PRODUCTS.starter_monthly,
                    quantity: 1,
                },
            ],
            customer: {
                email: decoded.email,
                name: decoded.user_metadata?.username ?? "Anonymous",
                metadata: {
                    user_id: decoded.sub,
                },
            },
        });

        const payload = {
            items: [
                {
                    priceId: PRODUCTS.starter_monthly,
                    quantity: 1,
                },
            ],
            customer: {
                email: decoded.email,
                name: decoded.user_metadata?.username ?? "Anonymous",
                metadata: {
                    user_id: decoded.sub,
                },
            },
        };

        console.log("🔍 Checkout Payload", payload);

        if (!window?.Paddle) return alert("Paddle not ready");

        window.Paddle.Checkout.open(payload);
    };

    return (
        <div className="flex flex-row items-center justify-around p-4 m-4">
            <div className="flex flex-col gap-2">
                <h3>
                    <code>Starter Monthly ($3.99)</code>
                </h3>
                <button
                    className="bg-emerald-800 text-emerald-100 w-30 h-15 rounded-[8px]"
                    onClick={handleCheckout}
                >
                    Subscribe – Starter Monthly ($3.99)
                </button>
            </div>
        </div>
    );
}
