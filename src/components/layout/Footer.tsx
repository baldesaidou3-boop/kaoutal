import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Kaoutal</h3>
            <p className="text-sm text-gray-400">
              La marketplace des micro-entrepreneurs guinéens. Achetez et vendez en toute confiance.
            </p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3">Acheter</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="hover:text-emerald-400 transition-colors">Catalogue</Link></li>
              <li><Link href="/categories/mode-tissus" className="hover:text-emerald-400 transition-colors">Mode & Tissus</Link></li>
              <li><Link href="/categories/telephones" className="hover:text-emerald-400 transition-colors">Téléphones</Link></li>
              <li><Link href="/categories/epicerie" className="hover:text-emerald-400 transition-colors">Épicerie fine</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3">Vendre</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/auth/register-seller" className="hover:text-emerald-400 transition-colors">Devenir vendeur</Link></li>
              <li><Link href="/seller/dashboard" className="hover:text-emerald-400 transition-colors">Dashboard vendeur</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>WhatsApp : +224 XXX XXX XXX</li>
              <li>Email : contact@kaoutal.com</li>
              <li className="text-gray-500">Guinée 🇬🇳</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Kaoutal. Tous droits réservés.
        </div>
      </div>
    </footer>
  )
}
