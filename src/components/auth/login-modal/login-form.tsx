import { loginModalAtom } from '@/atoms';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { InputPasswordSimple } from '@/components/ui/input-password-simple';
import { Loader } from '@/components/ui/shadcn-io/ai/loader';
import { authClient } from '@/lib/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Checkbox } from '../../ui/checkbox';
import { Input } from '../../ui/input';

const loginFormSchema = z.object({
    email: z.email(),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters long')
        .max(100, 'Password must be at most 100 characters long'),
    remember: z.boolean().optional(),
});
export const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const setIsLoginModalOpen = useSetAtom(loginModalAtom);
    const router = useRouter();

    const loginForm = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: '',
            remember: false,
        },
    });

    const handleSubmitLogin = async (data: z.infer<typeof loginFormSchema>) => {
        setIsLoading(true);
        try {
            const { error } = await authClient.signIn.email({
                email: data.email,
                password: data.password,
                rememberMe: data.remember,
            });

            if (error) {
                toast.error(
                    error.message ||
                        'Login failed. Please check your credentials and try again.',
                    {
                        position: 'top-center',
                        richColors: true,
                    },
                );
            } else {
                toast.success('Login successful!', {
                    position: 'top-center',
                });
                setIsLoginModalOpen(false);
                loginForm.reset();
                router.refresh();
            }
        } catch (error) {
            console.error('An unexpected error occurred:', error);
            toast.error(
                'An unexpected error occurred. Please try again later.',
                {
                    position: 'top-center',
                    richColors: true,
                },
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
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
                                    <InputPasswordSimple
                                        placeholder="Enter your password"
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
                        <FormField
                            name="remember"
                            control={loginForm.control}
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center gap-2">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                id={field.name}
                                            />
                                        </FormControl>
                                        <FormLabel
                                            className="text-muted-foreground font-normal"
                                            htmlFor={field.name}
                                        >
                                            Remember me
                                        </FormLabel>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <a
                        className="text-sm underline hover:no-underline"
                        href="#"
                    >
                        Forgot password?
                    </a>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <Loader /> : "Let's go!"}
                </Button>
            </form>
        </Form>
    );
};
