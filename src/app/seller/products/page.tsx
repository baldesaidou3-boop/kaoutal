import Link from 'next/link'
import { Plus, Package } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function SellerProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Mes produits</h1>
        <Link
          href="/seller/products/new"
          className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
        >
          <Plus className="h-4 w-4" /> Ajouter
        </Link>
      </div>

      <Card>
        <CardContent className="p-12 text-center">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Aucun produit</h2>
          <p className="text-gray-500 mb-6">Commencez par ajouter votre premier produit</p>
          <Link
            href="/seller/products/new"
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700"
          >
            <Plus className="h-4 w-4" /> Ajouter un produit
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
