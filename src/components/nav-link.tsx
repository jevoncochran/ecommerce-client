import React, { useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UiContext } from "@/context/ui-context";

interface NavLinkProps {
  href: string;
  text: string;
}

const NavLink = ({ href, text }: NavLinkProps) => {
  const pathName = usePathname();

  const { hideMobileNav } = useContext(UiContext);

  return (
    <Link
      href={href}
      className="text-[#aaa]"
      onClick={() => {
        // This is how I am closing the mobile nav
        // Because atm, the mobile nav only gets closed when navigating to a different page (to prevent flashing)
        // Without this, the mobile nav does not change when user clicks nav link that corresponds to current page
        if (href === pathName) {
          hideMobileNav();
        }
      }}
    >
      {text}
    </Link>
  );
};

export default NavLink;
