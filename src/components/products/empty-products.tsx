import { motion } from "motion/react";
import { PackageOpen } from "lucide-react";

export function EmptyProducts() {
  return (
    <div className="flex h-[calc(100vh-12rem)] w-full items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex flex-col items-center text-center"
      >
        <div className="relative mb-4">
          <div className="absolute -inset-4 rounded-full bg-primary/5 blur-xl" />
          <div className="relative rounded-full bg-primary/10 p-4 ring-1 ring-primary/20">
            <PackageOpen className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          No products found
        </h2>
        <p className="mt-2 max-w-xs text-sm text-muted-foreground">
          We couldn't find any products matching your criteria. Try searching for
          something else.
        </p>
      </motion.div>
    </div>
  );
}
