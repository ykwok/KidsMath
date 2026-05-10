import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

const variantClasses: Record<string, string> = {
  primary: "bg-achievement-gold text-space-deep hover:bg-achievement-gold/90",
  secondary: "bg-nebula-purple text-starlight hover:bg-nebula-purple/90",
  ghost: "bg-transparent text-starlight hover:bg-starlight/10",
};

const sizeClasses: Record<string, string> = {
  sm: "px-4 py-2 text-child-sm rounded-child",
  md: "px-6 py-3 text-child-base rounded-child",
  lg: "px-8 py-4 text-child-lg rounded-child-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`font-bold active:scale-95 transition-all ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
