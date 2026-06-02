import React, { useRef, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { ProductCardProps } from '@/types'

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const basePath = location.pathname.startsWith('/customer')
    ? '/customer'
    : ''

  const [isVisible, setIsVisible] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '200px',
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const renderStars = (rating: number): string => {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating))
  }

  return (
    <Card
      className="flex flex-col cursor-pointer overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 bg-white"
      onClick={() => navigate(`${basePath}/product/${product.id}`)}
    >
      <div ref={imgRef} className="h-[140px] md:h-[200px] bg-muted/30 flex items-center justify-center relative overflow-hidden">
        {isVisible ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full animate-pulse bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {product.badge && (
          <Badge className="absolute top-2 left-2 px-2 py-0 text-[0.65rem] font-bold">
            {product.badge}
          </Badge>
        )}
      </div>

      <CardContent className="p-4 flex flex-col grow text-black">
        <p className="text-[0.65rem] text-muted-foreground font-bold uppercase tracking-wider">
          {product.category}
        </p>
        <h3 className="text-base md:text-lg font-bold my-1 text-foreground leading-tight">
          {product.name}
        </h3>
        <div className="text-xs text-muted-foreground mb-4 flex items-center">
          <span className="text-yellow-500 mr-1 text-sm">
            {renderStars(product.rating)}
          </span>
          <span>({product.reviews})</span>
        </div>
      </CardContent>

      <CardFooter className="text-black p-4 pt-0 flex flex-col md:flex-row md:justify-between items-start md:items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-lg md:text-xl font-extrabold">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm line-through text-muted-foreground">
              ${product.originalPrice}
            </span>
          )}
        </div>

        <Button
          className="w-full md:w-auto font-semibold text-white border-0 rounded-full mt-4"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()
            addToCart({ ...product, quantity: 1 })
          }}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProductCard
