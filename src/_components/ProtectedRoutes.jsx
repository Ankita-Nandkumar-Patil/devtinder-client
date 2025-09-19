import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ children }) {
  const user = useSelector((store) => store.user);

  if (!user) {
    // redirect to login and replace history
    return <Navigate to="/login" replace />;
  }

  return children;
}

// navigate() is imperative (meant for event handlers / effects).
// In render, you should return <Navigate to="/login" replace />.

// Normally, when you navigate to a new route, React Router pushes that route into the browser history stack.
// This means the user can click Back and return to the previous page.

// If you use replace: true, React Router replaces the current entry in the history stack instead of adding a new one.
// → So pressing Back won’t take the user to the previous (restricted) page.
