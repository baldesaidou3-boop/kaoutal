import { Package } from 'lucide-react'

export default function OrdersPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Mes commandes</h1>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
        <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Aucune commande</h2>
        <p className="text-gray-500">Vous n&apos;avez pas encore passé de commande</p>
      </div>
    </div>
  )
}
