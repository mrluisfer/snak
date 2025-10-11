import { CartContext } from '@/context/cart-provider-context';
import { useContext } from 'react';

export function useCartContext() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used within CartProvider');
    return ctx;
}
