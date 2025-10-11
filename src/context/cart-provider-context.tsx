// cart-context.tsx
import type { CartItem } from '@/types';
import type { ApiFood } from '@/types/api/api-types';
import { createContext } from 'react';

type CartContextType = {
    cart: CartItem[];
    addItem: (item: ApiFood) => void;
    removeItem: (id: number) => void;
    clear: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);
