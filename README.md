# YumYummy

Premium fast-food ordering practice website inspired by the supplied mobile reference.

## Included

- Next.js App Router + TypeScript
- Responsive app-first UI for mobile/tablet/desktop
- Premium purple / yellow / black visual system
- Home, menu, product detail, cart, checkout, orders and account pages
- Search, category filters, sorting, favorites, quantity controls
- Demo coupons/discounts and delivery calculation
- Demo-only checkout: COD, simulated card, simulated wallet
- API route for validated demo order placement
- LocalStorage persistence for cart, favorites and order history
- Animated interactions with Motion
- Lucide icons
- Custom YumYummy SVG logo + favicon

## Run

```bash
npm install
npm run dev
```

Then open http://localhost:3000

No real payment gateway is connected. All payment options are intentionally simulated for practice.

## Next production step

For a real deployment, replace the localStorage order store with PostgreSQL/Prisma or another database, add authentication, and connect a real payment provider only when needed.
