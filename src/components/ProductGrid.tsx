import React, { useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import ProductCard from './ProductCard'
import type { Product, Category, CartProduct } from '@/types'
import { usePagination } from '@/hooks/usePagination'

const products: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4,
    reviews: 128,
    image: '/images/premium_wireless_headphones.png',
    badge: 'Sale',
  },
  {
    id: 2,
    name: 'Running Sneakers',
    category: 'Footwear',
    price: 59.99,
    rating: 5,
    reviews: 245,
    image: '/images/running_shoes.png',
    badge: 'New',
  },
  {
    id: 3,
    name: 'Smart Watch',
    category: 'Electronics',
    price: 149.99,
    originalPrice: 199.99,
    rating: 4,
    reviews: 87,
    image: '/images/smartwatch.png',
    badge: 'Hot',
  },
  {
    id: 4,
    name: 'Leather Backpack',
    category: 'Accessories',
    price: 89.99,
    rating: 4,
    reviews: 63,
    image: '/images/leather_backpack.png',
  },
  {
    id: 5,
    name: 'Sunglasses',
    category: 'Accessories',
    price: 34.99,
    originalPrice: 49.99,
    rating: 3,
    reviews: 192,
    image: '/images/aviator_sunglasses.png',
    badge: 'Sale',
  },
  {
    id: 6,
    name: 'Mechanical Keyboard',
    category: 'Electronics',
    price: 119.99,
    rating: 5,
    reviews: 304,
    image: '/images/mechanical_keyboard.png',
    badge: 'New',
  },
  {
    id: 7,
    name: 'Coffee Maker',
    category: 'Kitchen',
    price: 49.99,
    originalPrice: 69.99,
    rating: 4,
    reviews: 411,
    image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&q=80',
    badge: 'Sale',
  },
  {
    id: 8,
    name: 'Yoga Mat',
    category: 'Sports',
    price: 29.99,
    rating: 5,
    reviews: 155,
    image: 'https://images.unsplash.com/photo-1599447372297-f584fbf3f5df?w=800&q=80',
  },
  {
    id: 9,
    name: 'Action Camera',
    category: 'Electronics',
    price: 199.99,
    rating: 5,
    reviews: 320,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80',
    badge: 'Hot',
  },
  {
    id: 10,
    name: 'Running Shorts',
    category: 'Sports',
    price: 24.99,
    rating: 4,
    reviews: 88,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
  },
  {
    id: 11,
    name: 'Noise Cancelling Earbuds',
    category: 'Electronics',
    price: 129.99,
    rating: 4,
    reviews: 415,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80',
  },
  {
    id: 12,
    name: 'Digital Blender',
    category: 'Kitchen',
    price: 89.99,
    rating: 5,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800&q=80',
  },
  {
    id: 13,
    name: 'Casual Loafers',
    category: 'Footwear',
    price: 69.99,
    rating: 3,
    reviews: 45,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
  },
  {
    id: 14,
    name: 'Minimalist Watch',
    category: 'Accessories',
    price: 110.00,
    rating: 4,
    reviews: 99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
  },
  {
    id: 15,
    name: 'Dumbbell Set',
    category: 'Sports',
    price: 55.00,
    rating: 5,
    reviews: 280,
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&q=80',
  },
  {
    id: 16,
    name: 'Electric Kettle',
    category: 'Kitchen',
    price: 35.50,
    rating: 4,
    reviews: 130,
    image: 'https://images.unsplash.com/photo-1594213114663-d94eb9a0225d?w=800&q=80',
  },
  {
    id: 17,
    name: 'Gaming Mouse',
    category: 'Electronics',
    price: 45.99,
    rating: 4,
    reviews: 550,
    image: 'https://images.unsplash.com/photo-1615663245857-3205b90b1328?w=800&q=80',
  },
  {
    id: 18,
    name: 'Crossbody Bag',
    category: 'Accessories',
    price: 49.99,
    rating: 5,
    reviews: 112,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
  },
  {
    id: 19,
    name: 'Hiking Boots',
    category: 'Footwear',
    price: 130.00,
    rating: 4,
    reviews: 77,
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&q=80',
  },
  {
    id: 20,
    name: 'Protein Shaker',
    category: 'Sports',
    price: 15.00,
    rating: 3,
    reviews: 205,
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&q=80',
  },
]

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
      ? products
      : products.filter((p) => p.category === activeCategory)

  const { currentData, currentPage, maxPage, next, prev, jump } = usePagination({
    data: filtered,
    itemsPerPage: 8,
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
          <div className="grid grid-cols-2 gap-3 max-w-[1200px] mx-auto md:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] md:gap-[25px]">
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
                    className={`w-10 h-10 rounded flex items-center justify-center transition-colors flex-shrink-0 ${
                      currentPage === idx + 1
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
