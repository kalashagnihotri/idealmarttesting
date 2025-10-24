import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
// Import all images
import image1 from "@/assets/about-img/yummy-big.jpeg";
import image2 from "@/assets/about-img/Pure_Punjabi.png";
import image3 from "@/assets/about-img/rp-image.png";
//import image4 from "@/assets/about-img/ratings.jpeg";
//import image5 from "@/assets/about-img/ratings.jpeg";
//import image6 from "@/assets/about-img/ratings.jpeg";
//import image7 from "@/assets/about-img/ratings.jpeg";
//import image8 from "@/assets/about-img/ratings.jpeg";
import GooglePlay from '@/assets/Home-Banner-img/google-play.jpg';
import AppStore from '@/assets/Home-Banner-img/app-store.jpg';

const styles = {
  page: {
    backgroundColor: '#fff8f5',
    padding: '20px',
    fontFamily: 'Segoe UI, sans-serif',
  },
  container: {
    maxWidth: '600px',
    margin: 'auto',
    backgroundColor: '#b0cece',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  heading: {
    fontSize: '1.5rem',
    color: '#e63946',
    marginBottom: '1rem',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  item: {
    marginBottom: '1rem',
    fontSize: '1rem',
    position: 'relative',
    paddingLeft: '0.5em',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#1d3557',
  },
  contactBox: {
    backgroundColor: '#f1f1f1',
    padding: '10px 15px',
    borderRadius: '8px',
    margin: '1rem 0',
  },
  noteBox: {
    backgroundColor: '#ffeeba',
    padding: '10px',
    borderLeft: '5px solid #ffdd57',
    borderRadius: '8px',
    marginTop: '1rem',
  },
  callToAction: {
    marginTop: '1rem',
  }
};

// Banner content config
const bannerConfig = {
  
  "af64c82b-aa3c-472a-b313-079fcf9d33f5": {
    image: image1,
    title: "Yummy Punjaabi — $15 OFF In-Store",
    body: (
      <>
        <p>
          Get ready to feast on these limited-time, hidden gems—only revealed to our most curious users! 🍽️ Tap into the savings and order now before they vanish! ⏳
        </p>
        <div className="bg-gradient-to-b from-white to-amber-50 py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-amber-500 text-white px-4 py-1 rounded-full font-bold text-sm">IN-STORE EXCLUSIVE</span>
            <h1 className="text-3xl md:text-4xl font-extrabold mt-4">$15 OFF on any $50+ purchase</h1>
            <p className="text-gray-700 mt-2">Drop by <strong>Yummy Punjaabi</strong> and claim this instant in-store discount.</p>

            <div className="mt-6 bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1 text-left">
                <div className="text-5xl font-extrabold text-amber-600">$15<span className="text-xl font-medium ml-2">OFF</span></div>
                <p className="text-sm text-gray-500 mt-1">Valid on in-store purchases of <strong>$50+</strong></p>

                <a href="tel:+14372149266" className="inline-block mt-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-5 py-3 rounded-lg shadow">
                  Call to Redeem • +1 (437) 214-9266
                </a>

                <p className="text-xs text-gray-500 mt-3">
                  • In-store only • Not combinable with other offers • Expires <strong>10/25/2025</strong> • Show this at checkout
                </p>
              </div>
            </div>
          </div>
        </div>    
      </>
    )
  },
  "b1a58e8a-1d4a-4997-b496-e7623a0c18c4": {
    image: image2,
    title: "🪔 Pure Punjaabi Diwali Gift Hampers Sale",
    body: (
      <>
        <div className="bg-gradient-to-b from-amber-50 to-orange-100 py-12 px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-orange-700 mb-4">
            🎁 Pure Punjaabi Diwali Gift Hampers Sale
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto mb-8">
            Celebrate Diwali the Pure Punjaabi way — with sweetness, flavor, and festive joy!  
            Explore our limited-edition hampers filled with authentic treats and handcrafted delights.
          </p>

          <div className="bg-white shadow-xl rounded-2xl max-w-3xl mx-auto p-6">
            <p className="text-3xl font-bold text-red-600 mb-2">✨ Up to $10 OFF ✨</p>
            <p className="text-lg font-semibold text-gray-600 mb-4">On all Diwali Gift Hampers</p>
            <p className="text-sm text-gray-500 mb-6">Available exclusively through !DealMart for a limited time only</p>

            <a 
              href="#"
              onClick={(e) => { e.preventDefault(); navigate('/banner/blank'); }}
              className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-3 rounded-lg shadow-md transition">
              Shop Now on !DealMart
            </a>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            *Offers valid while supplies last. Celebrate responsibly and share the joy!*
          </p>
        </div>
        
      </>
    )
  },
  "440cf386-339a-441e-94d9-d0499b99f172": {
    image: image3,
    title: "🎁 Royal Paan Diwali Gift Hampers — Flat 50% OFF!",
    body: (
      <>
          <h2 className="text-4xl md:text-5xl font-extrabold text-orange-600 mb-4">
            🎁 Royal Paan Diwali Gift Hampers
          </h2>
        <div className="bg-gradient-to-b from-yellow-50 to-orange-50 py-12 px-4 text-center">
          
          <p className="text-gray-700 text-lg max-w-2xl mx-auto mb-8">
            Celebrate this Diwali with love, taste, and tradition!  
            Choose from our premium range of <strong>Royal Paan Gift Hampers</strong> —  
            beautifully packed with dry fruits, sweets, and festive delights.
          </p>
          
          <div className="bg-white shadow-lg rounded-2xl max-w-3xl mx-auto p-6">
            <p className="text-3xl font-bold text-red-600 mb-2">🎉 Flat 50% OFF</p>
            <p className="text-lg font-semibold text-gray-600 mb-4">On all Diwali Gift Hampers</p>
            <p className="text-sm text-gray-500 mb-6">Available exclusively at participating Royal Paan locations</p>

            <a 
              href="#"
              onClick={(e) => { e.preventDefault(); navigate('/banner/blank'); }}
              className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-3 rounded-lg shadow-md transition">
              Order Now on !DealMart
            </a>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            *Offer valid for a limited time only. While supplies last.*
          </p>
        </div>
      </>
    )
  }
};



const EmptySpace = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [bannerId, setBannerId] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/banner/blank');
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("bannerId");
    setBannerId(id);
  }, [location.search]);

  if (!isVisible) return null;

  const banner = bannerConfig[bannerId] || {
    image: image3,
    title: "🎁 Special Offer",
    body: <p>Sorry! This banner is not recognized. Please check back later for more surprises.</p>
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-yellow-50 to-pink-100 flex flex-col h-screen w-screen overflow-hidden">
      

      {/* Image Section */}
      <div className="h-[35vh] w-full flex items-center justify-center animate-fadeIn">
        <div className="w-[99%] h-[99%] rounded-2xl overflow-hidden">
          <img
            src={banner.image}
            alt="Banner"
            className="w-full h-full object-contain"
            draggable={false}
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 w-full overflow-y-auto bg-gradient-to-br from-yellow-50 to-pink-100 px-2 py-2 text-gray-800">
        <div className="max-w-md mx-auto bg-gradient-to-br from-yellow-50 to-pink-100 space-y-4 text-sm sm:text-base">
          <h2 className="text-xl  sm:text-2xl font-bold text-center text-black mb-2">
            {banner.title}
          </h2>
          {banner.body}
        </div>
      </div>
    </div>
  );
};

export default EmptySpace;
