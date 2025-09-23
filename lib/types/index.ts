export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: ProductImage[];
  variants: ProductVariant[];
  tags: string[];
  vendor: string;
  productType: string;
  availableForSale: boolean;
  totalInventory: number;
  seo: {
    title?: string;
    description?: string;
  };
  collections: string[];
  badges: ProductBadge[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  url: string;
  altText?: string;
  width: number;
  height: number;
}

export interface ProductVariant {
  id: string;
  title: string;
  price: number;
  compareAtPrice?: number;
  availableForSale: boolean;
  quantityAvailable: number;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  image?: ProductImage;
  sku?: string;
}

export interface ProductBadge {
  type: 'limited' | '24h' | 'usa-made' | 'sale' | 'new' | 'bestseller';
  label: string;
  urgent?: boolean;
}

export interface Collection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image?: ProductImage;
  products: Product[];
  seo: {
    title?: string;
    description?: string;
  };
  sortOrder?: 'best-selling' | 'created' | 'manual' | 'price-asc' | 'price-desc';
  rules?: CollectionRule[];
  createdAt: string;
  updatedAt: string;
}

export interface CollectionRule {
  column: string;
  relation: string;
  condition: string;
}

export interface Cart {
  id: string;
  lines: CartLine[];
  estimatedCost: {
    totalAmount: number;
    subtotalAmount: number;
    totalTaxAmount?: number;
    totalDutyAmount?: number;
  };
  checkoutUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: Product;
    image?: ProductImage;
    price: number;
  };
  estimatedCost: {
    totalAmount: number;
  };
}

export interface Customer {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  acceptsMarketing: boolean;
  defaultAddress?: Address;
  addresses: Address[];
  orders: Order[];
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  province: string;
  country: string;
  zip: string;
  phone?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  email: string;
  phone?: string;
  statusUrl: string;
  processedAt: string;
  totalPrice: number;
  totalShipping: number;
  totalTax: number;
  currencyCode: string;
  fulfillmentStatus: string;
  financialStatus: string;
  lineItems: OrderLineItem[];
  shippingAddress?: Address;
  billingAddress?: Address;
  customer?: Customer;
}

export interface OrderLineItem {
  title: string;
  quantity: number;
  price: number;
  variant?: ProductVariant;
  product?: Product;
}

export interface Subscription {
  id: string;
  title: string;
  description: string;
  price: number;
  interval: 'month' | 'quarter' | 'year';
  intervalCount: number;
  benefits: string[];
  popular?: boolean;
  products: Product[];
  image?: ProductImage;
}

export interface Menu {
  id: string;
  title: string;
  handle: string;
  items: MenuItem[];
}

export interface MenuItem {
  id: string;
  title: string;
  url: string;
  items?: MenuItem[];
  target?: '_blank' | '_self';
  type?: 'collection' | 'product' | 'page' | 'blog' | 'article' | 'policy' | 'frontpage' | 'http';
}

export interface Page {
  id: string;
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  seo: {
    title?: string;
    description?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Blog {
  id: string;
  title: string;
  handle: string;
  seo: {
    title?: string;
    description?: string;
  };
}

export interface Article {
  id: string;
  title: string;
  handle: string;
  content: string;
  contentHtml: string;
  excerpt?: string;
  image?: ProductImage;
  tags: string[];
  publishedAt: string;
  author?: {
    firstName: string;
    lastName: string;
  };
  blog: Blog;
  seo: {
    title?: string;
    description?: string;
  };
}

// Filter and Sort Types
export interface ProductFilters {
  availability?: boolean;
  price?: {
    min?: number;
    max?: number;
  };
  vendor?: string[];
  productType?: string[];
  tags?: string[];
  collections?: string[];
}

export interface SortOption {
  key: string;
  label: string;
  reverse?: boolean;
}

// Analytics Types
export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  timestamp?: number;
}

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  robots?: string;
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
  };
  twitter?: {
    card?: string;
    title?: string;
    description?: string;
    image?: string;
    creator?: string;
  };
}

// API Response Types
export interface ShopifyResponse<T> {
  data: T;
  errors?: Array<{
    message: string;
    locations?: Array<{
      line: number;
      column: number;
    }>;
    path?: string[];
  }>;
}

export interface Connection<T> {
  edges: Array<{
    node: T;
    cursor: string;
  }>;
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
  };
}

// Component Props Types
export interface ProductCardProps {
  product: Product;
  priority?: boolean;
  className?: string;
}

export interface CollectionPageProps {
  collection: Collection;
  products: Product[];
  searchParams: {
    sort?: string;
    q?: string;
    page?: string;
  };
}

export interface ProductPageProps {
  product: Product;
  relatedProducts: Product[];
}