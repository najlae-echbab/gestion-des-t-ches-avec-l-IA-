import React from "react";

interface ListHeaderProps {
  title: string;
}

const primaryColor = "text-primary";       // couleur texte principale
const primaryBgColor = "bg-primary";       // couleur de fond (underline)

export default function ListHeader({ title }: ListHeaderProps) {
  return (
    <h2
      className={`
        text-3xl font-extrabold font-serif mb-8
        text-center 
        relative inline-block 
        cursor-default select-none
        group
        ${primaryColor}
      `}
      aria-label={title}
    >
      {title}
      <span
        className={`
          block h-1 max-w-0 
          group-hover:max-w-full 
          transition-all duration-500 
          ${primaryBgColor} 
          rounded mt-2
        `}
        aria-hidden="true"
      ></span>
    </h2>
  );
}
