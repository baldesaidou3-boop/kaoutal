import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default async function ProductDetailPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params

  const productName = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/products" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-emerald-600 mb-6">
        <ArrowLeft className="h-4 w-4" /> Retour au catalogue
      </Link>

      <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
        <span className="text-6xl block mb-4">🛍️</span>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{productName}</h1>
        <p className="text-gray-400 mb-8">Page détail produit — à connecter avec Supabase</p>
        <div className="flex items-center justify-center gap-3">
          <Button variant="primary" size="lg">Ajouter au panier</Button>
          <Button variant="outline" size="lg">Contacter le vendeur</Button>
        </div>
      </div>

      <div className="text-center text-gray-400 text-sm mt-4">
        <p>Configure <code className="bg-gray-100 px-2 py-0.5 rounded text-emerald-600">NEXT_PUBLIC_SUPABASE_URL</code> et <code className="bg-gray-100 px-2 py-0.5 rounded text-emerald-600">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> dans .env.local</p>
      </div>
    </div>
  )
}
