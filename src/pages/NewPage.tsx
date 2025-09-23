import React from 'react';

const NewPage: React.FC = () => {
  return (
    <div className="container mx-auto p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Welcome to the New Page</h1>
        <p className="text-xl text-muted-foreground mt-2">This is your newly created page content.</p>
      </header>
      <main>
        {/* You can add more components and content here */}
      </main>
    </div>
  );
};

export default NewPage;
