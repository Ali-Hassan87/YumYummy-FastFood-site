'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  Star,
  ShoppingBag,
} from 'lucide-react';
import { useState } from 'react';

import { findProduct } from '@/lib/data';
import { useApp } from './providers';
import { MobileNav, SiteHeader } from './site-header';

export function ProductPage({ slug }: { slug: string }) {
  const product = findProduct(slug);

  const {
    addToCart,
    favorites,
    toggleFavorite,
  } = useApp();

  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <main>
        <SiteHeader />

        <div className="page-shell empty-state">
          <h1>Item not found</h1>

          <Link
            href="/menu"
            className="primary-button"
          >
            Back to menu
          </Link>
        </div>

        <MobileNav />
      </main>
    );
  }

  const liked = favorites.includes(product.id);

  const totalPrice = product.price * qty;

  const decreaseQuantity = () => {
    setQty((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    setQty((current) => current + 1);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCart(product);
    }
  };

  return (
    <main>
      <SiteHeader />

      <div className="page-shell inner-page product-page">
        <Link
          href="/menu"
          className="back-link"
        >
          <ArrowLeft size={16} />
          <span>Back to menu</span>
        </Link>

        <div className="product-detail">
          {/* =================================================
              PRODUCT IMAGE
             ================================================= */}
          <div className="detail-image">
            <div className="detail-image-glow" />

            <img
              src={product.image}
              alt={product.name}
              loading="eager"
              decoding="async"
              className="detail-product-image"
            />

            <div className="detail-image-shade" />

            <span className="detail-badge">
              {product.badge || 'YumYummy pick'}
            </span>
          </div>

          {/* =================================================
              PRODUCT INFORMATION
             ================================================= */}
          <div className="detail-copy">
            <div className="product-rating detail-rating">
              <Star
                size={15}
                fill="currentColor"
              />

              <span>
                {product.rating}
              </span>

              <span className="detail-review-count">
                {product.reviews} reviews
              </span>
            </div>

            <h1>
              {product.name}
            </h1>

            <p className="detail-description">
              {product.description}
            </p>

            <div className="detail-price">
              ${product.price.toFixed(2)}

              {product.oldPrice && (
                <del>
                  ${product.oldPrice.toFixed(2)}
                </del>
              )}
            </div>

            {/* =================================================
                INGREDIENTS
               ================================================= */}
            <div className="ingredients">
              <b>
                Inside the box
              </b>

              <div>
                {product.ingredients.map(
                  (ingredient) => (
                    <span key={ingredient}>
                      ✓ {ingredient}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* =================================================
                ACTIONS
               ================================================= */}
            <div className="detail-actions">
              <div className="quantity">
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} />
                </button>

                <b>
                  {qty}
                </b>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  aria-label="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>

              <button
                type="button"
                className="primary-button detail-cart-button"
                onClick={handleAddToCart}
              >
                <ShoppingBag size={18} />

                <span>
                  Add to cart · $
                  {totalPrice.toFixed(2)}
                </span>
              </button>

              <button
                type="button"
                className={`icon-button detail-favorite ${
                  liked ? 'liked' : ''
                }`}
                onClick={() =>
                  toggleFavorite(product.id)
                }
                aria-label={
                  liked
                    ? 'Remove from favorites'
                    : 'Add to favorites'
                }
              >
                <Heart
                  size={20}
                  fill={
                    liked
                      ? 'currentColor'
                      : 'none'
                  }
                />
              </button>
            </div>

            <div className="detail-note">
              🔥 Made fresh to order ·{' '}
              {product.calories} calories ·{' '}
              {product.spicy
                ? 'Spicy'
                : 'Mild'}
            </div>
          </div>
        </div>
      </div>

      <MobileNav />
    </main>
  );
}