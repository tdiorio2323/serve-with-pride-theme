import React from 'react';
import { Link } from 'react-router-dom';
import { Img } from "@/components/Img";

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <Link to="/">
      <Img
        src="/truth-logo.png"
        alt="Truth Matters Logo"
        fetchPriority="high"
        decoding="async"
        width={120}
        height={80}
        className={`w-auto object-contain ${className}`}
      />
    </Link>
  );
};

export default Logo;
