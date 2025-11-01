import React from "react";
import PropTypes from "prop-types";

export function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}) {
  const variantClass = variant === "primary" ? "btn-primary" : "btn-outline";

  return (
    <button className={`btn ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "outline"]),
  children: PropTypes.node,
  className: PropTypes.string,
};
