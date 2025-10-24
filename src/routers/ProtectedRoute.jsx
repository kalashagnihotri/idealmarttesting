import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component }) => {
    // Check if token exists in sessionStorage
    const token = sessionStorage.getItem("authToken");
    //const token = "caa39fb1b7fe0a1b8a182476d5490c45dd7caf65";
    console.log("ProtectedRoute - Token:", token);

    if (!token) {
        // Redirect to error page if token is missing
        console.log("ProtectedRoute - No token found, redirecting to /error");
        return <Navigate to="/error" replace />;
    }

    // Render the component if token is valid
    return <Component />;
};

export default ProtectedRoute;
