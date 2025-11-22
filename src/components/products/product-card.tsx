import { Product } from "@/generated/prisma";
import { Eye, Heart, Package, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Helper to format currency
const formatCurrency = (amount: string | number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(Number(amount));
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <TooltipProvider>
      <Card className="group relative flex h-full flex-col overflow-hidden border-border/50 bg-card/50 transition-all hover:border-primary/50 hover:shadow-md hover:bg-card pt-0">
        {/* Image Placeholder */}
        <div className="relative aspect-square w-full overflow-hidden bg-muted/20 max-h-40">
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/15 transition-transform duration-500 group-hover:scale-105">
            <Package className="h-14 w-14" />
          </div>

          {/* Floating Badges */}
          <div className="absolute left-2 top-2 flex flex-col gap-1">
            {(product.stock ?? 0) <= 5 && (product.stock ?? 0) > 0 && (
              <Badge variant="destructive" className="h-5 px-1.5 text-[10px] font-medium">
                Low Stock
              </Badge>
            )}
            <Badge variant="secondary" className="h-5 bg-background/60 px-1.5 text-[10px] font-medium backdrop-blur-[2px]">
              New
            </Badge>
          </div>

          {/* Quick Actions Overlay */}
          <div className="absolute bottom-2 right-2 flex flex-col gap-1 opacity-0 transition-all duration-300 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-7 w-7 rounded-full shadow-sm hover:text-primary"
                >
                  <Eye className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">Quick View</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-7 w-7 rounded-full shadow-sm hover:text-red-500"
                >
                  <Heart className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">Wishlist</TooltipContent>
            </Tooltip>
          </div>
        </div>

        <CardHeader className="space-y-0.5 p-3 pb-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-1 text-sm font-medium tracking-tight text-foreground/90 group-hover:text-primary">
              {product.name}
            </h3>
          </div>
          <p className="text-[10px] font-mono text-muted-foreground/70">{product.sku}</p>
        </CardHeader>

        <CardContent className="flex-1 p-3 pt-1.5">
          <p className="line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
            {product.description}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-base font-bold text-foreground">
              {formatCurrency(product.price.toString(), product.currency)}
            </span>
          </div>
        </CardContent>

        <CardFooter className="p-3 pt-0">
          <Button
            className="h-8 w-full gap-1.5 rounded-md text-xs font-medium transition-all active:scale-95"
            disabled={(product.stock ?? 0) === 0}
            size="sm"
            variant={(product.stock ?? 0) === 0 ? "outline" : "default"}
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            {(product.stock ?? 0) > 0 ? "Add" : "Out of Stock"}
          </Button>
        </CardFooter>
      </Card>
    </TooltipProvider>
  );
}
