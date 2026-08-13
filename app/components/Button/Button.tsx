"use client";

import React from "react";
import styles from "./Button.module.scss";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "dark";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${styles[variant]} ${className}`}
    >
      <span className={styles.inner}>{children}</span>
    </button>
  );
}
