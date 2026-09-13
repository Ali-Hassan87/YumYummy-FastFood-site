'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronRight, Clock3, Flame, Gift, Star, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { categories, offers, products, restaurantPills } from '@/lib/data';
import { ProductCard } from './product-card';
import { Hero } from './hero';
import { DeliveryBar, MobileNav, SiteHeader } from './site-header';

export function HomePage() {
  const popular = products.filter((p) => p.popular);
  return <main><SiteHeader/><DeliveryBar/><div className="page-shell"><Hero/>
    <section className="section categories-section"><div className="section-heading"><div><span className="section-kicker">Cravings, organized</span><h2>What are you feeling?</h2></div><Link href="/menu">View all <ChevronRight size={16}/></Link></div><div className="category-row">{categories.map((c, i) => <Link href={`/menu?category=${c.id}`} className={`category-card ${i === 0 ? 'active' : ''}`} key={c.id}><span>{c.icon}</span><b>{c.name}</b></Link>)}</div></section>
    <section className="section" id="deals"><div className="section-heading"><div><span className="section-kicker">Best value</span><h2>Deals worth craving</h2></div><Link href="/menu">View all <ChevronRight size={16}/></Link></div><div className="deal-grid">{popular.slice(0, 2).map((p, i) => <motion.div key={p.id} className={`deal-card ${i === 1 ? 'purple' : ''}`} whileHover={{ y: -5 }}><div><span className="tiny-label">{i === 0 ? 'BEST VALUE COMBO' : 'NEW ARRIVAL'}</span><h3>{p.name}</h3><p>{p.description.slice(0, 70)}...</p><div className="deal-price">${p.price.toFixed(2)}</div></div><div className="deal-image"><img src={p.image} alt=""/></div><button onClick={() => location.assign(`/product/${p.slug}`)}>View item <ArrowRight size={15}/></button></motion.div>)}</div></section>
    <section className="build-banner"><div><span className="section-kicker">Made your way</span><h2>Build your own meal</h2><p>You choose. We make it perfect.</p><Link href="/menu" className="primary-button">BUILD NOW <ArrowRight size={16}/></Link></div><div className="build-steps">{[['1','🍔','Choose your base'],['2','🥩','Pick your filling'],['3','🧀','Add toppings'],['4','🌶️','Sauce & extras']].map(([n,e,t]) => <div key={n}><b>{n}</b><span>{e}</span><small>{t}</small></div>)}</div></section>
    <section className="section" id="restaurants"><div className="section-heading"><div><span className="section-kicker">Near you</span><h2>Popular restaurants</h2></div><Link href="/menu">View all <ChevronRight size={16}/></Link></div><div className="restaurant-row">{restaurantPills.map(([name,rating,time,free,icon]) => <div className="restaurant-card" key={name}><span className="restaurant-icon">{icon}</span><div><b>{name}</b><div><Star size={12} fill="currentColor"/> {rating} · {time}</div><small>{free}</small></div></div>)}</div></section>
    <section className="flash-offer"><div className="flash-copy"><span><Zap size={15}/> FLASH OFFERS</span><h2>Hungry now?</h2><p>Take 40% off your next order.</p><strong>Use code: QUICK40</strong></div><div className="offer-timer"><b>02</b><span>:</span><b>15</b><span>:</span><b>47</b><small>HRS&nbsp;&nbsp;&nbsp; MINS&nbsp;&nbsp;&nbsp; SECS</small></div><div className="offer-art">🍟</div><div className="offer-percent">Flat <b>40%</b> OFF</div></section>
    <section className="section"><div className="section-heading"><div><span className="section-kicker">Most loved</span><h2>Popular right now</h2></div><Link href="/menu">See menu <ChevronRight size={16}/></Link></div><div className="product-grid">{products.slice(0, 6).map((p) => <ProductCard key={p.id} product={p}/>)}</div></section>
    <section className="social-proof"><div><span className="section-kicker">Loved by thousands</span><h2>Good food makes repeat customers.</h2><p>Real cravings, real orders, zero boring bites.</p></div><div className="rating-big"><strong>4.8</strong><div><div className="stars">★★★★★</div><small>12,540+ reviews</small></div></div><Gift size={42}/></section>
    <section className="newsletter"><div><span className="section-kicker">YumYummy club</span><h2>Deals before everyone else.</h2><p>Get drops, secret menu items and surprise coupons.</p></div><div className="newsletter-form"><input placeholder="you@example.com" type="email"/><button>Join the club <ArrowRight size={16}/></button></div></section>
  </div>

  <footer className="footer">
  <div>
    <span className="brand">
      <Image
        src="/logo.png"
        alt="YumYummy"
        width={42}
        height={42}
        className="brand-logo"
      />

      <span>
        Yum<span>Yummy</span>
      </span>
    </span>

    <p>
      Fast food. Big mood. Zero boring bites.
    </p>
  </div>

  <div>
    <b>Explore</b>
    <Link href="/menu">Menu</Link>
    <Link href="/orders">Orders</Link>
    <Link href="/account">Account</Link>
  </div>

  <div>
    <b>Support</b>
    <a href="mailto:silverloftofficial@gmail.com">
      silverloftofficial@gmail.com
    </a>
    <span>
      Its Time to get your cravings satisfied. Order now and experience the ultimate fast food adventure!
    </span>
  </div>
</footer>
  
  <MobileNav/></main>;
}
