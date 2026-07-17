'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function RegisterSellerPage() {
  const [step, setStep] = useState(1)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [storeName, setStoreName] = useState('')
  const [storeSlug, setStoreSlug] = useState('')
  const [description, setDescription] = useState('')
  const [city, setCity] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone,
          role: 'seller',
        },
      },
    })

    if (authError || !authData.user) {
      setError(authError?.message || 'Erreur lors de l\'inscription')
      setLoading(false)
      return
    }

    const { error: sellerError } = await supabase.from('sellers').insert({
      id: authData.user.id,
      store_name: storeName,
      store_slug: storeSlug,
      description,
      city,
      whatsapp: whatsapp || phone,
    })

    if (sellerError) {
      setError(sellerError.message)
      setLoading(false)
      return
    }

    router.push('/auth/login?registered=true')
  }

  function generateSlug(name: string) {
    const slug = name.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim()
    setStoreSlug(slug)
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Ouvrir ma boutique</h1>
          <p className="text-gray-500 text-sm mt-1">Devenez vendeur sur Kaoutal</p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-8">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step === 1 ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-600'}`}>1</div>
          <div className="h-px w-12 bg-gray-300" />
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step === 2 ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-400'}`}>2</div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-200 mb-4">
              {error}
            </div>
          )}

          {step === 1 ? (
            <div className="space-y-4">
              <h2 className="font-semibold text-gray-900">Vos informations</h2>
              <Input id="fn" label="Nom complet" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              <Input id="em" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Input id="ph" label="Téléphone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+224 XXX XXX XXX" />
              <Input id="pw" label="Mot de passe" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <Button type="button" className="w-full" onClick={() => setStep(2)}>
                Suivant
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="font-semibold text-gray-900">Votre boutique</h2>
              <Input id="sn" label="Nom de la boutique" value={storeName} onChange={(e) => { setStoreName(e.target.value); generateSlug(e.target.value) }} required />
              <Input id="ss" label="Slug (URL)" value={storeSlug} onChange={(e) => setStoreSlug(e.target.value)} placeholder="ma-boutique" />
              <div className="space-y-1">
                <label htmlFor="desc" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
              </div>
              <Input id="ci" label="Ville" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Conakry" />
              <Input id="wa" label="WhatsApp" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="+224 XXX XXX XXX" />
              <div className="flex gap-2">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(1)}>
                  Retour
                </Button>
                <Button type="button" className="flex-1" loading={loading} onClick={handleSubmit}>
                  Créer ma boutique
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
