import { loginModalAtom, signupModalAtom } from '@/atoms';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom, useSetAtom } from 'jotai';
import type { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { AppLogo } from '../../shared/app-logo';
import { Button } from '../../ui/button';
import { Checkbox } from '../../ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../../ui/dialog';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';

const loginFormSchema = z.object({
    email: z.email(),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters long')
        .max(100, 'Password must be at most 100 characters long'),
});

export const LoginModal = ({ children }: { children?: ReactNode }) => {
    const [isOpen, setIsOpen] = useAtom(loginModalAtom);
    const setIsSignupModalOpen = useSetAtom(signupModalAtom);

    const loginForm = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const handleSubmitLogin = async (data: z.infer<typeof loginFormSchema>) => {
        const res = await fetch(`/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        console.log({ res });
        if (!res.ok) {
            toast.error(
                'Login failed. Please check your credentials and try again.',
                {
                    position: 'top-center',
                    richColors: true,
                },
            );
            console.error('Login failed');
        }

        toast.success('Login successful!', {
            position: 'top-center',
        });
    };

    const handleOpenSignupModal = () => {
        setIsSignupModalOpen(true);
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
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

                <Form {...loginForm}>
                    <form
                        className="space-y-5"
                        onSubmit={loginForm.handleSubmit(handleSubmitLogin)}
                    >
                        <div className="space-y-4">
                            <FormField
                                name="email"
                                control={loginForm.control}
                                render={({ field }) => (
                                    <FormItem className="*:not-first:mt-2">
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="hi@yourcompany.com"
                                                type="email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="password"
                                control={loginForm.control}
                                render={({ field }) => (
                                    <FormItem className="*:not-first:mt-2">
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your password"
                                                type="password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex justify-between gap-2">
                            <div className="flex items-center gap-2">
                                <Checkbox id={`remember-me`} />
                                <Label
                                    htmlFor={`remember-me`}
                                    className="font-normal text-muted-foreground"
                                >
                                    Remember me
                                </Label>
                            </div>
                            <a
                                className="text-sm underline hover:no-underline"
                                href="#"
                            >
                                Forgot password?
                            </a>
                        </div>
                        <Button type="submit" className="w-full">
                            Let's go!
                        </Button>
                    </form>
                </Form>

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
