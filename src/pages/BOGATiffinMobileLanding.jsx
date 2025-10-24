// BOGATiffinMobileLanding.jsx
import React from "react";
import { Button } from "@/components/ui/button";

const BOGATiffinMobileLanding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-100 text-gray-800 font-inter">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 bg-white shadow-md sticky top-0 z-50">
        <img src="/images/dealmart-logo.png" alt="!DealMart Logo" className="h-10 w-auto" />
        <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-3 py-1">
          Get the App
        </Button>
      </header>

      {/* Hero Section */}
      <section className="relative text-center py-16 px-4 bg-[url('https://images.unsplash.com/photo-1601050690597-7c8df2439b53?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center rounded-b-xl">
        <div className="absolute inset-0 bg-black/50 rounded-b-xl"></div>
        <div className="relative z-10 text-white">
          <h1 className="text-3xl font-bold mb-2">🍱 BOGA Tiffin Services</h1>
          <p className="text-sm mb-4 font-light">
            Buy Once. Get Anywhere — enjoy your daily meal from partnered restaurants on !DealMart.
          </p>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-6 py-2">
            Subscribe Now
          </Button>
        </div>
      </section>

      {/* Meal Options */}
      <section className="py-12 px-4 text-center">
        <h2 className="text-2xl font-bold text-orange-600 mb-6">Your Daily Meal, Your Choice</h2>
        <div className="space-y-4">
          {[
            { title: "2 Roti + Rice + 2 Curries", sub: "Veg or Non-Veg" },
            { title: "4 Roti + 2 Curries", sub: "Perfect for everyday hunger" },
            { title: "8 Roti + 3 Curries", sub: "For the hearty eater" },
          ].map((meal, i) => (
            <div
              key={i}
              className="bg-gradient-to-r from-orange-400 to-yellow-300 rounded-xl shadow-md p-4 text-white font-semibold"
            >
              <h3 className="text-lg mb-1">{meal.title}</h3>
              <p className="text-sm opacity-90">{meal.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-4 bg-orange-50">
        <h2 className="text-2xl font-bold text-center mb-6 text-orange-600">Why Choose BOGA?</h2>
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 shadow-md text-center">
            <p className="font-semibold mb-1">Choice of Restaurants</p>
            <p className="text-sm text-gray-600">Pick any partnered restaurant daily for your tiffin.</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md text-center">
            <p className="font-semibold mb-1">Quick QR Pickup</p>
            <p className="text-sm text-gray-600">Scan your QR from !DealMart Rewards or Insights section.</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md text-center">
            <p className="font-semibold mb-1">Carry Forward Meals</p>
            <p className="text-sm text-gray-600">Unused days can be carried forward with conditions.</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md text-center">
            <p className="font-semibold mb-1">Loyalty Benefits</p>
            <p className="text-sm text-gray-600">Enjoy meals even if you can’t pay upfront — for loyal users.</p>
          </div>
        </div>
      </section>

      {/* Loyalty Section */}
      <section className="py-16 px-4 text-center bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-xl">
        <h2 className="text-2xl font-bold mb-2">Loyalty That Feeds You ❤️</h2>
        <p className="text-sm max-w-md mx-auto">
          Loyal !DealMart users who have supported our platform can still enjoy their meals even without upfront payment.  
          BOGA isn’t just food — it’s care, community, and choice.
        </p>
      </section>

      {/* Footer CTA */}
      <footer className="py-12 px-4 text-center bg-gray-900 text-white">
        <h2 className="text-xl font-bold mb-2">Ready to Taste Freedom?</h2>
        <p className="text-gray-300 mb-4 text-sm">
          Subscribe to BOGA Tiffin Services today — and enjoy your meals, your way!
        </p>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-6 py-2">
          Join BOGA Now
        </Button>
        <p className="mt-4 text-gray-400 text-xs">Powered by !DealMart</p>
      </footer>
    </div>
  );
};
export default BOGATiffinMobileLanding;