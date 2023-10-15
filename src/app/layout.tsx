"use client";

import { useState } from "react";
import { CartContextProvider } from "@/context/cart-context";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import { IsClientCtxProvider } from "@/context/is-client-context";
import { UiContext } from "@/context/ui-context";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavVisible(!isMobileNavVisible);
  };

  const hideMobileNav = () => {
    setIsMobileNavVisible(false);
  };

  return (
    <html lang="en">
      <IsClientCtxProvider>
        <CartContextProvider>
          <UiContext.Provider
            value={{ isMobileNavVisible, toggleMobileNav, hideMobileNav }}
          >
            <body className={!isMobileNavVisible ? "" : "overflow-y-hidden"}>
              <Header />
              {children}
            </body>
          </UiContext.Provider>
        </CartContextProvider>
      </IsClientCtxProvider>
    </html>
  );
}
