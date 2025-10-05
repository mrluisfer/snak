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
import axios from 'axios';
import { useAtom, useSetAtom } from 'jotai';
import { type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '../../ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../../ui/dialog';
import { Input } from '../../ui/input';

const signupFormSchema = z.object({
    name: z
        .string()
        .min(2, 'Name must be at least 2 characters long')
        .max(100, 'Name must be at most 100 characters long'),
    email: z.email(),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters long')
        .max(100, 'Password must be at most 100 characters long'),
});

export const SignupModal = ({ children }: { children?: ReactNode }) => {
    const [isOpen, setIsOpen] = useAtom(signupModalAtom);
    const setIsLoginModalOpen = useSetAtom(loginModalAtom);

    const signupForm = useForm<z.infer<typeof signupFormSchema>>({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    const handleOpenLoginModal = () => {
        setIsOpen(false);
        setIsLoginModalOpen(true);
    };

    const handleSubmitSignup = async (
        data: z.infer<typeof signupFormSchema>,
    ) => {
        try {
            const tokenResponse = await axios(
                'http://127.0.0.1:8000/sanctum/csrf-cookie',
                {
                    method: 'GET',
                    withCredentials: true,
                },
            );
            if (!tokenResponse.status || tokenResponse.status !== 204) {
                toast.error('Failed to get CSRF token', {
                    position: 'top-center',
                    richColors: true,
                });
                return;
            }

            const res = await axios.post(`/register`, {
                name: data.name,
                email: data.email,
                password: data.password,
                password_confirmation: data.password,
            });
            if (!res.status || res.status !== 201) {
                toast.error('Failed to register', {
                    position: 'top-center',
                    richColors: true,
                });
                console.error('Failed to register');
            }
        } catch (error) {
            console.error('Catch error', error);
        }
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
                        <svg
                            className="stroke-zinc-800 dark:stroke-zinc-100"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 32 32"
                            aria-hidden="true"
                        >
                            <circle
                                cx="16"
                                cy="16"
                                r="12"
                                fill="none"
                                strokeWidth="8"
                            />
                        </svg>
                    </div>
                    <DialogHeader>
                        <DialogTitle className="sm:text-center">
                            Sign up Origin UI
                        </DialogTitle>
                        <DialogDescription className="sm:text-center">
                            We just need a few details to get you started.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <Form {...signupForm}>
                    <form
                        className="space-y-5"
                        onSubmit={signupForm.handleSubmit(handleSubmitSignup)}
                    >
                        <div className="space-y-4">
                            <FormField
                                name="name"
                                control={signupForm.control}
                                render={({ field }) => (
                                    <FormItem className="*:not-first:mt-2">
                                        <FormLabel>Full name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Matt Welsh"
                                                type="text"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="email"
                                control={signupForm.control}
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
                                control={signupForm.control}
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
                        <Button type="submit" className="w-full">
                            Sign up
                        </Button>
                    </form>
                </Form>

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
