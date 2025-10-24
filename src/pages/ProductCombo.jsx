import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchComboProduct } from "@/features/combos/combosSlice";
import axios from "axios";
const BaseUrl = import.meta.env.VITE_BACKEND_API_URL

const ProductCombo = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const comboId = queryParams.get("productId");
  const token = queryParams.get("token");
  const [selectedAddons, setSelectedAddons] = useState({});
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

useEffect(
  ()=>{
    const fetchData =async ()=>{
      if (comboId && token){
        dispatch(fetchComboProduct({id: comboId,token: token}));
      }
      
    };
    fetchData();
  },[ dispatch,comboId, token ]
)
  

  const {
    product: comboData,
    loading,
    error,
  } = useSelector((state) => state.combos);



  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-red-500 text-center">{error}</div>;
  const { product_details, addon } = comboData || {};
  if (!product_details || !addon) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            No Product Data Found
          </h2>
        </div>
      </div>
    );
  }

  const basePrice = parseFloat(product_details.discount_price);
const handleAddToCart = async () => {
   const formattedAddons = {};
   console.log('Button pressed!')

  Object.entries(selectedAddons).forEach(([addonKey, value]) => {
    const addOn = addon.find((a) => a.id.toString() === addonKey);
    if (!addOn) return;

    const title = addOn.title;

    if (Array.isArray(value)) {
      formattedAddons[title] = value.map((option) => ({
        name: option.name,
        price: option.price,
        detail: option.detail,
      }));
    } else {
      formattedAddons[title] = {
        name: value.name,
        price: value.price,
        detail: value.detail,
      };
    }
  });

  formattedAddons.instructions = specialInstructions;
  console.log("AddsOn",JSON.stringify(formattedAddons))
  console.log('formattedResponse',formattedAddons)

  const addonTotal = (finalPrice / quantity - basePrice).toFixed(2);

  const finalPayload = {
    product_id: product_details.id,
    quantity: quantity,
    addon: JSON.stringify(formattedAddons),
    addonTotal: addonTotal,
  };

    console.log("PayLoad", finalPayload);
  // const apiUrl = `http://127.0.0.1:8000/api/cart/v2/item/create-multiple/?postalcod=${postalcode}`;

try {
  // const response = await axios.post(apiUrl, DataPlayLoad, {
  const response = await axios.post(`${BaseUrl}/api/cart/v2/item/create-multiple/?postalcode=L6V6B1`,
     finalPayload,  
 
      {
        headers: {
          "Authorization": `Token ${token}`,
          "Content-Type": "application/json"
        },
      }
    );
   console.log('Token',token)
    console.log('finalPlayload',JSON.stringify(formattedAddons)) 
 if (response.status === 201) {
    console.log("Status is 201, showing success modal");
       console.log('Status',"Successfully created!")
      console.log("Modal State:", showSuccessModal);

    setShowSuccessModal(true);
    setErrorMessage(null); // Clear any previous error
  }
    return response.status;
  }
  catch (error) {
    const msg =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      "Failed to add item to cart. Please try again.";
  
    console.error("Add to cart failed:", msg);
    setErrorMessage(msg);
  
    setTimeout(() => setErrorMessage(null), 2000);
  }
};

const handleSelection = (addonKey, option) => {
  const addOn = addon.find((a) => a.id === addonKey);
  if (!addOn) return;

  const freeLimit = addOn.freeLimit || 0;

  if (addOn.multiSelect) {
    const prevSelections = selectedAddons[addonKey] || [];
    const alreadySelected = prevSelections.find((o) => o.name === option.name);

    let updatedSelections;

    if (alreadySelected) {
      updatedSelections = prevSelections.filter((o) => o.name !== option.name);
    } else {
      updatedSelections = [
        ...prevSelections,
        {
          name: option.name,
          price: option.price, // temp, will overwrite below
          detail: option.details,
        },
      ];
    }

    // Sort to make consistent pricing — optional step
    updatedSelections = updatedSelections.slice(0, 20); // in case someone selects too many

    // Apply freeLimit logic
    updatedSelections = updatedSelections.map((item, idx) => ({
      ...item,
      price: idx < freeLimit ? "0.00" : item.price,
    }));

    setSelectedAddons({
      ...selectedAddons,
      [addonKey]: updatedSelections,
    });

  } else {
    setSelectedAddons({
      ...selectedAddons,
      [addonKey]: {
        name: option.name,
        price: option.price,
        detail: option.details,
      },
    });
  }
};

  const calculateFinalPrice = () => {
    let total = parseFloat(product_details?.discount_price) || 0;

    addon.forEach((addonData) => {
      const addonKey = addonData.id;
      const selected = selectedAddons[addonKey];

      if (addonData.multiSelect && Array.isArray(selected)) {
        const freeLimit = addonData.freeLimit || 0;

        selected.forEach((option, idx) => {
          if (option && option.name && idx >= freeLimit) {
            total += parseFloat(option.price || 0);
          }
        });
      } else if (selected && selected.name) {
        total += parseFloat(selected.price || 0);
      }
    });

    return total * quantity;
  };

  const finalPrice = calculateFinalPrice();

  const isAddToCartDisabled = () => {
    return addon.some((addonData) => {
      const addonKey = addonData.id;

      if (addonData.isRequired) {
        if (addonData.multiSelect) {
          return !(
            selectedAddons[addonKey] && selectedAddons[addonKey].length > 0
          );
        } else {
          return !selectedAddons[addonKey];
        }
      }

      return false;
    });
  };

  {
    /* UI */
  }
  return (
    <div className="flex flex-col items-center min-h-screen pb-28 pt-6 px-4 text-gray-800 bg-gray-50">
      {/* Image and Popup */}
      <div
        className="w-full mb-6 cursor-pointer"
        onClick={() => setShowImagePopup(true)}
      >
        <img
          src={product_details.image_url}
          alt={product_details.name}
          className="w-full max-h-60 object-contain rounded-lg"
        />
      </div>

      {showImagePopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={() => setShowImagePopup(false)}
        >
          <div className="p-4 sm:p-8 max-w-full max-h-full">
            <img
              src={product_details.image_url}
              alt={product_details.name}
              className="max-w-[90vw] max-h-[90vh] rounded-lg"
            />
          </div>
        </div>
      )}

