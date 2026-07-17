'use client'

import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images?.[0] || `https://placehold.co/400x300/2d3748/ffffff?text=${encodeURIComponent(product.name.slice(0, 30))}`

  return (
    <Link href={`/products/${product.slug}`} className="group">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md hover:border-emerald-200 transition-all">
        <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          {product.category && (
            <span className="text-xs text-emerald-600 font-medium">{product.category.name}</span>
          )}
          <h3 className="text-sm font-semibold text-gray-900 mt-1 line-clamp-2 group-hover:text-emerald-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-gray-400 mt-1 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between mt-3">
            <span className="text-sm font-bold text-gray-900">{formatPrice(product.price)}</span>
            {product.compare_price && product.compare_price > product.price && (
              <span className="text-xs text-gray-400 line-through">{formatPrice(product.compare_price)}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
