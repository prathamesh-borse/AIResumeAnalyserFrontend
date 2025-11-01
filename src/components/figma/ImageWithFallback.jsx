import React, { useState } from "react";
import PropTypes from "prop-types";

export function ImageWithFallback({
  src,
  alt,
  fallback,
  className = "",
  ...rest
}) {
  const [errored, setErrored] = useState(false);
  const finalSrc = errored ? fallback || "/fallback.png" : src;

  return (
    <img
      src={finalSrc}
      alt={alt || "image"}
      className={className}
      onError={() => setErrored(true)}
      {...rest}
    />
  );
}

ImageWithFallback.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  fallback: PropTypes.string,
  className: PropTypes.string,
};
