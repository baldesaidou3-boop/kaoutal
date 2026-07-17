'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ShoppingCart, Menu, X, User, Store } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🛍️</span>
            <span className="text-xl font-bold text-emerald-700">Kaoutal</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/products" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">
              Catalogue
            </Link>
            <Link href="/categories/mode-tissus" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">
              Boutiques
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/cart" className="relative text-gray-600 hover:text-emerald-600 transition-colors">
              <ShoppingCart className="h-5 w-5" />
            </Link>
            <Link href="/auth/login" className="hidden md:block">
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4 mr-1" />
                Connexion
              </Button>
            </Link>
            <Link href="/auth/register-seller" className="hidden md:block">
              <Button variant="primary" size="sm">
                <Store className="h-4 w-4 mr-1" />
                Vendre
              </Button>
            </Link>
            <button
              className="md:hidden text-gray-600"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-2">
            <Link href="/products" className="block py-2 text-sm text-gray-600" onClick={() => setMenuOpen(false)}>
              Catalogue
            </Link>
            <Link href="/categories/mode-tissus" className="block py-2 text-sm text-gray-600" onClick={() => setMenuOpen(false)}>
              Boutiques
            </Link>
            <hr className="my-2" />
            <Link href="/auth/login" className="block py-2 text-sm text-gray-600" onClick={() => setMenuOpen(false)}>
              Connexion
            </Link>
            <Link href="/auth/register-seller" className="block py-2 text-sm text-emerald-600 font-medium" onClick={() => setMenuOpen(false)}>
              Devenir vendeur
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
