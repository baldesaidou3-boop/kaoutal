import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CartPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Mon panier</h1>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
        <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Votre panier est vide</h2>
        <p className="text-gray-500 mb-6">Découvrez nos catégories et ajoutez vos premiers articles</p>
        <Link href="/products">
          <Button variant="primary" size="lg">Découvrir le catalogue</Button>
        </Link>
      </div>
    </div>
  )
}
