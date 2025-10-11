'use client';

import { Input } from '@/components/ui/input';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useId, useState } from 'react';

type InputPasswordSimpleProps = React.ComponentProps<'input'> & {
    label?: string;
};

export function InputPasswordSimple({
    label = 'Password',
    placeholder = 'Password',
    className,
    value,
    onChange,
    ...props
}: InputPasswordSimpleProps) {
    const id = useId();
    const [isVisible, setIsVisible] = useState(false);
    const [internalValue, setInternalValue] = useState(value?.toString() || '');

    const password = value !== undefined ? String(value) : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) onChange(e);
        if (value === undefined) setInternalValue(e.target.value);
    };

    const toggleVisibility = () => setIsVisible((prev) => !prev);

    return (
        <div className="relative">
            <Input
                id={id}
                className="pe-9"
                placeholder={placeholder}
                type={isVisible ? 'text' : 'password'}
                value={password}
                onChange={handleChange}
                {...props}
            />
            <button
                className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 transition-[color,box-shadow] outline-none hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                type="button"
                onClick={toggleVisibility}
                aria-label={isVisible ? 'Hide password' : 'Show password'}
                aria-pressed={isVisible}
                aria-controls={id}
            >
                {isVisible ? (
                    <EyeOffIcon size={16} aria-hidden="true" />
                ) : (
                    <EyeIcon size={16} aria-hidden="true" />
                )}
            </button>
        </div>
    );
}
