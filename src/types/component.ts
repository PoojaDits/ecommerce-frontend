import { Product, CartProduct, Category } from './product';

export interface ProductCardProps {
  product: Product;
  addToCart: (product: CartProduct) => void;
}

export interface ProductGridProps {
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
  addToCart: (product: CartProduct) => void;
}
