import Link from "next/link"
import { ArrowRight, Store, ShoppingBag, Users, Shield } from "lucide-react"

const categories = [
  { name: "Mode & Tissus africains", slug: "mode-tissus", icon: "👗", count: "12 vendeurs" },
  { name: "Téléphones & Accessoires", slug: "telephones", icon: "📱", count: "8 vendeurs" },
  { name: "Épicerie fine locale", slug: "epicerie", icon: "🥜", count: "6 vendeurs" },
  { name: "Livraison repas / Traiteur", slug: "traiteur", icon: "🍛", count: "5 vendeurs" },
  { name: "Beauté & Soins", slug: "beaute", icon: "🧴", count: "9 vendeurs" },
  { name: "Articles bébé & maman", slug: "bebe", icon: "👶", count: "4 vendeurs" },
  { name: "High-Tech & Gadgets", slug: "high-tech", icon: "🎧", count: "7 vendeurs" },
  { name: "Services digitaux", slug: "services", icon: "💳", count: "3 vendeurs" },
  { name: "Artisanat & Décoration", slug: "artisanat", icon: "🎨", count: "10 vendeurs" },
  { name: "Livres & Fournitures scolaires", slug: "livres", icon: "📚", count: "6 vendeurs" },
]

const features = [
  { icon: Store, title: "Micro/Macro-entrepreneurs", desc: "Chaque vendeur a sa propre boutique" },
  { icon: ShoppingBag, title: "10 niches", desc: "Mode, tech, alimentation, services..." },
  { icon: Users, title: "Communauté", desc: "Achetez local, soutenez l'économie guinéenne" },
  { icon: Shield, title: "Paiement sécurisé", desc: "Transactions via Orange Money & Mobile Money" },
]

export default function HomePage() {
  return (
    <>
      <section className="bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              La marketplace des micro/macro-entrepreneurs guinéens
            </h1>
            <p className="text-lg md:text-xl text-emerald-100 mb-8">
              Kaoutal connecte les acheteurs aux vendeurs locaux. Mode, beauté, tech, alimentation, artisanat... Tout en un seul endroit.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-white text-emerald-700 px-6 py-3 rounded-lg font-medium hover:bg-emerald-50 transition-colors"
              >
                Découvrir le catalogue <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/auth/register-seller"
                className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
              >
                Devenir vendeur
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-3">
                <f.icon className="h-5 w-5 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Nos catégories</h2>
          <Link href="/products" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
            Voir tout →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all text-center group"
            >
              <span className="text-3xl block mb-2">{cat.icon}</span>
              <h3 className="text-sm font-medium text-gray-900 group-hover:text-emerald-600 transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-gray-400 mt-1">{cat.count}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white border-t border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Vous êtes un micro/macro-entrepreneur ?
          </h2>
          <p className="text-gray-500 mb-8 max-w-lg mx-auto">
            Rejoignez Kaoutal et créez votre boutique en ligne gratuitement. Visibilité, communauté et paiements simplifiés.
          </p>
          <Link
            href="/auth/register-seller"
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
          >
            <Store className="h-5 w-5" />
            Ouvrir ma boutique
          </Link>
        </div>
      </section>
    </>
  )
}
