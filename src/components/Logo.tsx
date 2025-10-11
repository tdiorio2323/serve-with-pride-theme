import React from 'react';
import { Link } from 'react-router-dom';
import { Img } from "@/components/Img";

const Logo: React.FC = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Link to="/">
        <Img
          src="/truth-logo.png"
          alt="Truth Matters Logo"
          fetchPriority="high"
          decoding="async"
          width={120}
          height={80}
          className="h-20 w-auto object-contain"
        />
      </Link>
    </div>
  );
};

export default Logo;
