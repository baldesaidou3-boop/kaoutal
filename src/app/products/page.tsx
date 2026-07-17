import Link from 'next/link'

const categories = [
  { name: 'Mode & Tissus africains', slug: 'mode-tissus', icon: '👗' },
  { name: 'Téléphones & Accessoires', slug: 'telephones', icon: '📱' },
  { name: 'Épicerie fine locale', slug: 'epicerie', icon: '🥜' },
  { name: 'Livraison repas / Traiteur', slug: 'traiteur', icon: '🍛' },
  { name: 'Beauté & Soins', slug: 'beaute', icon: '🧴' },
  { name: 'Articles bébé & maman', slug: 'bebe', icon: '👶' },
  { name: 'High-Tech & Gadgets', slug: 'high-tech', icon: '🎧' },
  { name: 'Services digitaux', slug: 'services', icon: '💳' },
  { name: 'Artisanat & Décoration', slug: 'artisanat', icon: '🎨' },
  { name: 'Livres & Fournitures scolaires', slug: 'livres', icon: '📚' },
]

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Catalogue</h1>
        <p className="text-gray-500 text-sm mt-1">Explorez toutes les catégories de Kaoutal</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/categories/${cat.slug}`}
            className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all group text-center"
          >
            <span className="text-4xl block mb-3">{cat.icon}</span>
            <h3 className="text-sm font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
              {cat.name}
            </h3>
          </Link>
        ))}
      </div>

      <div className="text-center py-12 text-gray-400 mt-8 bg-white rounded-xl border border-gray-200">
        <p>Les produits apparaîtront ici une fois la base de données connectée.</p>
        <p className="text-sm mt-2">Connecte Supabase dans <code className="bg-gray-100 px-2 py-0.5 rounded text-emerald-600">.env.local</code></p>
      </div>
    </div>
  )
}
