import { Navbar } from "@/components/navbar";
import { CartProvider } from "@/components/providers/cart-provider";
import { SharedLayout } from "@/layout/shared-layout";

export default function Home() {
  return (
    <CartProvider>
       <SharedLayout>
        <p>hello world</p>
            {/* <Navbar /> */}
            {/* <Foods /> */}
        </SharedLayout>
    </CartProvider>
  );
}
