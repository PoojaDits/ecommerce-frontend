import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import ProductCard from './ProductCard'
import type { Product, Category, CartProduct } from '@/types'
import { products as importedProducts } from '@/data/products'

const products: Product[] = importedProducts;

const categories: Category[] = [
  'All',
  'Electronics',
  'Footwear',
  'Accessories',
  'Kitchen',
  'Sports',
]

const ITEMS_PER_PAGE = 12

const normaliseCategory = (value: string | undefined): Category => {
  if (!value) return 'All'
  let v = value
  try {
    v = decodeURIComponent(value)
  } catch {
    /* ignore bad encoding */
  }
  const match = categories.find(
    (c) => c.toLowerCase() === String(v).toLowerCase()
  )
  return match || 'All'
}

interface ProductGridProps {
  selectedCategory?: Category
  setSelectedCategory?: (category: Category) => void
  addToCart: (product: CartProduct) => void
}

const ProductGrid: React.FC<ProductGridProps> = ({
  selectedCategory,
  setSelectedCategory,
  addToCart,
}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { category } = useParams<{ category?: string }>()

  const activeCategory = normaliseCategory(category || selectedCategory)

  useEffect(() => {
    if (setSelectedCategory) {
      setSelectedCategory(normaliseCategory(category))
    }
  }, [category, setSelectedCategory])

  const basePath = location.pathname.startsWith('/customer')
    ? '/customer'
    : ''

  const handleFilterClick = (cat: Category): void => {
    if (typeof setSelectedCategory === 'function') {
      setSelectedCategory(cat)
    }
    if (cat === 'All') {
      navigate(`${basePath}/products`)
    } else {
      navigate(`${basePath}/products/${cat}`)
    }
  }

  const filtered =
    activeCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeCategory)

  // Infinite scroll state
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(filtered.length > ITEMS_PER_PAGE)
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const loadingRef = useRef(false)

  // Reset when category changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE)
    setHasMore(filtered.length > ITEMS_PER_PAGE)
  }, [activeCategory, filtered.length])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingRef.current) {
          loadingRef.current = true
          setIsLoading(true)

          // Simulate a small loading delay for UX
          setTimeout(() => {
            setVisibleCount((prev) => {
              const next = prev + ITEMS_PER_PAGE
              if (next >= filtered.length) {
                setHasMore(false)
              }
              return Math.min(next, filtered.length)
            })
            setIsLoading(false)
            loadingRef.current = false
          }, 500)
        }
      },
      {
        rootMargin: '200px',
      }
    )

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current)
    }

    return () => observer.disconnect()
  }, [hasMore, filtered.length])

  const visibleProducts = filtered.slice(0, visibleCount)

  return (
    <section className="px-4 py-8 md:py-[60px] md:px-[40px] flex-1 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      <h2 className="text-center text-[1.5rem] mb-1.5 text-[#b9b9bd]">
        {activeCategory !== 'All'
          ? `${activeCategory} Products`
          : 'All Products'}
      </h2>
      <p className="text-center text-[#555] text-[0.85rem] mb-5">
        Browse our curated collection
      </p>

      <div className="flex gap-2.5 overflow-x-auto whitespace-nowrap py-1 mb-5 pb-4 md:justify-center md:overflow-x-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-1.5 border border-black/30 rounded-full text-[0.8rem] font-semibold cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#e94560] text-white border-[#e94560]'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
            onClick={() => handleFilterClick(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-400 mt-10">
          No products found in "{activeCategory}".
        </p>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-4 max-w-[1200px] mx-auto">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>

          {/* Sentinel element for infinite scroll */}
          {hasMore && (
            <div ref={sentinelRef} className="flex justify-center items-center py-8">
              {isLoading && (
                <div className="flex items-center gap-2 text-gray-400">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Loading more products...</span>
                </div>
              )}
            </div>
          )}

          {!hasMore && visibleProducts.length > 0 && (
            <p className="text-center text-gray-500 py-6 text-sm">
              You've seen all {filtered.length} products!
            </p>
          )}
        </>
      )}
    </section>
  )
}

export default ProductGrid
