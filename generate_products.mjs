import fs from 'fs';

const categories = ['Electronics', 'Footwear', 'Accessories', 'Kitchen', 'Sports'];
const images = [
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
  'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80',
  'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80',
  'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&q=80',
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
  'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80',
  'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&q=80',
  'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&q=80',
  'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&q=80'
];

const adjectives = ['Premium', 'Wireless', 'Smart', 'Ergonomic', 'Mechanical', 'Minimalist', 'Classic', 'Digital', 'Portable', 'Ultra-light'];
const nouns = ['Headphones', 'Sneakers', 'Watch', 'Keyboard', 'Mouse', 'Speaker', 'Monitor', 'Bag', 'Kettle', 'Mat'];

const products = [];

for (let i = 1; i <= 50; i++) {
  const category = categories[Math.floor(Math.random() * categories.length)];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const image = images[Math.floor(Math.random() * images.length)];
  
  const price = (Math.random() * 200 + 10).toFixed(2);
  const originalPrice = Math.random() > 0.5 ? (parseFloat(price) * (1 + Math.random() * 0.5)).toFixed(2) : undefined;
  
  const badge = Math.random() > 0.7 ? (Math.random() > 0.5 ? 'Sale' : 'New') : undefined;

  products.push({
    id: i,
    name: `${adj} ${noun}`,
    category: category,
    price: parseFloat(price),
    originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
    rating: Math.floor(Math.random() * 3) + 3,
    reviews: Math.floor(Math.random() * 500) + 10,
    image: image,
    badge: badge
  });
}

const fileContent = `import type { Product } from '@/types';

export const products: Product[] = ${JSON.stringify(products, null, 2).replace(/"([^"]+)":/g, '$1:')};
`;

fs.writeFileSync('src/data/products.ts', fileContent);
console.log('Products generated successfully!');
