import React from 'react';
import { Link } from 'react-router-dom';

interface CollectionTileProps {
  href: string;
  imageSrc: string;
  altText: string;
  title: string;
  description: string;
  icon?: string; // Optional icon for the title
}

const CollectionTile: React.FC<CollectionTileProps> = ({ href, imageSrc, altText, title, description, icon }) => {
  return (
    <Link to={href} className="relative bg-gray-800 p-6 rounded-lg border-2 border-red-700 hover:border-red-500 transition-all duration-300 group overflow-hidden flex flex-col items-center justify-center text-center">
      <div className="absolute inset-0 bg-gradient-to-br from-red-700 to-red-900 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
      <img src={imageSrc} alt={altText} className="w-32 h-32 object-cover mb-4 rounded-full border-2 border-red-600" />
      <h3 className="text-2xl font-bold uppercase text-white mb-2 relative z-10">
        {icon && <span className="mr-2">{icon}</span>}{title}
      </h3>
      <p className="text-red-300 relative z-10">{description}</p>
    </Link>
  );
};

export default CollectionTile;
