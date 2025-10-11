import { cn } from '@/lib/utils';
import { SearchIcon } from 'lucide-react';
import { useId } from 'react';
import { Input } from './ui/input';

export const SearchBar = ({ className }: { className?: string }) => {
    const id = useId();
    return (
        <div className={cn('*:not-first:mt-2', className)}>
            <div className="relative">
                <Input
                    id={id}
                    className="peer ps-9"
                    placeholder="Search in Snak Eats"
                    type="search"
                />
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                    <SearchIcon size={16} aria-hidden="true" />
                </div>
            </div>
        </div>
    );
};
