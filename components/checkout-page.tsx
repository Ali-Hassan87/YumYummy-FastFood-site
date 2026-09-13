'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, Check, CreditCard, MapPin, ShieldCheck, WalletCards } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useApp } from './providers';

export function CheckoutPage() {
  const { cart, subtotal, clearCart, saveOrder } = useApp();
  const router = useRouter();
  const [payment, setPayment] = useState('cod');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', address: '', note: '' });
  const delivery = subtotal >= 15 ? 0 : 1.99;
  const total = subtotal + delivery;

  async function placeOrder() {
    setError('');
    if (!form.name || !form.phone || !form.address || !cart.length) { setError('Please complete your details and add at least one item.'); return; }
    setLoading(true);
    try {
      const response = await fetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ customer: form, items: cart.map(({ id, quantity }) => ({ id, quantity })), payment, total }) });
      const data = await response.json();
      if (!data.ok) throw new Error(data.message);
      saveOrder({ ...data.order, items: cart });
      clearCart();
      router.push(`/orders?success=${data.order.id}`);
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not place order.'); }
    finally { setLoading(false); }
  }

  if (!cart.length) return <main><div className="checkout-empty"><div>🛒</div><h1>Your cart is empty</h1><p>Add something tasty before checkout.</p><Link href="/menu" className="primary-button">Browse menu</Link></div></main>;

  return <main><div className="checkout-top"><Link href="/cart" className="back-link"><ArrowLeft size={16}/> Back to cart</Link><div className="brand"><span className="brand-mark">⚡</span>Yum<span>Yummy</span></div><span className="secure"><ShieldCheck size={15}/>YumYummy  checkout</span></div><div className="checkout-page"><div className="checkout-main"><div className="checkout-heading"><span className="section-kicker">Almost there</span><h1>Complete your order.</h1><p>No real payment is processed in this practice build.</p></div><section className="checkout-card"><div className="card-title"><span><MapPin size={19}/></span><div><h2>Delivery details</h2><p>Where should we bring the good stuff?</p></div></div><div className="form-grid"><label>Full name<input value={form.name} onChange={(e) => setForm({...form, name:e.target.value})} placeholder="Ali Hassan"/></label><label>Phone number<input value={form.phone} onChange={(e) => setForm({...form, phone:e.target.value})} placeholder="03xx-xxxxxxx"/></label><label className="full">Delivery address<input value={form.address} onChange={(e) => setForm({...form, address:e.target.value})} placeholder="House, street, area, city"/></label><label className="full">Delivery note <span>optional</span><textarea value={form.note} onChange={(e) => setForm({...form, note:e.target.value})} placeholder="Ring the bell, extra sauce, etc."/></label></div></section><section className="checkout-card"><div className="card-title"><span><CreditCard size={19}/></span><div><h2>Payment</h2><p>Demo-only payment methods</p></div></div><div className="payment-options">{[['cod','Cash on delivery','Pay when your craving arrives','💵'],['paypal-card','Paypal card','Simulates a successful card payment','💳'],['online-wallet','Online wallet','Simulates a wallet payment','📱']].map(([id,title,sub,icon]) => <button key={id} className={payment === id ? 'selected' : ''} onClick={() => setPayment(id)}><span>{icon}</span><div><b>{title}</b><small>{sub}</small></div>{payment === id && <Check size={18}/>}</button>)}</div></section>{error && <div className="error-box">{error}</div>}<button className="primary-button place-order" onClick={placeOrder} disabled={loading}>{loading ? 'Placing order…' : `Place order · $${total.toFixed(2)}`}</button></div><aside className="checkout-summary"><h2>Your order</h2>{cart.map((i) => <div className="mini-line" key={i.id}><img src={i.image} alt=""/><div><b>{i.quantity}× {i.name}</b><span>${(i.price*i.quantity).toFixed(2)}</span></div></div>)}<hr/><div><span>Subtotal</span><b>${subtotal.toFixed(2)}</b></div><div><span>Delivery</span><b>{delivery ? `$${delivery.toFixed(2)}` : 'FREE'}</b></div><div className="total-row"><span>Total</span><b>${total.toFixed(2)}</b></div><div className="demo-callout"><WalletCards size={18}/><span><b>Practice mode</b> — payment is simulated.</span></div></aside></div></main>;
}
