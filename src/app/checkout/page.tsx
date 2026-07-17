import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CheckoutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/cart" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-emerald-600 mb-6">
        <ArrowLeft className="h-4 w-4" /> Retour au panier
      </Link>

      <h1 className="text-2xl font-bold text-gray-900 mb-8">Finaliser la commande</h1>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center">
        <p className="text-gray-500">Le checkout sera actif une fois la base de données connectée.</p>
        <div className="mt-6 space-y-3">
          <Button variant="primary" className="w-full" disabled>Payer avec Orange Money</Button>
          <Button variant="outline" className="w-full" disabled>Payer avec Mobile Money</Button>
        </div>
      </div>
    </div>
  )
}
