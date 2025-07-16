"use client";
import PaddleScript from "../components/PaddleScript";

const products = {
    starter_monthly: "pri_01k05grsa4vqw35evbbj16scvb",
    starter_annually: "pri_01k05gx1bbtpna0kjzh92jvmf2",
    pro_monthly: "pri_01k05gyeyf1wqt7we25jygtre7",
    pro_annually: "pri_01k05gza58cn1s9rx9rqaxvpk3",
};

export default function PlansPage() {
    function openCheckout(items, customer) {
        Paddle.Checkout.open({
            items: items,
            customer: customer,
        });
    }
    return (
        <div className="flex flex-row items-center justify-around p-4 m-4">
            <PaddleScript />
            <div className="flex flex-col gap-2">
                <h3>
                    <code>Starter Monthly ($3.99)</code>
                </h3>
                <a
                    href="#"
                    className="bg-emerald-700 text-emerald-100 w-40 h-20 rounded-xl"
                    onClick={openCheckout(products.starter_monthly)}
                >
                    <b>Sign up now</b>
                </a>
            </div>
        </div>
    );
}
