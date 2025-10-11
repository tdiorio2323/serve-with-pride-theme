import React from 'react';
import TestimonialCard from './TestimonialCard';

const testimonialsData = [
  {
    avatarSrc: '/TRUTH-red-white-blue.jpg',
    quote: 'Built right, worn with conviction. This gear stands up to the job.',
    author: 'John S., Veteran',
  },
  {
    avatarSrc: '/TRUTH-red-white-blue.jpg',
    quote: 'Finally, a brand that speaks my language. Quality and patriotism combined.',
    author: 'Sarah C., Officer',
  },
  {
    avatarSrc: '/TRUTH-red-white-blue.jpg',
    quote: 'Proud to wear TRUTH. The designs are sharp and the message is clear.',
    author: 'Mike D., Patriot',
  },
];

const SocialProofSection: React.FC = () => {
  return (
    <section id="social-proof" className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-extrabold uppercase mb-12 text-center text-red-600 tracking-wide">
          REAL AMERICANS. REAL STORIES.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="/stories" className="inline-block bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-8 rounded-lg border border-red-900 transition duration-300 uppercase tracking-wider shadow-lg">
            JOIN THE MOVEMENT
          </a>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;

  );
};

export default SocialProofSection;
