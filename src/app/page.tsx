"use client";

import Featured from "@/components/featured";
import NewProducts from "@/components/new-products";
import { UiContext } from "@/context/ui-context";
import { useContext, useEffect } from "react";

export default function Home() {
  const { hideMobileNav } = useContext(UiContext);

  useEffect(() => {
    hideMobileNav();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Featured />
      <NewProducts />
    </div>
  );
}
