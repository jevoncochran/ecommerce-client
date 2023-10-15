"use client";

import React, { useState, useContext } from "react";
import Link from "next/link";
import NavLink from "./nav-link";
import { CartContext } from "@/context/cart-context";
import MobileNavIcon from "./mobile-nav-icon";
import { UiContext } from "@/context/ui-context";

type NavLink = { title: string; href: string };

const Header = () => {
  const { cart } = useContext(CartContext);
  const { isMobileNavVisible } = useContext(UiContext);

  const navLinks: NavLink[] = [
    { title: "Home", href: "/" },
    { title: "Products", href: "/products" },
    { title: "Categories", href: "#" },
    { title: "Account", href: "#" },
    { title: `Cart (${cart.length})`, href: "/cart" },
  ];

  return (
    <header
      className={
        !isMobileNavVisible
          ? "bg-[#222] p-5 flex justify-between w-full"
          : "bg-[#222] p-5 flex flex-col md:flex-row md:justify-between w-full h-full fixed top-0 z-10"
      }
    >
      <Link href="/" className="hidden md:block text-white">
        E-commerce
      </Link>

      <div
        className={
          isMobileNavVisible ? "md:hidden flex justify-end" : "md:hidden"
        }
      >
        <MobileNavIcon />
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-4">
        {navLinks.map((el, idx) => (
          <NavLink key={idx} href={el.href} text={el.title} />
        ))}
      </nav>

      {/* Mobile Nav */}
      {isMobileNavVisible && (
        <nav className="flex flex-col md:hidden">
          {navLinks.map((el, idx) => (
            <NavLink key={idx} href={el.href} text={el.title} />
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
