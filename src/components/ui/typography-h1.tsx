import { cn } from '@/lib/utils';

export function TypographyH1(props: React.ComponentProps<'h1'>) {
    return (
        <h1
            {...props}
            className={cn(
                'scroll-m-20 text-balance text-center text-4xl font-extrabold tracking-tight',
                props.className,
            )}
        >
            {props.children}
        </h1>
    );
}
