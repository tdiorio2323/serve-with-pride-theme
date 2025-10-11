import Header from "@/components/Header";
import Hero from "@/components/Hero";
import DonationTracker from "@/components/DonationTracker";
// import ProductGrid from "@/components/ProductGrid";
import ServiceDiscount from "@/components/ServiceDiscount";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <DonationTracker />
        {/* <ProductGrid /> */}
        <ServiceDiscount />
                <section id="mission-merch" className="relative py-16 bg-gray-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: 'url(/path/to/distressed-texture.jpg)' }}></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
              {/* Left Column (Text Block) */}
              <div className="text-center md:text-left mb-10 md:mb-0">
                <h2 className="text-4xl md:text-5xl font-extrabold uppercase mb-6 text-red-600 tracking-wide">
                  TRUTH MEETS THE MERCH
                </h2>
                <p className="text-lg mb-4 font-body">
                  <strong className="text-red-500">HONOR IN EVERY THREAD.</strong> Each piece is made for those who serve—built tough, worn proud.
                </p>
                <p className="text-lg mb-8 font-body">
                  TRUTH isn’t just a brand. It’s a statement.
                </p>
                <a href="/shop" className="inline-block bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-8 rounded-lg border border-red-900 transition duration-300 uppercase tracking-wider shadow-lg">
                  SHOP THE COLLECTION
                </a>
              </div>

              {/* Right Column (Visuals) */}
              <div className="relative flex justify-center items-center h-96">
                <img src="/public/placeholder.svg" alt="Product Mockup 1" className="absolute w-48 h-auto transform -rotate-6 -translate-x-1/4 z-10 border-2 border-red-700 shadow-xl" />
                <img src="/public/placeholder.svg" alt="Product Mockup 2" className="absolute w-48 h-auto transform rotate-3 translate-x-1/4 z-20 border-2 border-red-700 shadow-xl" />
                <img src="/public/placeholder.svg" alt="Product Mockup 3" className="absolute w-48 h-auto transform -rotate-3 translate-y-1/4 z-0 border-2 border-red-700 shadow-xl" />
                <p className="absolute text-white text-2xl md:text-3xl font-bold uppercase tracking-widest opacity-90" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
                  Built on Honor.<br />Worn with Pride.
                </p>
              </div>
            </div>
          </div>
        </section>
                <section id="collections" className="py-16 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-extrabold uppercase mb-12 text-center text-red-600 tracking-wide">
              FEATURED COLLECTIONS
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Collection Tile 1: NEW ARRIVALS */}
              <a href="/shop/new" className="relative bg-gray-800 p-6 rounded-lg border-2 border-red-700 hover:border-red-500 transition-all duration-300 group overflow-hidden flex flex-col items-center justify-center text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-red-700 to-red-900 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <img src="/public/placeholder.svg" alt="New Arrivals" className="w-32 h-32 object-cover mb-4 rounded-full border-2 border-red-600" />
                <h3 className="text-2xl font-bold uppercase text-white mb-2 relative z-10">🔥 NEW ARRIVALS</h3>
                <p className="text-red-300 relative z-10">Fresh drops, bold statements.</p>
              </a>

              {/* Collection Tile 2: VETERAN SERIES */}
              <a href="/shop/veteran" className="relative bg-gray-800 p-6 rounded-lg border-2 border-red-700 hover:border-red-500 transition-all duration-300 group overflow-hidden flex flex-col items-center justify-center text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-red-700 to-red-900 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <img src="/public/placeholder.svg" alt="Veteran Series" className="w-32 h-32 object-cover mb-4 rounded-full border-2 border-red-600" />
                <h3 className="text-2xl font-bold uppercase text-white mb-2 relative z-10">🇺🇸 VETERAN SERIES</h3>
                <p className="text-red-300 relative z-10">Honoring those who served.</p>
              </a>

              {/* Collection Tile 3: FIRST RESPONDER EDITION */}
              <a href="/shop/first-responder" className="relative bg-gray-800 p-6 rounded-lg border-2 border-red-700 hover:border-red-500 transition-all duration-300 group overflow-hidden flex flex-col items-center justify-center text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-red-700 to-red-900 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <img src="/public/placeholder.svg" alt="First Responder Edition" className="w-32 h-32 object-cover mb-4 rounded-full border-2 border-red-600" />
                <h3 className="text-2xl font-bold uppercase text-white mb-2 relative z-10">🚒 FIRST RESPONDER EDITION</h3>
                <p className="text-red-300 relative z-10">For the brave, by the brave.</p>
              </a>

              {/* Collection Tile 4: TRUTH CLASSICS */}
              <a href="/shop/classics" className="relative bg-gray-800 p-6 rounded-lg border-2 border-red-700 hover:border-red-500 transition-all duration-300 group overflow-hidden flex flex-col items-center justify-center text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-red-700 to-red-900 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <img src="/public/placeholder.svg" alt="Truth Classics" className="w-32 h-32 object-cover mb-4 rounded-full border-2 border-red-600" />
                <h3 className="text-2xl font-bold uppercase text-white mb-2 relative z-10">🦅 TRUTH CLASSICS</h3>
                <p className="text-red-300 relative z-10">Timeless designs, unwavering values.</p>
              </a>
            </div>
          </div>
        </section>
                <section id="social-proof" className="py-16 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-extrabold uppercase mb-12 text-center text-red-600 tracking-wide">
              REAL AMERICANS. REAL STORIES.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial Card 1 */}
              <div className="bg-gray-800 p-8 rounded-lg border-2 border-red-700 shadow-lg text-center">
                <img src="/public/placeholder.svg" alt="Avatar" className="w-24 h-24 rounded-full mx-auto mb-6 object-cover border-4 border-red-600" />
                <p className="text-lg italic text-gray-300 mb-6 font-body">
                  "Built right, worn with conviction. This gear stands up to the job."
                </p>
                <p className="font-bold text-red-500 uppercase font-display">John S., Veteran</p>
              </div>

              {/* Testimonial Card 2 */}
              <div className="bg-gray-800 p-8 rounded-lg border-2 border-red-700 shadow-lg text-center">
                <img src="/public/placeholder.svg" alt="Avatar" className="w-24 h-24 rounded-full mx-auto mb-6 object-cover border-4 border-red-600" />
                <p className="text-lg italic text-gray-300 mb-6 font-body">
                  "Finally, a brand that speaks my language. Quality and patriotism combined."
                </p>
                <p className="font-bold text-red-500 uppercase font-display">Sarah C., Officer</p>
              </div>

              {/* Testimonial Card 3 */}
              <div className="bg-gray-800 p-8 rounded-lg border-2 border-red-700 shadow-lg text-center">
                <img src="/public/placeholder.svg" alt="Avatar" className="w-24 h-24 rounded-full mx-auto mb-6 object-cover border-4 border-red-600" />
                <p className="text-lg italic text-gray-300 mb-6 font-body">
                  "Proud to wear TRUTH. The designs are sharp and the message is clear."
                </p>
                <p className="font-bold text-red-500 uppercase font-display">Mike D., Patriot</p>
              </div>
            </div>

            <div className="text-center mt-12">
              <a href="/stories" className="inline-block bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-8 rounded-lg border border-red-900 transition duration-300 uppercase tracking-wider shadow-lg">
                JOIN THE MOVEMENT
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;