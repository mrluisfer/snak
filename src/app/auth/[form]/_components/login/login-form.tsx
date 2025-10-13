'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@/lib/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { ExternalLinkIcon, MailIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { AuthContainer } from '../auth-container';
import InputPassword from '../input-password';

const loginFormSchema = z.object({
    email: z.email('Invalid email address'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(6, 'Password must be at least 6 characters'),
    rememberMe: z.boolean().optional(),
});

export const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
    });

    const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
        await authClient.signIn.email(
            {
                email: values.email,
                password: values.password,
                callbackURL: '/',
                rememberMe: values.rememberMe || false,
            },
            {
                onRequest: () => {
                    //show loading
                    setIsLoading(true);
                },
                onSuccess: () => {
                    //redirect to the dashboard or sign in page
                    setIsLoading(false);
                    router.push('/');
                    router.refresh();
                },
                onError: (ctx) => {
                    setIsLoading(false);
                    // display the error message
                    toast.error('Error logging in', {
                        description: ctx.error.message,
                        richColors: true,
                    });
                },
            },
        );
    };

    return (
        <AuthContainer
            title="Login to your account"
            description="Welcome back!"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="*:not-first:mt-2">
                                <FormLabel>Email</FormLabel>
                                <div className="relative">
                                    <FormControl>
                                        <Input
                                            className="peer pe-9"
                                            placeholder="jhon@example.com"
                                            type="email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
                                        <MailIcon
                                            size={16}
                                            aria-hidden="true"
                                        />
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="*:not-first:mt-2">
                                <div className="flex items-center justify-between">
                                    <FormLabel>Password</FormLabel>
                                    <Link
                                        href={'/auth/forgot-password'}
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <FormControl>
                                    <InputPassword {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="rememberMe"
                        render={({ field }) => (
                            <FormItem className="flex items-center gap-3">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel>Remember me?</FormLabel>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="btn-primary btn w-full">
                        {isLoading ? (
                            <>
                                <Spinner />
                                Logging in...
                            </>
                        ) : (
                            'Log In'
                        )}
                    </Button>
                </form>
            </Form>
            <Button asChild variant={'secondary'} className="mt-6 w-full">
                <Link href={'/auth/sign-up'}>
                    Don&apos;t have an account? Sign Up
                    <ExternalLinkIcon />
                </Link>
            </Button>
        </AuthContainer>
    );
};
