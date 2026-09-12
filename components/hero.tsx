'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock3, Search, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export function Hero() {
  return <section className="hero">
    <div className="hero-glow one"/><div className="hero-glow two"/>
    <div className="hero-copy">
      <div className="eyebrow"><span className="live-dot"/> Open now · lightning fast delivery</div>
      <h1>Your <span>Craving</span><br/>Is Calling</h1>
      <p>Delicious meals. Lightning fast.<br/>Right at your doorstep.</p>
      <div className="hero-actions"><Link href="/menu" className="primary-button">ORDER NOW <ArrowRight size={17}/></Link><Link href="/menu" className="secondary-button"><Search size={17}/> Explore menu</Link></div>
      <div className="hero-mini-proof"><div className="avatar-stack"><i/> <i/> <i/> <i/></div><span><b>4.9/5</b> from 2,500+ happy cravings</span></div>
    </div>
    <motion.div className="hero-food" initial={{ opacity: 0, scale: .88, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: .8, ease: 'easeOut' }}>
      <div className="hero-ring"/>
      <Image src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=90" alt="YumYummy burger" fill priority sizes="(max-width: 800px) 90vw, 620px" className="hero-burger" />
      <div className="eta-card"><Clock3 size={16}/><small>Delivery in</small><strong>25<span> min</span></strong><em>ETA</em></div>
      <div className="floating-chip chip-one"><Sparkles size={14}/> Fresh off the grill</div>
      <div className="floating-chip chip-two">🔥 1,240 ordered today</div>
    </motion.div>
  </section>;
}
