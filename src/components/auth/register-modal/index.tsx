import { loginModalAtom, signupModalAtom } from '@/atoms';
import { AppTitle } from '@/components/navbar/app-title';
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

                <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                    <span className="text-xs text-muted-foreground">Or</span>
                </div>

                <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleOpenLoginModal}
                >
                    Already have an account? Log in
                </Button>

                <p className="text-center text-xs text-muted-foreground">
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
