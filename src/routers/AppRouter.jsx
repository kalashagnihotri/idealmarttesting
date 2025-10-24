import { Route, Routes } from "react-router-dom";
import {
    Home,
    Pages,
    Shop,
    StorePage,
    Vendor,
    Pricing,
    AboutUs,
    BOGATiffinMobileLanding,
    Contact,
    FAQsPage,
    PrivacyPolicyPage,
    CartItems,
    Combos,
    ProductCombo,
    Error,
    ProductDetail,
    SingleProductDetail,
    Register,
    Dashboard,
    SpinGame,
    SpinGame2,
    SpinGame3, 
    TicTacGame,
    MemoryCardGame,
    QuizGame,
    EmptySpace,
    Blank,
    DiwaliContest,
    SavingsAndSpent,
    Feedback,
} from "@/pages";
import React from "react";
import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/pages" element={<Pages />} /> */}
            {/* <Route path="/shop" element={<Shop />} /> */}
            <Route path="/store" element={<StorePage />} />
            {/* <Route path="/vendor" element={<Vendor />} /> */}
            {/* <Route path="/pricing" element={<Pricing />} /> */}
            <Route path="/about" element={<AboutUs />} />
            <Route path="/boga" element={<BOGATiffinMobileLanding />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faqs" element={<FAQsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            {/* <Route path="/cart" element={<CartItems />} /> */}
            {/* <Route path="/combos/coming-soon" element={<Combos />} /> */}
            {/* <Route path="/product/:id" element={<ProductDetail />} /> */}
            <Route path="/product-detail" element={<SingleProductDetail />} />

            <Route
                path="/savings-and-spent"
                element={<SavingsAndSpent />}
            />

            <Route
                path="/feedback"
                element={<Feedback />}
            />

            {/* <Route path="/register" element={<Register />} /> */}
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}

            <Route
                path="/combos/coming-soon"
                element={<ProtectedRoute element={Combos} />}
            />

            <Route
                path="/combos"
                element={<ProtectedRoute element={ProductCombo} />}
            />

            <Route
                path="/games/spinning-wheel"
                element={<ProtectedRoute element={SpinGame} />}
            />

           <Route
                path="/games/spinning-wheel2"
                element={<ProtectedRoute element={SpinGame2} />}
            />

            <Route
                path="/games/spinning-wheel3"
                element={<ProtectedRoute element={SpinGame3} />}
            />
            <Route
                path="/games/tic-tac-toe"
                element={<ProtectedRoute element={TicTacGame} />}
            />
            {/* <Route
                path="/games/tic-tac-toe"
                element={<TicTacGame />}
            /> */}

            <Route
                path="/games/memory-card"
                element={<ProtectedRoute element={MemoryCardGame} />}
            />
            {/* <Route
                path="/games/memory-card"
                element={<MemoryCardGame />}
            /> */}

            <Route
                path="/games/quiz"
                element={<QuizGame />}
            />

            <Route
                path="/games/empty"
                element={<EmptySpace />}
            />
            {/* <Route
            path="/games/quiz"
            element={<ProtectedRoute element={QuizGame} />}
            /> */}

            <Route
                path="/games/blank"
                element={<ProtectedRoute element={Blank} />}
            />

            <Route
                path="/contests/diwali"
                element={<DiwaliContest />}
            />

            <Route path="*" element={<Error />} />
        </Routes>
    );
};

export default AppRouter;
