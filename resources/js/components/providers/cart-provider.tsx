import { CART_STORAGE_KEY } from '@/constants';
import { CartContext } from '@/context/cart-provider-context';
import type { CartItem } from '@/types';
import type { ApiFood } from '@/types/api/api-types';
import { useEffect, useState, type ReactNode } from 'react';

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);

    // Cargar una vez
    useEffect(() => {
        const raw = localStorage.getItem(CART_STORAGE_KEY);
        if (!raw) return;
        try {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) setCart(parsed);
        } catch (error) {
            console.error(
                'Failed to parse cart items from localStorage',
                error,
            );
        }
    }, []);

    // Persistir cada cambio
    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }, [cart]);

    const addItem = (item: ApiFood) => {
        setCart((prev) => {
            // si quieres cantidades por id:
            const idx = prev.findIndex((p) => p.id === item.id);
            if (idx !== -1) {
                const next = [...prev];
                const q = next[idx].quantity ?? 1;
                next[idx] = { ...next[idx], quantity: q + 1 };
                return next;
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const removeItem = (id: number) => {
        setCart((prev) => prev.filter((p) => p.id !== id));
    };

    const clear = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, clear }}>
            {children}
        </CartContext.Provider>
    );
}
