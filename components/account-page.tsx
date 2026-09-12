'use client';

import Link from 'next/link';
import { Heart, MapPin, Package, Settings2, Star, UserRound } from 'lucide-react';
import { useApp } from './providers';
import { products } from '@/lib/data';
import { ProductCard } from './product-card';
import { MobileNav, SiteHeader } from './site-header';

export function AccountPage() {
  const { favorites, orders } = useApp();
  const liked = products.filter((p) => favorites.includes(p.id));
  return <main><SiteHeader/><div className="page-shell inner-page"><div className="account-hero"><div className="profile-avatar">A</div><div><span className="section-kicker">YumYummy member</span><h1>Hey, foodie.</h1><p>Manage your cravings, saved items and orders.</p></div><button className="icon-button"><Settings2 size={18}/></button></div><div className="account-stats"><div><Package/><b>{orders.length}</b><span>Orders</span></div><div><Heart/><b>{favorites.length}</b><span>Favorites</span></div><div><Star/><b>4.9</b><span>Member rating</span></div></div><div className="account-grid"><section className="account-panel"><h2>Saved address</h2><div className="address-box"><MapPin/><div><b>Home</b><p>221B Baker Street<br/>London</p></div><button>Edit</button></div></section><section className="account-panel"><h2>Quick links</h2><Link href="/orders"><Package/> Order history <span>→</span></Link><Link href="/menu"><UserRound/> Browse menu <span>→</span></Link><Link href="/cart"><MapPin/> Current cart <span>→</span></Link></section></div><section className="section"><div className="section-heading"><div><span className="section-kicker">Your picks</span><h2>Favorites</h2></div><Link href="/menu">Browse more →</Link></div>{liked.length ? <div className="product-grid">{liked.map((p) => <ProductCard key={p.id} product={p}/>)}</div> : <div className="empty-state small"><Heart size={35}/><h2>No favorites yet</h2><p>Tap the heart on any item to save it.</p></div>}</section></div><MobileNav/></main>;
}