{errorMessage && (
  <div 
    className="fixed bottom-16 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce z-[9999]"
    style={{ maxWidth: "90%", width: "fit-content" }}
  >
    <div className="flex items-center space-x-2">
      <svg 
        className="w-5 h-5 fill-current text-white" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 20 20"
      >
        <path 
          d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zM9 7h2v4H9V7zm0 6h2v2H9v-2z"
        />
      </svg>
      <span>{errorMessage}</span>
    </div>
  </div>
)}


{showSuccessModal && (
  <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
    <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm text-center">
      <h2 className="text-xl font-bold text-[#1D4A4D] mb-4">Item added to cart</h2>
      <button
        className="bg-[#1D4A4D] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#173c3e] transition"
        onClick={() =>{ 
          window.location.href = 'about:blank';
          setShowSuccessModal(false)
        }}
      >
        Okay
      </button>
    </div>
  </div>
)}


      {/* Product Details */}
      <div className="w-full">
        <h1 className="text-xl font-bold mb-2">{product_details.name}</h1>
        <p className="text-gray-600 mb-4">
          {product_details.product_description}
        </p>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-gray-500 line-through text-sm">
            ${product_details?.price}
          </span>
          <span className="text-[#1D4A4D] font-bold text-lg">
            ${basePrice.toFixed(2)}
          </span>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-sm font-medium">Quantity:</span>
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
            <button
              type="button"
              className="px-3 py-1 text-lg text-gray-700 hover:bg-gray-100"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            >
              -
            </button>
            <span className="px-4 py-1 text-base font-semibold bg-white">
              {quantity}
            </span>
            <button
              type="button"
              className="px-3 py-1 text-lg text-gray-700 hover:bg-gray-100"
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Addons */}
      <div className="w-full">
        {addon.map((addonData) => {
          const addonKey = addonData.id;
          return (
            <div key={addonKey} className="mb-4 border-b pb-2">
              <h2 className="font-semibold mb-2">
                {addonData.title}{" "}
                {addonData.isRequired && (
                  <span className="text-red-500">*</span>
                )}
              </h2>
              <div
                className={
                  addonData.multiSelect
                    ? "flex flex-wrap gap-2"
                    : "flex flex-col gap-2"
                }
              >
                {addonData.options.map((option, idx) => {
                  const selected = selectedAddons[addonKey] || [];
                  const isSelected = addonData.multiSelect
                    ? selected.some((o) => o.name === option.name)
                    : selectedAddons[addonKey]?.name === option.name;
                  return addonData.multiSelect ? (
                    <label
                      key={idx}
                      className={`flex items-start gap-3 border px-4 py-3 rounded-xl text-sm transition-all duration-200 ease-in-out
    border-gray-300 shadow-sm
    ${
      !option.available
        ? "opacity-50 cursor-not-allowed"
        : "hover:shadow-md hover:-translate-y-[1px] hover:border-[#1D4A4D] cursor-pointer"
    }
  `}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        disabled={!option.available}
                        onChange={() => handleSelection(addonKey, option)}
                        className="mt-1 accent-[#1D4A4D] w-5 h-5"
                      />

                      <div className="text-left">
                        <div className="mb-1 font-semibold text-black">
                          {option.name}
                          {parseFloat(option.price) !== 0 &&
                            ` ($${option.price})`}
                        </div>
                        <div className="text-sm text-gray-500">
                          {option.details}
                        </div>
                      </div>
                    </label>
                  ) : (
                    <label
                      key={idx}
                      className={`flex items-center gap-3 cursor-pointer ${
                        !option.available ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name={addonKey}
                        disabled={!option.available}
                        checked={isSelected}
                        onChange={() => handleSelection(addonKey, option)}
                        className="accent-[#1D4A4D]"
                      />
                      <span>
                        <div className="text-left">
                          <div className="font-medium">
                            {option.name}{" "}
                            {parseFloat(option.price) !== 0 &&
                              ` ($${option.price})`}
                          </div>
                          <div className="text-sm text-gray-500">
                            {option.details}
                          </div>
                        </div>
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {/* Special Instructions */}
      <div className="w-full mb-6">
        <h2 className="font-semibold mb-2">Special Instructions</h2>
        <textarea
          className="w-full p-3 border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#1D4A4D]"
          rows={4}
          placeholder="e.g., Please make it extra crispy, no onions, etc."
          value={specialInstructions}
          onChange={(e) => setSpecialInstructions(e.target.value)}
        />
      </div>
      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-2px_12px_rgba(0,0,0,0.1)] px-6 py-4 flex justify-between items-center rounded-t-lg border-t z-40">
        <div className="text-lg font-bold">
          <span className="text-black">You Pay:</span>{" "}
          <span className="text-[#1D4A4D]">${finalPrice.toFixed(2)}</span>
        </div>
        <button
          className={`px-4 py-2 rounded-lg font-semibold ${
            isAddToCartDisabled()
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-[#1D4A4D] text-white"
          }`}
          disabled={isAddToCartDisabled()}
          onClick={()=>handleAddToCart()}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCombo;
