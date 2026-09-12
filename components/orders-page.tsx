'use client';

import Link from 'next/link';
import { CheckCircle2, Clock3, MapPin, PackageCheck, RotateCcw, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useApp } from './providers';
import { MobileNav, SiteHeader } from './site-header';

export function OrdersPage() {
  const { orders, addToCart } = useApp();
  const [success, setSuccess] = useState<string | null>(null);
  useEffect(() => { setSuccess(new URLSearchParams(window.location.search).get('success')); }, []);
  return <main><SiteHeader/><div className="page-shell inner-page"><div className="page-title"><span className="section-kicker">Order center</span><h1>{success ? 'Craving confirmed. 🎉' : 'Your orders.'}</h1><p>{success ? `Order ${success} is now in the kitchen queue.` : 'Track your practice orders and reorder your favorites.'}</p></div>{success && <div className="tracking-card"><div className="tracking-head"><div><span className="live-dot"/> Live demo tracking</div><b>25–35 min</b></div><div className="track-line"><div className="track-step active"><span><CheckCircle2/></span><b>Confirmed</b><small>Just now</small></div><div className="track-step active"><span><Clock3/></span><b>Preparing</b><small>Kitchen is on it</small></div><div className="track-step"><span><Truck/></span><b>On the way</b><small>Coming soon</small></div><div className="track-step"><span><PackageCheck/></span><b>Delivered</b><small>Enjoy!</small></div></div><div className="tracking-address"><MapPin size={16}/> 221B Baker Street, London</div></div>}{orders.length ? <div className="orders-list">{orders.map((order) => <article className="order-card" key={order.id}><div className="order-head"><div><b>{order.id}</b><span>{new Date(order.createdAt).toLocaleString()}</span></div><span className="status-pill"><CheckCircle2 size={14}/> {order.status}</span></div><div className="order-items">{order.items.slice(0,3).map((item) => <div key={item.id}><img src={item.image} alt=""/><span>{item.quantity}× {item.name}</span></div>)}</div><div className="order-foot"><strong>${order.total.toFixed(2)}</strong><span>ETA {order.eta}</span><button onClick={() => order.items.forEach(addToCart)}><RotateCcw size={15}/> Reorder</button></div></article>)}</div> : <div className="empty-state"><div>🍟</div><h2>No orders yet</h2><p>Your next favorite meal is one click away.</p><Link href="/menu" className="primary-button">Start ordering</Link></div>}</div><MobileNav/></main>;
}
