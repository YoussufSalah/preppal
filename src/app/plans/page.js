"use client";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { apiService } from "../../utils/APIService.js";

const products = {
    starter_monthly: "pri_01k05grsa4vqw35evbbj16scvb",
    starter_annually: "pri_01k05gx1bbtpna0kjzh92jvmf2",
    pro_monthly: "pri_01k05gyeyf1wqt7we25jygtre7",
    pro_annually: "pri_01k05gza58cn1s9rx9rqaxvpk3",
};

export default function PlansPage() {
    Paddle.Environment.set("sandbox");
    Paddle.Initialize({
        token: process.env.NEXT_PUBLIC_,
        eventCallback: function (data) {
            console.log(data);
        },
    });
    function openCheckout(items, customer) {
        Paddle.Checkout.open({
            items: items,
            customer: customer,
        });
    }
    return (
        <div>
            <h3>
                <code>Paddle.Checkout.open()</code>
            </h3>
            <a href="#" onclick="openCheckout(products.starter_monthly)">
                <b>Sign up now (Starter Monthly)</b>
            </a>
        </div>
    );
}
