import React from 'react'
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'
import type { Product, CartProduct } from '@/types'
import { products as allProducts } from '@/data/products'

interface FeaturedProductsProps {
  addToCart: (product: CartProduct) => void
}

const featuredProducts: Product[] = allProducts.slice(0, 8)

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ addToCart }) => {
  return (
    <section className="py-16 px-6 bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white">
            Trending Products
          </h2>
          <p className="mt-3 text-sm text-gray-400 max-w-xl mx-auto">
            Discover our customer favorites and hot items flying off the
            shelves.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-3 bg-gradient-to-br from-[#e94560] to-[#d63a52] px-8 py-3.5 rounded-full text-white font-bold shadow-lg transform transition hover:scale-105 active:scale-95 cursor-pointer"
          >
            Explore All Products
            <span aria-hidden className="text-lg">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts
