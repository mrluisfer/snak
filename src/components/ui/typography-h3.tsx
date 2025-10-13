import { cn } from '@/lib/utils';

export function TypographyH3(props: React.ComponentProps<'h3'>) {
    return (
        <h3
            {...props}
            className={cn(
                'scroll-m-20 text-2xl font-semibold tracking-tight',
                props.className,
            )}
        >
            {props.children}
        </h3>
    );
}
