'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Plus, Star } from 'lucide-react';
import { useApp } from './providers';
import type { Product } from '@/lib/data';

export function ProductCard({
  product,
  compact = false,
}: {
  product: Product;
  compact?: boolean;
}) {
  const { addToCart, favorites, toggleFavorite } = useApp();

  const liked = favorites.includes(product.id);

  const handleFavorite = () => {
    toggleFavorite(product.id);
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <article className={`product-card ${compact ? 'compact' : ''}`}>
      <div className="product-image-wrap">
        <Link
          href={`/product/${product.slug}`}
          className="product-image-link"
          aria-label={`View ${product.name}`}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 700px) 50vw, (max-width: 1000px) 50vw, 33vw"
            className="product-image"
            priority={false}
          />

          <div className="product-image-overlay" />
        </Link>

        {product.badge && (
          <span className="product-badge">
            {product.badge}
          </span>
        )}

        <button
          type="button"
          className={`heart ${liked ? 'liked' : ''}`}
          onClick={handleFavorite}
          aria-label={
            liked
              ? `Remove ${product.name} from favorites`
              : `Add ${product.name} to favorites`
          }
        >
          <Heart
            size={18}
            fill={liked ? 'currentColor' : 'none'}
          />
        </button>
      </div>

      <div className="product-info">
        <div className="product-rating">
          <Star size={13} fill="currentColor" />

          <span className="rating-number">
            {product.rating}
          </span>

          <span className="review-count">
            ({product.reviews})
          </span>
        </div>

        <Link
          href={`/product/${product.slug}`}
          className="product-title-link"
        >
          <h3>{product.name}</h3>
        </Link>

        {!compact && (
          <p>{product.description}</p>
        )}

        <div className="product-bottom">
          <div className="product-price">
            <strong>
              ${product.price.toFixed(2)}
            </strong>

            {product.oldPrice && (
              <del>
                ${product.oldPrice.toFixed(2)}
              </del>
            )}
          </div>

          <button
            type="button"
            className="add-button"
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus size={19} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </article>
  );
}