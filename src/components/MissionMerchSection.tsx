import React from 'react';

const MissionMerchSection: React.FC = () => {
  return (
    <section id="mission-merch" className="relative py-16 bg-white text-gray-900 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: 'url(/distressed-texture.jpg)' }}></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
          {/* Left Column (Text Block) */}
          <div className="text-center md:text-left mb-10 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-extrabold uppercase mb-6 text-red-600 tracking-wide">
              TRUTH MEETS THE MERCH
            </h2>
            <p className="text-lg mb-4 font-body text-gray-800">
              <strong className="text-red-600">HONOR IN EVERY THREAD.</strong> Each piece is made for those who serve—built tough, worn proud.
            </p>
            <p className="text-lg mb-8 font-body text-gray-800">
              TRUTH isn't just a brand. It's a statement.
            </p>
            <a href="/shop" className="inline-block bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-8 rounded-lg border border-red-900 transition duration-300 uppercase tracking-wider shadow-lg">
              SHOP THE COLLECTION
            </a>
          </div>

          {/* Right Column (Visuals) */}
          <div className="relative flex justify-center items-center h-96">
            <img src="/TRUTH-red-white-blue.jpg" alt="Product Mockup 1" className="absolute w-48 h-auto transform -rotate-6 -translate-x-1/4 z-10 border-2 border-red-700 shadow-xl" />
            <img src="/TRUTH-red-white-blue.jpg" alt="Product Mockup 2" className="absolute w-48 h-auto transform rotate-3 translate-x-1/4 z-20 border-2 border-red-700 shadow-xl" />
            <img src="/TRUTH-red-white-blue.jpg" alt="Product Mockup 3" className="absolute w-48 h-auto transform -rotate-3 translate-y-1/4 z-0 border-2 border-red-700 shadow-xl" />
            <p className="absolute text-gray-900 text-2xl md:text-3xl font-bold uppercase tracking-widest opacity-90">
              Built on Honor.<br />Worn with Pride.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionMerchSection;
