export type Category = { id: string; name: string; icon: string; accent: string };
export type Product = {
  id: string; slug: string; name: string; category: string; price: number; oldPrice?: number;
  rating: number; reviews: number; description: string; ingredients: string[]; image: string;
  badge?: string; calories: number; spicy?: boolean; popular?: boolean;
};

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=85`;

export const categories: Category[] = [
  { id: 'burgers', name: 'Burgers', icon: '🍔', accent: '#6d28d9' },
  { id: 'pizza', name: 'Pizza', icon: '🍕', accent: '#ffcf21' },
  { id: 'wraps', name: 'Wraps', icon: '🌯', accent: '#f97316' },
  { id: 'fries', name: 'Fries', icon: '🍟', accent: '#ffd21f' },
  { id: 'drinks', name: 'Drinks', icon: '🥤', accent: '#38bdf8' },
  { id: 'desserts', name: 'Desserts', icon: '🍰', accent: '#ec4899' },
];

export const products: Product[] = [
  { id: 'beast', slug: 'cheesy-beast-combo', name: 'Cheesy Beast Combo', category: 'burgers', price: 8.99, oldPrice: 12.99, rating: 4.9, reviews: 382, description: 'Double smash beef, molten cheddar, crispy lettuce, signature sauce, golden fries and a chilled drink.', ingredients: ['Double beef', 'Cheddar', 'Lettuce', 'Pickles', 'Signature sauce'], image: img('photo-1568901346375-23c9450c58cd'), badge: 'SAVE 35%', calories: 980, popular: true },
  { id: 'spicy', slug: 'spicy-lava-chicken', name: 'Spicy Lava Chicken Burger', category: 'burgers', price: 6.49, rating: 4.8, reviews: 214, description: 'Crispy chicken, pepper jack, jalapeño crunch and our lava sauce in a toasted brioche bun.', ingredients: ['Crispy chicken', 'Pepper jack', 'Jalapeño', 'Lava sauce'], image: img('photo-1606755962773-d324e0a13086'), badge: 'NEW', calories: 710, spicy: true, popular: true },
  { id: 'classic', slug: 'classic-yum-burger', name: 'Classic Yum Burger', category: 'burgers', price: 5.49, rating: 4.7, reviews: 190, description: 'Juicy beef patty, American cheese, onion, lettuce, tomato and house sauce.', ingredients: ['Beef patty', 'American cheese', 'Tomato', 'Lettuce', 'House sauce'], image: img('photo-1550547660-d9450f859349'), calories: 620 },
  { id: 'pepperoni', slug: 'loaded-pepperoni', name: 'Loaded Pepperoni Pizza', category: 'pizza', price: 11.99, oldPrice: 14.99, rating: 4.8, reviews: 147, description: 'Crispy-edged crust loaded with mozzarella, pepperoni, tomato sauce and herbs.', ingredients: ['Mozzarella', 'Pepperoni', 'Tomato sauce', 'Oregano'], image: img('photo-1574071318508-1cdbab80d002'), badge: 'HOT', calories: 1160, popular: true },
  { id: 'wrap', slug: 'crispy-crunch-wrap', name: 'Crispy Crunch Wrap', category: 'wraps', price: 7.25, rating: 4.6, reviews: 96, description: 'Crunchy chicken strips, slaw, cheese and smoky ranch wrapped fresh.', ingredients: ['Chicken strips', 'Slaw', 'Cheese', 'Smoky ranch'], image: img('photo-1626700051175-6818013e1d4f'), calories: 680 },
  { id: 'fries', slug: 'signature-loaded-fries', name: 'Signature Loaded Fries', category: 'fries', price: 4.25, rating: 4.9, reviews: 312, description: 'Golden fries with cheese sauce, crispy beef bits and YumYummy seasoning.', ingredients: ['Potato', 'Cheese sauce', 'Beef bits', 'Seasoning'], image: img('photo-1573080496219-bb080dd4f877'), badge: 'FAN FAV', calories: 540, popular: true },
  { id: 'cola', slug: 'fizz-cola', name: 'Fizz Cola', category: 'drinks', price: 2.49, rating: 4.5, reviews: 88, description: 'Ice-cold classic cola served with plenty of fizz.', ingredients: ['Cola', 'Ice'], image: img('photo-1544145945-f90425340c7e'), calories: 180 },
  { id: 'shake', slug: 'oreo-dream-shake', name: 'Oreo Dream Shake', category: 'drinks', price: 4.99, rating: 4.8, reviews: 128, description: 'Creamy vanilla shake blended with cookie crumble and whipped cream.', ingredients: ['Vanilla', 'Cookie crumble', 'Whipped cream'], image: img('photo-1579954115545-a95591f28bfc'), calories: 590 },
  { id: 'brownie', slug: 'chocolate-molten-brownie', name: 'Chocolate Molten Brownie', category: 'desserts', price: 4.75, rating: 4.9, reviews: 174, description: 'Warm chocolate brownie with a molten center and vanilla cream.', ingredients: ['Chocolate', 'Cocoa', 'Vanilla cream'], image: img('photo-1606313564200-e75d5e30476c'), badge: 'SWEET', calories: 460 },
  { id: 'wings', slug: 'fire-crisp-wings', name: 'Fire Crisp Wings', category: 'burgers', price: 8.5, rating: 4.7, reviews: 121, description: 'Crispy wings tossed in a smoky hot glaze with ranch dip.', ingredients: ['Chicken wings', 'Hot glaze', 'Ranch'], image: img('photo-1527477396000-e27163b481c2'), badge: 'SPICY', calories: 760, spicy: true },
];

export const restaurantPills = [
  ['Burger Hub', '4.7', '25–30 min', 'Free Delivery', '🍔'],
  ['Pizza Palace', '4.6', '30–35 min', 'Free Delivery', '🍕'],
  ['Wraps & Co.', '4.5', '20–25 min', 'Free Delivery', '🌯'],
  ['Fry Day', '4.6', '15–20 min', 'Free Delivery', '🍟'],
];

export const offers = [
  { code: 'QUICK40', title: 'Flat 40% OFF', sub: 'On orders above $15', color: '#6d28d9' },
  { code: 'YUM25', title: '25% OFF', sub: 'First order today', color: '#8b5cf6' },
  { code: 'FRIESFREE', title: 'Free Fries', sub: 'With any Beast Combo', color: '#111111' },
];

export function findProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
