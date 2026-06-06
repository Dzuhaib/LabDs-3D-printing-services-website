'use client';

import React from 'react';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useCartStore } from '@/store/useCartStore';

export const CheckoutButton: React.FC = () => {
  const { items, getTotal, clearCart } = useCartStore();
  const total = getTotal() + (items.length > 0 ? 4.99 : 0);

  return (
    <div className="space-y-4">
      <div className="relative bg-slate-200 rounded-2xl side-layers p-[1px]">
        <div className="bg-white rounded-2xl p-4 plastic-matte top-infill printed-bevel print-base">
          <PayPalScriptProvider options={{ clientId: "test", currency: "EUR" }}>
            <PayPalButtons
              style={{ layout: "vertical", shape: "rect", label: "checkout" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  intent: "CAPTURE",
                  purchase_units: [
                    {
                      amount: {
                        currency_code: "EUR",
                        value: total.toFixed(2),
                      },
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                if (actions.order) {
                  const details = await actions.order.capture();
                  alert(`Transaction completed by ${details.payer?.name?.given_name}`);
                  clearCart();
                }
              }}
            />
          </PayPalScriptProvider>
        </div>
      </div>
      
      {/* Secure Checkout Badge */}
      <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
        Secure Encrypted Checkout
      </div>
    </div>
  );
};
