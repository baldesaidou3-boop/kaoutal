-- ============================================
-- Kaoutal - Marketplace Multi-vendeurs
-- Schéma PostgreSQL (Supabase)
-- ============================================

-- 1. PROFILS (étend auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'buyer' CHECK (role IN ('buyer', 'seller', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone, role)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'phone',
    COALESCE(NEW.raw_user_meta_data->>'role', 'buyer')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 2. VENDEURS
CREATE TABLE sellers (
  id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  store_name TEXT NOT NULL,
  store_slug TEXT NOT NULL UNIQUE,
  description TEXT,
  logo_url TEXT,
  whatsapp TEXT,
  city TEXT,
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  commission_rate DECIMAL(5,2) DEFAULT 5.00,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CATÉGORIES (10 niches)
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  image_url TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed des 10 catégories
INSERT INTO categories (name, slug, description, icon, sort_order) VALUES
  ('Mode & Tissus africains', 'mode-tissus', 'Wax, bazin, boubous, tenues traditionnelles et modernes', '👗', 1),
  ('Téléphones & Accessoires', 'telephones', 'Smartphones, chargeurs, coques, accessoires', '📱', 2),
  ('Épicerie fine locale', 'epicerie', 'Miel, soumbara, beurre de karité, café guinéen', '🥜', 3),
  ('Livraison repas / Traiteur', 'traiteur', 'Plats typiques : riz sauce, mafé, yassa', '🍛', 4),
  ('Beauté & Soins', 'beaute', 'Cosmétiques naturels, karité, black soap, huiles', '🧴', 5),
  ('Articles bébé & maman', 'bebe', 'Couches, lait, vêtements, jouets', '👶', 6),
  ('High-Tech & Gadgets', 'high-tech', 'Montres connectées, écouteurs, enceintes', '🎧', 7),
  ('Services digitaux', 'services', 'Recharge crédit, paiement factures, abonnements', '💳', 8),
  ('Artisanat & Décoration', 'artisanat', 'Masques, statues, tableaux, bijoux traditionnels', '🎨', 9),
  ('Livres & Fournitures scolaires', 'livres', 'Manuels, kits scolaires, papeterie', '📚', 10);

-- 4. PRODUITS
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID NOT NULL REFERENCES sellers(id) ON DELETE CASCADE,
  category_id INT NOT NULL REFERENCES categories(id),
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  compare_price DECIMAL(10,2),
  stock INT NOT NULL DEFAULT 0,
  unit TEXT DEFAULT 'pièce',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'archived')),
  images TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(seller_id, slug)
);

-- 5. PANIER
CREATE TABLE carts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(buyer_id)
);

CREATE TABLE cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cart_id UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INT NOT NULL DEFAULT 1,
  price_at_add DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(cart_id, product_id)
);

-- 6. COMMANDES
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id UUID NOT NULL REFERENCES profiles(id),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  total DECIMAL(10,2) NOT NULL,
  shipping_address TEXT,
  phone TEXT,
  payment_method TEXT,
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  seller_id UUID NOT NULL REFERENCES sellers(id),
  quantity INT NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL
);

-- Indexes
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_seller ON products(seller_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_orders_buyer ON orders(buyer_id);
CREATE INDEX idx_order_items_seller ON order_items(seller_id);
CREATE INDEX idx_cart_items_cart ON cart_items(cart_id);

-- RLS Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE sellers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Profiles: lecture publique, écriture propre profil
CREATE POLICY "Profiles are public" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Sellers: lecture publique, écriture propre vendeur
CREATE POLICY "Sellers are public" ON sellers FOR SELECT USING (true);
CREATE POLICY "Sellers can update own store" ON sellers FOR UPDATE USING (auth.uid() = id);

-- Products: lecture publique (actifs), écriture propre vendeur
CREATE POLICY "Active products are public" ON products FOR SELECT USING (status = 'active' OR seller_id = auth.uid());
CREATE POLICY "Sellers can insert products" ON products FOR INSERT WITH CHECK (seller_id = auth.uid());
CREATE POLICY "Sellers can update own products" ON products FOR UPDATE USING (seller_id = auth.uid());
CREATE POLICY "Sellers can delete own products" ON products FOR DELETE USING (seller_id = auth.uid());

-- Carts: propriétaire seulement
CREATE POLICY "Users can view own cart" ON carts FOR SELECT USING (auth.uid() = buyer_id);
CREATE POLICY "Users can insert own cart" ON carts FOR INSERT WITH CHECK (auth.uid() = buyer_id);
CREATE POLICY "Users can update own cart" ON carts FOR UPDATE USING (auth.uid() = buyer_id);

-- Cart items: via le cart
CREATE POLICY "Users can view own cart items" ON cart_items FOR SELECT USING (
  cart_id IN (SELECT id FROM carts WHERE buyer_id = auth.uid())
);
CREATE POLICY "Users can insert cart items" ON cart_items FOR INSERT WITH CHECK (
  cart_id IN (SELECT id FROM carts WHERE buyer_id = auth.uid())
);
CREATE POLICY "Users can update cart items" ON cart_items FOR UPDATE USING (
  cart_id IN (SELECT id FROM carts WHERE buyer_id = auth.uid())
);
CREATE POLICY "Users can delete cart items" ON cart_items FOR DELETE USING (
  cart_id IN (SELECT id FROM carts WHERE buyer_id = auth.uid())
);

-- Orders: acheteur voit ses commandes, vendeur voit celles de ses produits
CREATE POLICY "Buyers can view own orders" ON orders FOR SELECT USING (auth.uid() = buyer_id);
CREATE POLICY "Sellers can view their orders" ON orders FOR SELECT USING (
  id IN (SELECT order_id FROM order_items WHERE seller_id = auth.uid())
);
CREATE POLICY "Buyers can insert orders" ON orders FOR INSERT WITH CHECK (auth.uid() = buyer_id);

-- Order items: via la commande
CREATE POLICY "Users can view own order items" ON order_items FOR SELECT USING (
  order_id IN (SELECT id FROM orders WHERE buyer_id = auth.uid())
  OR seller_id = auth.uid()
);
