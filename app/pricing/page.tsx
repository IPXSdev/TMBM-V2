import Link from "next/link";
import { StripeButton } from "@/components/stripe-button";
import { useAuth } from "@/components/auth-provider";
import { useState } from "react";
import { AuthDialog } from "@/components/auth-dialog";

const plans = [
  {
    name: "Creator",
    price: "Free",
    description: "Perfect for getting started",
    features: [
      "Access select podcast clips",
      "Behind-the-scenes sneak peeks",
      "Artist placement news & announcements",
      "Community access",
      "Basic industry insights",
    ],
    priceId: "", // No Stripe price for free plan
    cta: "Sign Up Free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$24.99/mo",
    description: "For serious artists",
    features: [
      "All Creator features",
      "Priority review",
      "Sync shortlist eligibility",
      "Admin feedback",
    ],
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID || "",
    cta: "Subscribe",
    highlight: true,
  },
  {
    name: "Platinum",
    price: "$49.99/mo",
    description: "Ultimate access",
    features: [
      "All Pro features",
      "VIP support",
      "Early access to new features",
      "Platinum badge",
    ],
    priceId: process.env.NEXT_PUBLIC_STRIPE_PLATINUM_MONTHLY_PRICE_ID || "",
    cta: "Subscribe",
    highlight: false,
  },
];

const packs = [
  {
    name: "Silver Pack",
    price: "$4.99",
    description: "+1 Submission",
    priceId: process.env.NEXT_PUBLIC_STRIPE_SILVER_PACK_PRICE_ID || "",
    cta: "Buy Now",
  },
  {
    name: "Gold Pack",
    price: "$9.99",
    description: "+3 Submissions",
    priceId: process.env.NEXT_PUBLIC_STRIPE_GOLD_PACK_PRICE_ID || "",
    cta: "Buy Now",
  },
  {
    name: "Platinum Pack",
    price: "$19.99",
    description: "+7 Submissions",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PLATINUM_PACK_PRICE_ID || "",
    cta: "Buy Now",
  },
];

export default function PricingPage() {
  const { user } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const handleAuthRequired = () => setShowAuth(true);
  const handleAuthClose = () => setShowAuth(false);

  return (
    <main className="min-h-screen bg-black text-white py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Pricing</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <div key={plan.name} className={`rounded-lg p-6 border ${plan.highlight ? "border-blue-500 bg-blue-900/20" : "border-gray-800 bg-gray-900/50"}`}>
              <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
              <p className="text-3xl font-semibold mb-4">{plan.price}</p>
              <p className="mb-4 text-gray-300">{plan.description}</p>
              <ul className="mb-6 space-y-2 text-gray-400">
                {plan.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
              {plan.priceId ? (
                user ? (
                  <StripeButton priceId={plan.priceId} planName={plan.name}>{plan.cta}</StripeButton>
                ) : (
                  <button onClick={handleAuthRequired} className="w-full py-2 px-4 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold">{plan.cta}</button>
                )
              ) : (
                <Link href="/signup" className="w-full block py-2 px-4 rounded bg-gray-700 hover:bg-gray-600 text-white font-semibold text-center">{plan.cta}</Link>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Credit Packs</h2>
          <p className="text-gray-400">One-time purchases for track submissions</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packs.map((pack) => (
            <div key={pack.name} className="rounded-lg p-6 border border-gray-800 bg-gray-900/50">
              <h3 className="text-xl font-bold mb-2">{pack.name}</h3>
              <p className="text-2xl font-semibold mb-4">{pack.price}</p>
              <p className="mb-4 text-gray-300">{pack.description}</p>
              {user ? (
                <StripeButton priceId={pack.priceId} planName={pack.name}>{pack.cta}</StripeButton>
              ) : (
                <button onClick={handleAuthRequired} className="w-full py-2 px-4 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold">{pack.cta}</button>
              )}
            </div>
          ))}
        </div>
        <AuthDialog isOpen={showAuth} onClose={handleAuthClose} />
      </div>
    </main>
  );
}