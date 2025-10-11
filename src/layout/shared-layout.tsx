import { AppSidebar } from '@/components/sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { TextHoverEffect } from '@/components/ui/text-hover-effect';
import { type ReactNode } from 'react';
import { Providers } from './providers';

export const SharedLayout = ({ children }: { children: ReactNode }) => {
    return (
        <Providers>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <div className="font-poppins container mx-auto p-6">
                        {children}
                        <footer className="mt-12 border-t-2">
                            <TextHoverEffect text="Snak" />
                        </footer>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </Providers>
    );
};
