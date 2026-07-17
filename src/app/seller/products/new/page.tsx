'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const categories = [
  { id: 1, name: 'Mode & Tissus africains' },
  { id: 2, name: 'Téléphones & Accessoires' },
  { id: 3, name: 'Épicerie fine locale' },
  { id: 4, name: 'Livraison repas / Traiteur' },
  { id: 5, name: 'Beauté & Soins' },
  { id: 6, name: 'Articles bébé & maman' },
  { id: 7, name: 'High-Tech & Gadgets' },
  { id: 8, name: 'Services digitaux' },
  { id: 9, name: 'Artisanat & Décoration' },
  { id: 10, name: 'Livres & Fournitures scolaires' },
]

export default function NewProductPage() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [comparePrice, setComparePrice] = useState('')
  const [stock, setStock] = useState('1')
  const [categoryId, setCategoryId] = useState('1')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const slug = name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim()

    const { data: user } = await supabase.auth.getUser()
    if (!user.user) {
      router.push('/auth/login')
      return
    }

    const { data: seller } = await supabase
      .from('sellers')
      .select('id')
      .eq('id', user.user.id)
      .single()

    if (!seller) {
      router.push('/auth/register-seller')
      return
    }

    const { error } = await supabase.from('products').insert({
      seller_id: seller.id,
      category_id: parseInt(categoryId),
      name,
      slug,
      description,
      price: parseFloat(price),
      compare_price: comparePrice ? parseFloat(comparePrice) : null,
      stock: parseInt(stock),
      status: 'active',
    })

    if (error) {
      alert(error.message)
      setLoading(false)
      return
    }

    router.push('/seller/products')
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Ajouter un produit</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
        <Input id="name" label="Nom du produit" value={name} onChange={(e) => setName(e.target.value)} required />
        
        <div className="space-y-1">
          <label htmlFor="desc" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input id="price" label="Prix (GNF)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
          <Input id="cmp" label="Ancien prix (optionnel)" type="number" value={comparePrice} onChange={(e) => setComparePrice(e.target.value)} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input id="stock" label="Stock" type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
          
          <div className="space-y-1">
            <label htmlFor="cat" className="block text-sm font-medium text-gray-700">Catégorie</label>
            <select id="cat" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500">
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="outline" className="flex-1" onClick={() => router.back()}>
            Annuler
          </Button>
          <Button type="submit" loading={loading} className="flex-1">
            Publier le produit
          </Button>
        </div>
      </form>
    </div>
  )
}
