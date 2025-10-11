'use client';
import { Button } from '@/components/ui/button';
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
import { ExternalLinkIcon, MailIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { AuthContainer } from '../auth-container';
import InputPassword from '../input-password';

const signUpFormSchema = z.object({
    email: z.email(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    name: z.string().min(1, 'Name is required'),
});

export const SignUpForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {
            email: '',
            password: '',
            name: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof signUpFormSchema>) => {
        console.log(values);

        const { data, error } = await authClient.signUp.email(
            {
                email: values.email,
                password: values.password,
                name: values.name,
                callbackURL: '/',
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
                    toast.error('Error signing up', {
                        description: ctx.error.message,
                        richColors: true,
                    });
                },
            },
        );

        console.log({ data, error });
    };

    return (
        <AuthContainer
            title="Create an account"
            description="Start your journey with us"
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
                                <FormLabel>Password</FormLabel>
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
                    <Button
                        type="submit"
                        className="btn-primary btn w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Spinner />
                                Creating account...
                            </>
                        ) : (
                            'Sign Up'
                        )}
                    </Button>
                </form>
            </Form>
            <Button asChild variant={'secondary'} className="mt-6 w-full">
                <Link href={'/auth/login'}>
                    Already have an account? Sign In
                    <ExternalLinkIcon />
                </Link>
            </Button>
        </AuthContainer>
    );
};
