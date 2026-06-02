import React, { useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import ProductCard from './ProductCard'
import type { Product, Category, CartProduct } from '@/types'
import { usePagination } from '@/hooks/usePagination'
import { products as importedProducts } from '@/data/products'
const displayedProducts = importedProducts.slice(0, 32);

const products: Product[] = importedProducts;


const categories: Category[] = [
  'All',
  'Electronics',
  'Footwear',
  'Accessories',
  'Kitchen',
  'Sports',
]

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

  // Stay in the same section (customer layout or public) when filtering.
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
      ? displayedProducts
      : displayedProducts.filter((p) => p.category === activeCategory)

  const { currentData, currentPage, maxPage, next, prev, jump } = usePagination({
    data: filtered,
    itemsPerPage: 12,
    initialPage: 1,
  })

  // Reset to page 1 when category changes
  useEffect(() => {
    jump(1)
  }, [activeCategory])

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
            className={`px-4 py-1.5 border border-black/30 rounded-full text-[0.8rem] font-semibold cursor-pointer ${activeCategory === cat
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
            {currentData.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>

          {maxPage > 1 && (
            <div className="flex justify-center items-center gap-3 mt-12 mb-4">
              <button
                onClick={prev}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded bg-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
              >
                Previous
              </button>

              <div className="flex gap-1.5 overflow-x-auto max-w-[200px] sm:max-w-none no-scrollbar">
                {Array.from({ length: maxPage }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => jump(idx + 1)}
                    className={`w-10 h-10 rounded flex items-center justify-center transition-colors flex-shrink-0 ${currentPage === idx + 1
                      ? 'bg-[#e94560] text-white font-bold'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={next}
                disabled={currentPage === maxPage}
                className="px-4 py-2 rounded bg-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default ProductGrid
