'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Plus, Star } from 'lucide-react';
import { useApp } from './providers';
import type { Product } from '@/lib/data';

export function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const { addToCart, favorites, toggleFavorite } = useApp();
  const liked = favorites.includes(product.id);
  return <article className={`product-card ${compact ? 'compact' : ''}`}>
    <Link href={`/product/${product.slug}`} className="product-image-wrap">
      {product.badge && <span className="product-badge">{product.badge}</span>}
      <Image src={product.image} alt={product.name} fill sizes="(max-width: 700px) 46vw, 280px" className="product-image" />
      <button className={`heart ${liked ? 'liked' : ''}`} onClick={(e) => { e.preventDefault(); toggleFavorite(product.id); }} aria-label="Favorite"><Heart size={17} fill={liked ? 'currentColor' : 'none'}/></button>
    </Link>
    <div className="product-info">
      <div className="product-rating"><Star size={13} fill="currentColor"/> {product.rating} <span>({product.reviews})</span></div>
      <Link href={`/product/${product.slug}`}><h3>{product.name}</h3></Link>
      {!compact && <p>{product.description}</p>}
      <div className="product-bottom"><div><strong>${product.price.toFixed(2)}</strong>{product.oldPrice && <del>${product.oldPrice.toFixed(2)}</del>}</div><button className="add-button" onClick={() => addToCart(product)}><Plus size={18}/></button></div>
    </div>
  </article>;
}
