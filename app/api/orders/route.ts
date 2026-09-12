import { NextResponse } from 'next/server';
import { z } from 'zod';

const orderSchema = z.object({
  customer: z.object({ name: z.string().min(2), phone: z.string().min(7), address: z.string().min(8) }),
  items: z.array(z.object({ id: z.string(), quantity: z.number().int().positive() })).min(1),
  payment: z.enum(['cod', 'demo-card', 'demo-wallet']),
  total: z.number().nonnegative(),
});

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = orderSchema.safeParse(payload);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, message: 'Please check your order details.' }, { status: 400 });
    }

    const order = {
      id: `YY-${Date.now().toString(36).toUpperCase()}`,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      eta: '25–35 min',
      ...parsed.data,
    };

    return NextResponse.json({ ok: true, order });
  } catch {
    return NextResponse.json({ ok: false, message: 'Could not place demo order.' }, { status: 500 });
  }
}
