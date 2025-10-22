import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';

export function LoadingSpinner({ className }: { className?: string }) {
    return (
        <div className={cn('flex items-center space-x-2', className)}>
            <Spinner />
            <span>Loading...</span>
        </div>
    );
}
