import { loginModalAtom, signupModalAtom } from '@/atoms';

import { useAtom, useSetAtom } from 'jotai';
import { type ReactNode } from 'react';

import { AppLogo } from '../../shared/app-logo';
import { Button } from '../../ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../../ui/dialog';
import { LoginForm } from './login-form';

export const LoginModal = ({ children }: { children?: ReactNode }) => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useAtom(loginModalAtom);
    const setIsSignupModalOpen = useSetAtom(signupModalAtom);

    const handleOpenSignupModal = () => {
        setIsSignupModalOpen(true);
        setIsLoginModalOpen(false);
    };

    return (
        <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
            <DialogTrigger asChild>
                {children ? children : <Button variant="ghost">Log in</Button>}
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
                            Welcome back
                        </DialogTitle>
                        <DialogDescription className="sm:text-center">
                            Enter your credentials to login to your account.
                        </DialogDescription>
                    </DialogHeader>
                </div>
                <LoginForm />

                <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                    <span className="text-xs text-muted-foreground">Or</span>
                </div>

                <Button variant="outline" onClick={handleOpenSignupModal}>
                    Create an Account
                </Button>
            </DialogContent>
        </Dialog>
    );
};
