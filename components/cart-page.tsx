'use client';

import Link from 'next/link';
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useApp } from './providers';
import { MobileNav, SiteHeader } from './site-header';

export function CartPage() {
  const { cart, subtotal, setQuantity, removeFromCart } = useApp();
  const delivery = subtotal >= 15 || subtotal === 0 ? 0 : 1.99;
  const discount = subtotal >= 15 ? subtotal * .15 : 0;
  const total = subtotal + delivery - discount;
  return <main><SiteHeader/><div className="page-shell inner-page"><Link href="/menu" className="back-link"><ArrowLeft size={16}/> Continue shopping</Link><div className="page-title"><span className="section-kicker">Your bag</span><h1>Ready to check out?</h1><p>{cart.length ? `${cart.length} different cravings in your bag.` : 'Your bag is waiting for something delicious.'}</p></div>{!cart.length ? <div className="empty-state"><ShoppingBag size={48}/><h2>Your cart is empty</h2><p>Add a few favorites and come back here.</p><Link className="primary-button" href="/menu">Browse menu <ArrowRight size={16}/></Link></div> : <div className="cart-layout"><div className="cart-list">{cart.map((item) => <div className="cart-item" key={item.id}><img src={item.image} alt=""/><div className="cart-item-main"><Link href={`/product/${item.slug}`}><h3>{item.name}</h3></Link><p>{item.category} · {item.calories} cal</p><div className="quantity"><button onClick={() => setQuantity(item.id, item.quantity - 1)}><Minus size={15}/></button><b>{item.quantity}</b><button onClick={() => setQuantity(item.id, item.quantity + 1)}><Plus size={15}/></button></div></div><strong>${(item.price * item.quantity).toFixed(2)}</strong><button className="trash" onClick={() => removeFromCart(item.id)}><Trash2 size={17}/></button></div>)}</div><aside className="summary-card"><h2>Order summary</h2><div><span>Subtotal</span><b>${subtotal.toFixed(2)}</b></div><div><span>Delivery</span><b>{delivery ? `$${delivery.toFixed(2)}` : 'FREE'}</b></div><div><span>Demo discount</span><b>- ${discount.toFixed(2)}</b></div><hr/><div className="total-row"><span>Total</span><b>${total.toFixed(2)}</b></div><p className="summary-note">This practice site never charges a real payment method.</p><Link href="/checkout" className="primary-button wide">Go to checkout <ArrowRight size={16}/></Link></aside></div>}</div><MobileNav/></main>;
}
