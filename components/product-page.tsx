'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Heart, Minus, Plus, Star, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { findProduct } from '@/lib/data';
import { useApp } from './providers';
import { MobileNav, SiteHeader } from './site-header';

export function ProductPage({ slug }: { slug: string }) {
  const product = findProduct(slug);
  const { addToCart, favorites, toggleFavorite } = useApp();
  const [qty, setQty] = useState(1);
  if (!product) return <main><SiteHeader/><div className="page-shell empty-state"><h1>Item not found</h1><Link href="/menu" className="primary-button">Back to menu</Link></div></main>;
  return <main><SiteHeader/><div className="page-shell inner-page"><Link href="/menu" className="back-link"><ArrowLeft size={16}/> Back to menu</Link><div className="product-detail"><div className="detail-image"><Image src={product.image} alt={product.name} fill sizes="(max-width: 800px) 100vw, 55vw" priority/><span>{product.badge || 'YumYummy pick'}</span></div><div className="detail-copy"><div className="product-rating"><Star size={15} fill="currentColor"/> {product.rating} <span>{product.reviews} reviews</span></div><h1>{product.name}</h1><p className="detail-description">{product.description}</p><div className="detail-price">${product.price.toFixed(2)} {product.oldPrice && <del>${product.oldPrice.toFixed(2)}</del>}</div><div className="ingredients"><b>Inside the box</b><div>{product.ingredients.map((i) => <span key={i}>✓ {i}</span>)}</div></div><div className="detail-actions"><div className="quantity"><button onClick={() => setQty(Math.max(1, qty-1))}><Minus size={16}/></button><b>{qty}</b><button onClick={() => setQty(qty+1)}><Plus size={16}/></button></div><button className="primary-button" onClick={() => { for(let i=0;i<qty;i++) addToCart(product); }}><ShoppingBag size={18}/> Add to cart · ${(product.price*qty).toFixed(2)}</button><button className={`icon-button ${favorites.includes(product.id) ? 'liked' : ''}`} onClick={() => toggleFavorite(product.id)}><Heart fill={favorites.includes(product.id) ? 'currentColor' : 'none'}/></button></div><div className="detail-note">🔥 Made fresh to order · {product.calories} calories · {product.spicy ? 'Spicy' : 'Mild'}</div></div></div></div><MobileNav/></main>;
}
