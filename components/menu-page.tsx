'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { categories, products } from '@/lib/data';
import { ProductCard } from './product-card';
import { MobileNav, SiteHeader } from './site-header';

export function MenuPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('popular');
  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get('category');
    if (value) setCategory(value);
  }, []);
  const filtered = useMemo(() => {
    const result = products.filter((p) => (category === 'all' || p.category === category) && `${p.name} ${p.description}`.toLowerCase().includes(query.toLowerCase()));
    return [...result].sort((a,b) => sort === 'price' ? a.price - b.price : sort === 'rating' ? b.rating - a.rating : Number(Boolean(b.popular)) - Number(Boolean(a.popular)));
  }, [category, query, sort]);
  return <main><SiteHeader/><div className="page-shell inner-page"><div className="menu-hero"><div><span className="section-kicker">Full menu</span><h1>Order your <span>happy place.</span></h1><p>Every craving has a shortcut.</p></div><div className="menu-search"><Search size={19}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search burgers, pizza, fries..."/>{query && <button onClick={() => setQuery('')}><X size={16}/></button>}</div></div><div className="filter-bar"><div className="filter-categories"><button className={category === 'all' ? 'active' : ''} onClick={() => setCategory('all')}>All</button>{categories.map((c) => <button key={c.id} className={category === c.id ? 'active' : ''} onClick={() => setCategory(c.id)}>{c.icon} {c.name}</button>)}</div><label><SlidersHorizontal size={15}/> Sort <select value={sort} onChange={(e) => setSort(e.target.value)}><option value="popular">Popular</option><option value="rating">Top rated</option><option value="price">Lowest price</option></select></label></div><div className="menu-result-line"><b>{filtered.length} delicious picks</b><span>Free delivery over $15</span></div><div className="product-grid">{filtered.map((p) => <ProductCard key={p.id} product={p}/>)}</div>{filtered.length === 0 && <div className="empty-state"><div>🍔</div><h2>No cravings found.</h2><p>Try a different search or category.</p></div>}</div><MobileNav/></main>;
}
