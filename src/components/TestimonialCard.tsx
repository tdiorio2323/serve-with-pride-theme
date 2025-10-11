import React from 'react';

interface TestimonialCardProps {
  avatarSrc: string;
  quote: string;
  author: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ avatarSrc, quote, author }) => {
  return (
    <div className="bg-gray-800 p-8 rounded-lg border-2 border-red-700 shadow-lg text-center">
      <img src={avatarSrc} alt="Avatar" className="w-24 h-24 rounded-full mx-auto mb-6 object-cover border-4 border-red-600" />
      <p className="text-lg italic text-gray-300 mb-6 font-body">
        "{quote}"
      </p>
      <p className="font-bold text-red-500 uppercase font-display">{author}</p>
    </div>
  );
};

export default TestimonialCard;
