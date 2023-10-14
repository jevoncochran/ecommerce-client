import { useContext } from "react";
import { UiContext } from "@/context/ui-context";

const MobileNavIcon = () => {
  const { isMobileNavVisible, toggleMobileNav } = useContext(UiContext);

  return isMobileNavVisible ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      onClick={toggleMobileNav}
      className="w-6 h-6 text-[#aaa]"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      onClick={toggleMobileNav}
      className="w-6 h-6 text-[#aaa]"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
};

export default MobileNavIcon;
