import { AppTitle } from '@/app/_components/navbar/app-title';
import { loginModalAtom, signupModalAtom } from '@/atoms';
import { AppLogo } from '@/components/shared/app-logo';

import { useAtom, useSetAtom } from 'jotai';
import { type ReactNode } from 'react';

import { Button } from '../../ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../../ui/dialog';
import { RegisterForm } from './register-form';

export const RegisterModal = ({ children }: { children?: ReactNode }) => {
    const [isOpen, setIsOpen] = useAtom(signupModalAtom);
    const setIsLoginModalOpen = useSetAtom(loginModalAtom);

    const handleOpenLoginModal = () => {
        setIsOpen(false);
        setIsLoginModalOpen(true);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children ? (
                    children
                ) : (
                    <Button variant="outline">Sign up</Button>
                )}
            </DialogTrigger>
            <DialogContent>
                <div className="flex flex-col items-center gap-2">
                    <div
                        className="flex size-11 shrink-0 items-center justify-center rounded-full border"
                        aria-hidden="true"
                    >
                        <AppLogo />
                    </div>
                    <DialogHeader>
                        <DialogTitle className="sm:text-center">
                            Sign up <AppTitle />
                        </DialogTitle>
                        <DialogDescription className="sm:text-center">
                            We just need a few details to get you started.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <RegisterForm />

                <div className="before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1">
                    <span className="text-muted-foreground text-xs">Or</span>
                </div>

                <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleOpenLoginModal}
                >
                    Already have an account? Log in
                </Button>

                <p className="text-muted-foreground text-center text-xs">
                    By signing up you agree to our{' '}
                    <a className="underline hover:no-underline" href="#">
                        Terms
                    </a>
                    .
                </p>
            </DialogContent>
        </Dialog>
    );
};
