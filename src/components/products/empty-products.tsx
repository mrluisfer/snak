import { PackageOpen } from 'lucide-react';
import { motion } from 'motion/react';

export function EmptyProducts() {
    return (
        <div className="flex h-[calc(100vh-12rem)] w-full items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="flex flex-col items-center text-center"
            >
                <div className="relative mb-4">
                    <div className="bg-primary/5 absolute -inset-4 rounded-full blur-xl" />
                    <div className="bg-primary/10 ring-primary/20 relative rounded-full p-4 ring-1">
                        <PackageOpen className="text-primary h-12 w-12" />
                    </div>
                </div>
                <h2 className="text-foreground text-2xl font-bold tracking-tight">
                    No products found
                </h2>
                <p className="text-muted-foreground mt-2 max-w-xs text-sm">
                    We couldn&apos;t find any products matching your criteria.
                    Try searching for something else.
                </p>
            </motion.div>
        </div>
    );
}
