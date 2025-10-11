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
import { zodResolver } from '@hookform/resolvers/zod';
import { ExternalLinkIcon, MailIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { AuthContainer } from '../auth-container';
import InputPassword from '../input-password';

const loginFormSchema = z.object({
    email: z.email('Invalid email address'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(6, 'Password must be at least 6 characters'),
    name: z.string(),
    rememberMe: z.boolean().optional(),
});

export const LoginForm = () => {
    const form = useForm({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: '',
            name: '',
            rememberMe: false,
        },
    });

    const onSubmit = (values: z.infer<typeof loginFormSchema>) => {
        console.log(values);
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
                        name="name"
                        render={({ field }) => (
                            <FormItem className="*:not-first:mt-2">
                                <FormLabel>Username</FormLabel>
                                <div className="relative">
                                    <FormControl>
                                        <Input
                                            className="peer pe-9 capitalize"
                                            placeholder="Jhon Doe"
                                            type="text"
                                            autoCapitalize="words"
                                            {...field}
                                        />
                                    </FormControl>
                                    <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
                                        <UserIcon
                                            size={16}
                                            aria-hidden="true"
                                        />
                                    </div>
                                </div>
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
                        Log In
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
