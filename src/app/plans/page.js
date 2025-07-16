"use client";

import { apiService } from "@/utils/APIService";

const PRODUCTS = {
    starter_monthly: "pri_01k05grsa4vqw35evbbj16scvb",
    starter_annually: "pri_01k05gx1bbtpna0kjzh92jvmf2",
    pro_monthly: "pri_01k05gyeyf1wqt7we25jygtre7",
    pro_annually: "pri_01k05gza58cn1s9rx9rqaxvpk3",
};

export default function PlansPage() {
    return (
        <div className="flex flex-row items-center justify-around p-4 m-4">
            <div className="flex flex-col gap-2">
                <h3>
                    <code>Starter Monthly ($3.99)</code>
                </h3>
                <button
                    className="bg-emerald-800 text-emerald-100 w-30 h-15 rounded-[8px]"
                    onClick={() => {
                        window.Paddle.Checkout.open({
                            items: [
                                {
                                    priceId: PRODUCTS.starter_monthly,
                                    quantity: 1,
                                },
                            ],
                            customer: {
                                token: apiService.isAuthenticated()
                                    ? apiService.getToken()
                                    : "unauthinticated",
                            },
                        });
                    }}
                >
                    Subscribe – Starter Monthly ($3.99)
                </button>
            </div>
        </div>
    );
}
