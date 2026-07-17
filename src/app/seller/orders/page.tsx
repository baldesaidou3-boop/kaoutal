import { ShoppingCart } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function SellerOrdersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Commandes reçues</h1>

      <Card>
        <CardContent className="p-12 text-center">
          <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Aucune commande</h2>
          <p className="text-gray-500">Les commandes de vos produits apparaîtront ici</p>
        </CardContent>
      </Card>
    </div>
  )
}
