'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  ShoppingBag,
  UserRound,
  MapPin,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useApp } from './providers';

export function Logo() {
  return (
    <Link
      href="/"
      className="brand"
      aria-label="YumYummy home"
    >
      <Image
        src="/logo.png"
        alt="YumYummy"
        width={42}
        height={42}
        priority
        className="brand-logo"
      />

      <span>
        Yum<span>Yummy</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const { cartCount } = useApp();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <div className="header-inner">

          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <Link href="/menu">
              Menu
            </Link>

            <Link href="/#deals">
              Deals
            </Link>

            <Link href="/#restaurants">
              Restaurants
            </Link>

            <Link href="/orders">
              Orders
            </Link>
          </nav>

          {/* Header Actions */}
          <div className="header-actions">

            {/* Search */}
            <Link
              href="/menu"
              className="icon-button"
              title="Search"
              aria-label="Search"
            >
              <Search size={19} />
            </Link>

            {/* Account */}
            <Link
              href="/account"
              className="icon-button desktop-only"
              title="Account"
              aria-label="Account"
            >
              <UserRound size={19} />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="cart-button"
              aria-label={`Cart${cartCount > 0 ? `, ${cartCount} items` : ''}`}
            >
              <ShoppingBag size={19} />

              <span>
                Cart
              </span>

              {cartCount > 0 && (
                <b>
                  {cartCount}
                </b>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="menu-button"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? (
                <X size={22} />
              ) : (
                <Menu size={22} />
              )}
            </button>

          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="mobile-menu">

            <Link
              href="/menu"
              onClick={() => setOpen(false)}
            >
              Menu
            </Link>

            <Link
              href="/#deals"
              onClick={() => setOpen(false)}
            >
              Deals
            </Link>

            <Link
              href="/#restaurants"
              onClick={() => setOpen(false)}
            >
              Restaurants
            </Link>

            <Link
              href="/orders"
              onClick={() => setOpen(false)}
            >
              Orders
            </Link>

            <Link
              href="/account"
              onClick={() => setOpen(false)}
            >
              Account
            </Link>

          </div>
        )}
      </header>
    </>
  );
}

export function DeliveryBar() {
  return (
    <div className="delivery-bar">

      <span>
        <MapPin size={15} />

        Deliver to{' '}

        <strong>
          221B Baker Street, London
        </strong>
      </span>

      <span className="delivery-status">
        ● Delivering in{' '}

        <strong>
          25–35 min
        </strong>
      </span>

    </div>
  );
}

export function MobileNav() {
  const { cartCount } = useApp();

  return (
    <nav className="mobile-nav">

      {/* Home */}
      <Link href="/">
        <span>⌂</span>
        Home
      </Link>

      {/* Orders */}
      <Link href="/orders">
        <span>▣</span>
        Orders
      </Link>

      {/* Quick Order */}
      <Link
        href="/menu"
        className="quick"
        aria-label="Quick order"
      >
        <span>⚡</span>
      </Link>

      {/* Cart */}
      <Link href="/cart">
        <span className="mobile-cart-icon">
          🛒

          {cartCount > 0 && (
            <b>
              {cartCount}
            </b>
          )}
        </span>

        Cart
      </Link>

      {/* Profile */}
      <Link href="/account">
        <span>◉</span>
        Profile
      </Link>

    </nav>
  );
}