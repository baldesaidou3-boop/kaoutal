import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const categories: Record<string, { name: string; icon: string }> = {
  'mode-tissus': { name: 'Mode & Tissus africains', icon: '👗' },
  'telephones': { name: 'Téléphones & Accessoires', icon: '📱' },
  'epicerie': { name: 'Épicerie fine locale', icon: '🥜' },
  'traiteur': { name: 'Livraison repas / Traiteur', icon: '🍛' },
  'beaute': { name: 'Beauté & Soins', icon: '🧴' },
  'bebe': { name: 'Articles bébé & maman', icon: '👶' },
  'high-tech': { name: 'High-Tech & Gadgets', icon: '🎧' },
  'services': { name: 'Services digitaux', icon: '💳' },
  'artisanat': { name: 'Artisanat & Décoration', icon: '🎨' },
  'livres': { name: 'Livres & Fournitures scolaires', icon: '📚' },
}

export default async function CategoryPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const category = categories[slug]

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Catégorie introuvable</h1>
        <Link href="/products" className="text-emerald-600 hover:text-emerald-700 mt-4 inline-block">
          Voir toutes les catégories
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/products" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-emerald-600 mb-6">
        <ArrowLeft className="h-4 w-4" /> Retour au catalogue
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <span className="text-4xl">{category.icon}</span>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{category.name}</h1>
          <p className="text-gray-500 text-sm">Explorez les produits de cette catégorie</p>
        </div>
      </div>

      <div className="text-center py-12 text-gray-400 bg-white rounded-xl border border-gray-200">
        <span className="text-5xl block mb-4">{category.icon}</span>
        <p>Les produits apparaîtront ici une fois la base de données connectée.</p>
        <p className="text-sm mt-2">Connecte Supabase dans <code className="bg-gray-100 px-2 py-0.5 rounded text-emerald-600">.env.local</code></p>
      </div>
    </div>
  )
}
