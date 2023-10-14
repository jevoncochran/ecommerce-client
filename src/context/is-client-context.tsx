"use client";

import { createContext, useContext, useEffect, useState } from "react";

const IsClientCtx = createContext(false);

export const IsClientCtxProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <IsClientCtx.Provider value={isClient}>{children}</IsClientCtx.Provider>
  );
};

export const useIsClient = () => {
  return useContext(IsClientCtx);
};
