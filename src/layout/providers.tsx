'use client';

import { ThemeProvider } from '@/components/providers/theme-provider';
import { type ReactNode } from 'react';
import { Toaster } from 'sonner';

export const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <ThemeProvider>
            {children}
            <Toaster closeButton />
        </ThemeProvider>
    );
};
