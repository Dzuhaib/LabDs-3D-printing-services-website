'use client';

import React from 'react';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useCartStore } from '@/store/useCartStore';

export const CheckoutButton: React.FC = () => {
  const { items, getTotal, clearCart } = useCartStore();
  const total = getTotal() + (items.length > 0 ? 4.99 : 0);

  return (
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
  );
};
