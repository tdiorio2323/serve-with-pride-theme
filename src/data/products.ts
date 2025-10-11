export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  images: string[];
  category: 'tshirt' | 'hoodie' | 'hat' | 'patch' | 'accessory';
  gender: 'mens' | 'womens' | 'unisex';
  sizes: string[];
  colors: string[];
  tags: string[];
  featured: boolean;
  inStock: boolean;
  sku: string;
}

export const products: Product[] = [
  // T-Shirts
  {
    id: 'tshirt-truth-matters-1',
    name: 'Truth Matters Classic Tee',
    description: 'Stand for truth with our classic Truth Matters t-shirt. Made from premium 100% cotton, this comfortable tee proudly displays our core values.',
    price: 29.99,
  images: ['/TRUTH-red-white-blue.jpg'],
    category: 'tshirt',
    gender: 'unisex',
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    colors: ['Black', 'White'],
    tags: ['truth', 'patriotic', 'conservative', 'freedom'],
    featured: true,
    inStock: true,
    sku: 'TM-TSH-001'
  },
  {
    id: 'tshirt-patriot-shield',
    name: 'Patriot Shield Tee',
    description: 'Defend freedom with honor. Our Patriot Shield design represents the courage of those who stand guard over our liberties.',
    price: 29.99,
  images: ['/TRUTH-red-white-blue.jpg'],
    category: 'tshirt',
    gender: 'unisex',
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    colors: ['Black', 'White'],
    tags: ['patriot', 'shield', 'freedom', 'honor'],
    featured: true,
    inStock: true,
    sku: 'TM-TSH-002'
  },
  {
    id: 'tshirt-liberty-guard',
    name: 'Liberty Guard Tee',
    description: 'Standing watch over our constitutional rights. A powerful symbol for those who defend our founding principles.',
    price: 29.99,
  images: ['/TRUTH-red-white-blue.jpg'],
    category: 'tshirt',
    gender: 'unisex',
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    colors: ['Black', 'White'],
    tags: ['liberty', 'constitution', 'guard', 'rights'],
    featured: false,
    inStock: true,
    sku: 'TM-TSH-003'
  },
  {
    id: 'tshirt-honor-badge',
    name: 'Honor Badge Tee',
    description: 'Representing duty, honor, and service to country. For those who understand what it means to serve with pride.',
    price: 29.99,
  images: ['/TRUTH-red-white-blue.jpg'],
    category: 'tshirt',
    gender: 'unisex',
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    colors: ['Black', 'White'],
    tags: ['honor', 'duty', 'service', 'veteran'],
    featured: false,
    inStock: true,
    sku: 'TM-TSH-004'
  },

  // Women's T-Shirts (fitted versions)
  {
    id: 'tshirt-women-freedom-eagle',
    name: 'Freedom Eagle Women\'s Tee',
    description: 'Soar high with American pride. This fitted women\'s tee features our majestic Freedom Eagle design in soft, premium cotton.',
    price: 32.99,
  images: ['/TRUTH-red-white-blue.jpg'],
    category: 'tshirt',
    gender: 'womens',
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    colors: ['Black', 'White'],
    tags: ['eagle', 'freedom', 'women', 'patriotic'],
    featured: true,
    inStock: true,
    sku: 'TM-WTS-005'
  },
  {
    id: 'tshirt-women-justice-seal',
    name: 'Justice Seal Women\'s Fitted Tee',
    description: 'Upholding justice and truth. A powerful statement piece for the strong women who fight for what\'s right.',
    price: 32.99,
  images: ['/TRUTH-red-white-blue.jpg'],
    category: 'tshirt',
    gender: 'womens',
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    colors: ['Black', 'White'],
    tags: ['justice', 'women', 'strength', 'truth'],
    featured: false,
    inStock: true,
    sku: 'TM-WTS-006'
  },

  // Hoodies
  {
    id: 'hoodie-warrior-crest',
    name: 'Warrior Crest Hoodie',
    description: 'For those who fight for what\'s right. Premium heavyweight hoodie with our bold Warrior Crest design.',
    price: 54.99,
  images: ['/TRUTH-red-white-blue.jpg'],
    category: 'hoodie',
    gender: 'unisex',
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    colors: ['Black', 'White'],
    tags: ['warrior', 'hoodie', 'strength', 'crest'],
    featured: true,
    inStock: true,
    sku: 'TM-HOO-007'
  },
  {
    id: 'hoodie-victory-banner',
    name: 'Victory Banner Hoodie',
    description: 'Celebrating the triumph of truth over deception. Warm, comfortable hoodie perfect for any patriot.',
    price: 54.99,
  images: ['/TRUTH-red-white-blue.jpg'],
    category: 'hoodie',
    gender: 'unisex',
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    colors: ['Black', 'White'],
    tags: ['victory', 'banner', 'triumph', 'truth'],
    featured: false,
    inStock: true,
    sku: 'TM-HOO-008'
  },
  {
    id: 'hoodie-truth-logo',
    name: 'Truth Logo Hoodie',
    description: 'Show your support for truth with this classic hoodie featuring the Truth Matters logo.',
    price: 54.99,
  images: ['/TRUTH-red-white-blue.jpg'],
    category: 'hoodie',
    gender: 'unisex',
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    colors: ['Black', 'White'],
    tags: ['truth', 'logo', 'hoodie', 'classic'],
    featured: false,
    inStock: true,
    sku: 'TM-HOO-009'
  },
  {
    id: 'hoodie-freedom-stripes',
    name: 'Freedom Stripes Hoodie',
    description: 'Celebrate freedom with bold stripes and the Truth Matters logo. Heavyweight and comfortable.',
    price: 54.99,
  images: ['/TRUTH-red-white-blue.jpg'],
    category: 'hoodie',
    gender: 'unisex',
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    colors: ['Black', 'White'],
    tags: ['freedom', 'stripes', 'hoodie', 'bold'],
    featured: false,
    inStock: true,
    sku: 'TM-HOO-010'
  },
  {
    id: 'hoodie-service-honor',
    name: 'Service Honor Hoodie',
    description: 'Honor those who serve with this special edition hoodie. Features the Truth Matters logo and patriotic accents.',
    price: 54.99,
  images: ['/TRUTH-red-white-blue.jpg'],
    category: 'hoodie',
    gender: 'unisex',
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    colors: ['Black', 'White'],
    tags: ['service', 'honor', 'hoodie', 'patriotic'],
    featured: false,
    inStock: true,
    sku: 'TM-HOO-011'
  },
  {
    id: 'hoodie-american-spirit',
    name: 'American Spirit Hoodie',
    description: 'Embody the American spirit with this comfortable hoodie. Features the Truth Matters logo and flag-inspired design.',
    price: 54.99,
  images: ['/TRUTH-red-white-blue.jpg'],
    category: 'hoodie',
    gender: 'unisex',
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    colors: ['Black', 'White'],
    tags: ['american', 'spirit', 'hoodie', 'flag'],
    featured: false,
    inStock: true,
    sku: 'TM-HOO-012'
  },

  // Hats
  {
    id: 'hat-defender-mark',
    name: 'Defender Mark Cap',
    description: 'Defending our nation and its sacred principles. Classic adjustable cap with embroidered Defender Mark logo.',
    price: 24.99,
  images: ['/TRUTH-red-white-blue.jpg'],
    category: 'hat',
    gender: 'unisex',
    sizes: ['One Size'],
    colors: ['Black', 'White'],
    tags: ['defender', 'cap', 'hat', 'nation'],
    featured: true,
    inStock: true,
    sku: 'TM-HAT-009'
  },
  {
    id: 'hat-unity-star',
    name: 'Unity Star Trucker Hat',
    description: 'United we stand, divided we fall. Classic trucker hat with mesh back and snap closure.',
    price: 26.99,
    images: ['/truth-red-white-blue.jpg'],
    category: 'hat',
    gender: 'unisex',
    sizes: ['One Size'],
    colors: ['Black', 'White'],
    tags: ['unity', 'star', 'trucker', 'united'],
    featured: false,
    inStock: true,
    sku: 'TM-HAT-010'
  },

  // Patches
  {
    id: 'patch-heritage-cross',
    name: 'Heritage Cross Patch',
    description: 'Honoring our heritage and those who served. Premium embroidered patch with velcro backing.',
    price: 12.99,
    images: ['/truth-red-white-blue.jpg'],
    category: 'patch',
    gender: 'unisex',
    sizes: ['3.5" x 3.5"'],
    colors: ['Full Color'],
    tags: ['heritage', 'cross', 'patch', 'honor'],
    featured: false,
    inStock: true,
    sku: 'TM-PAT-011'
  },

  // Accessories
  {
    id: 'accessory-truth-sticker-pack',
    name: 'Truth Matters Sticker Pack',
    description: 'Spread the truth everywhere. Pack of 10 weatherproof vinyl stickers featuring our most popular designs.',
    price: 9.99,
    images: ['/truth-red-white-blue.jpg'],
    category: 'accessory',
    gender: 'unisex',
    sizes: ['Various'],
    colors: ['Black', 'White'],
    tags: ['stickers', 'vinyl', 'weatherproof', 'pack'],
    featured: false,
    inStock: true,
    sku: 'TM-ACC-012'
  },
  {
    id: 'accessory-patriot-mug',
    name: 'Patriot Coffee Mug',
    description: 'Start your morning with truth. 15oz ceramic mug with our Truth Matters logo and American flag design.',
    price: 18.99,
    images: ['/truth-red-white-blue.jpg'],
    category: 'accessory',
    gender: 'unisex',
    sizes: ['15oz'],
    colors: ['White', 'Black'],
    tags: ['mug', 'coffee', 'ceramic', 'flag'],
    featured: false,
    inStock: true,
    sku: 'TM-ACC-013'
  }
];

// Helper functions for filtering products
export const getProductsByCategory = (category: Product['category']) => {
  return products.filter(product => product.category === category);
};

export const getProductsByGender = (gender: Product['gender']) => {
  return products.filter(product => product.gender === gender || product.gender === 'unisex');
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};

export const searchProducts = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};