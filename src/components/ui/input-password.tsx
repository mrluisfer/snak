'use client';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { CheckIcon, EyeIcon, EyeOffIcon, XIcon } from 'lucide-react';
import { useId, useMemo, useState } from 'react';

type InputPasswordProps = React.ComponentProps<'input'> & {
    label?: string;
};

export function InputPassword({
    label = 'Password',
    placeholder = 'Password',
    className,
    value,
    onChange,
    ...props
}: InputPasswordProps) {
    const id = useId();
    const [internalValue, setInternalValue] = useState(value?.toString() || '');
    const [isVisible, setIsVisible] = useState(false);

    const password = value !== undefined ? String(value) : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) onChange(e);
        if (value === undefined) setInternalValue(e.target.value);
    };

    const toggleVisibility = () => setIsVisible((prev) => !prev);

    const checkStrength = (pass: string) => {
        const requirements = [
            { regex: /.{8,}/, text: 'At least 8 characters' },
            { regex: /[0-9]/, text: 'At least 1 number' },
            { regex: /[a-z]/, text: 'At least 1 lowercase letter' },
            { regex: /[A-Z]/, text: 'At least 1 uppercase letter' },
        ];
        return requirements.map((req) => ({
            met: req.regex.test(pass),
            text: req.text,
        }));
    };

    const strength = checkStrength(password);

    const strengthScore = useMemo(
        () => strength.filter((req) => req.met).length,
        [strength],
    );

    const getStrengthColor = (score: number) => {
        if (score === 0) return 'bg-border';
        if (score <= 1) return 'bg-red-500';
        if (score <= 2) return 'bg-orange-500';
        if (score === 3) return 'bg-amber-500';
        return 'bg-emerald-500';
    };

    const getStrengthText = (score: number) => {
        if (score === 0) return 'Enter a password';
        if (score <= 2) return 'Weak password';
        if (score === 3) return 'Medium password';
        return 'Strong password';
    };

    return (
        <div className={cn('w-full', className)}>
            <div className="*:not-first:mt-2">
                <div className="relative">
                    <Input
                        id={id}
                        className="pe-9"
                        placeholder={placeholder}
                        type={isVisible ? 'text' : 'password'}
                        value={password}
                        onChange={handleChange}
                        aria-describedby={`${id}-description`}
                        {...props}
                    />
                    <button
                        className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 transition-[color,box-shadow] outline-none hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        type="button"
                        onClick={toggleVisibility}
                        aria-label={
                            isVisible ? 'Hide password' : 'Show password'
                        }
                        aria-pressed={isVisible}
                        aria-controls="password"
                    >
                        {isVisible ? (
                            <EyeOffIcon size={16} aria-hidden="true" />
                        ) : (
                            <EyeIcon size={16} aria-hidden="true" />
                        )}
                    </button>
                </div>
            </div>

            <div
                className="mt-3 mb-4 h-1 w-full overflow-hidden rounded-full bg-border"
                role="progressbar"
                aria-valuenow={strengthScore}
                aria-valuemin={0}
                aria-valuemax={4}
                aria-label="Password strength"
            >
                <div
                    className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
                    style={{ width: `${(strengthScore / 4) * 100}%` }}
                ></div>
            </div>

            <p
                id={`${id}-description`}
                className="mb-2 text-sm font-medium text-foreground"
            >
                {getStrengthText(strengthScore)}. Must contain:
            </p>

            <ul className="space-y-1.5" aria-label="Password requirements">
                {strength.map((req, index) => (
                    <li key={index} className="flex items-center gap-2">
                        {req.met ? (
                            <CheckIcon
                                size={16}
                                className="text-emerald-500"
                                aria-hidden="true"
                            />
                        ) : (
                            <XIcon
                                size={16}
                                className="text-muted-foreground/80"
                                aria-hidden="true"
                            />
                        )}
                        <span
                            className={`text-xs ${
                                req.met
                                    ? 'text-emerald-600'
                                    : 'text-muted-foreground'
                            }`}
                        >
                            {req.text}
                            <span className="sr-only">
                                {req.met
                                    ? ' - Requirement met'
                                    : ' - Requirement not met'}
                            </span>
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
