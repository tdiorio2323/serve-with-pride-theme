import React from 'react';
import CollectionTile from './CollectionTile';

const collectionsData = [
  {
    href: '/shop/new',
    imageSrc: '/TRUTH-red-white-blue.jpg',
    altText: 'New Arrivals',
    title: 'NEW ARRIVALS',
    description: 'Fresh drops, bold statements.',
    icon: '🔥',
  },
  {
    href: '/shop/veteran',
    imageSrc: '/TRUTH-red-white-blue.jpg',
    altText: 'Veteran Series',
    title: 'VETERAN SERIES',
    description: 'Honoring those who served.',
    icon: '🇺🇸',
  },
  {
    href: '/shop/first-responder',
    imageSrc: '/TRUTH-red-white-blue.jpg',
    altText: 'First Responder Edition',
    title: 'FIRST RESPONDER EDITION',
    description: 'For the brave, by the brave.',
    icon: '🚒',
  },
  {
    href: '/shop/classics',
    imageSrc: '/TRUTH-red-white-blue.jpg',
    altText: 'Truth Classics',
    title: 'TRUTH CLASSICS',
    description: 'Timeless designs, unwavering values.',
    icon: '🦅',
  },
];

const CollectionsSection: React.FC = () => {
  return (
    <section id="collections" className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-extrabold uppercase mb-12 text-center text-red-600 tracking-wide">
          FEATURED COLLECTIONS
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {collectionsData.map((collection, index) => (
            <CollectionTile key={index} {...collection} />
          ))}
        </div>
      </div>
    </section>  );
};

export default CollectionsSection;
