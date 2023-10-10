import React from "react";
import Link from "next/link";

interface NavLinkProps {
  href: string;
  text: string;
}

const NavLink = ({ href, text }: NavLinkProps) => {
  return (
    <Link href={href} className="text-[#aaa]">
      {text}
    </Link>
  );
};

export default NavLink;
