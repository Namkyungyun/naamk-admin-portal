"use client";

import { useEffect } from "react";
import useAuth from "@/app/hooks/checkAuth";

export default function HomePage({ children }) {
    const auth = useAuth();

  /// mount
  useEffect(() => {
      if (!auth.token) {
        auth.logout();
      } else {
        auth.login();
      }
    });

  return (

     <div className="gradient-container">
           <div className="center-box">
           <img src="/logo.svg" alt="Logo" />
           </div>
         </div>
  );
}
