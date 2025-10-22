import { Navbar } from '@/components/navbar';
import { CartProvider } from '@/components/providers/cart-provider';
import { SharedLayout } from '@/layout/shared-layout';
import { AllProducts } from '@/components/products/AllProducts';

export default function Home() {
    return (
        <CartProvider>
            <SharedLayout>
                <Navbar />
                <AllProducts />
            </SharedLayout>
        </CartProvider>
    );
}
