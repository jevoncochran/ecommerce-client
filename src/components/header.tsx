import React from "react";
import Link from "next/link";
import NavLink from "./nav-link";

const Header = () => {
  return (
    <header className=" bg-[#222] p-5 flex justify-between">
      <Link href="/" className="text-white">
        E-commerce
      </Link>
      <nav className="flex gap-4">
        <NavLink href="/" text="Home" />
        <NavLink href="/products" text="Products" />
        <NavLink href="/categories" text="Categories" />
        <NavLink href="/account" text="Account" />
        <NavLink href="/cart" text="Cart (0)" />
      </nav>
    </header>
  );
};

export default Header;
