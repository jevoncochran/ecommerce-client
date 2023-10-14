import React from "react";

interface WhiteContentBoxProps {
  children: JSX.Element;
  additionalStyles?: string;
}

const WhiteContentBox = ({
  children,
  additionalStyles,
}: WhiteContentBoxProps) => {
  return (
    <div className={`bg-white rounded-lg p-7 ${additionalStyles}`}>
      {children}
    </div>
  );
};

export default WhiteContentBox;
