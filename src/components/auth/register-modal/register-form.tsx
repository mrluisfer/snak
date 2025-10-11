import { signupModalAtom } from '@/atoms';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { InputPassword } from '@/components/ui/input-password';
import { InputPasswordSimple } from '@/components/ui/input-password-simple';
import { Loader } from '@/components/ui/shadcn-io/ai/loader';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useSetAtom } from 'jotai';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Input } from '../../ui/input';

const signupFormSchema = z
    .object({
        name: z
            .string()
            .min(2, 'Name must be at least 2 characters long')
            .max(100, 'Name must be at most 100 characters long'),
        email: z.email(),
        password: z
            .string()
            .min(6, 'Password must be at least 6 characters long')
            .max(100, 'Password must be at most 100 characters long'),
        password_confirmation: z
            .string()
            .min(6, 'Confirm Password must be at least 6 characters long')
            .max(100, 'Confirm Password must be at most 100 characters long'),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "Passwords don't match",
    });

export const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const setIsOpen = useSetAtom(signupModalAtom);

    const signupForm = useForm<z.infer<typeof signupFormSchema>>({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        },
    });

    const handleSubmitSignup = async (
        data: z.infer<typeof signupFormSchema>,
    ) => {
        setIsLoading(true);
        try {
            router.post('/register', data, {
                onSuccess: () => {
                    toast.success('Account created successfully!', {
                        position: 'top-center',
                        richColors: true,
                    });
                    setIsOpen(false);
                },
                onError: (errors) => {
                    if (errors.email) {
                        toast.error(errors.email, {
                            position: 'top-center',
                            richColors: true,
                        });
                    } else if (errors.password) {
                        toast.error(errors.password, {
                            position: 'top-center',
                            richColors: true,
                        });
                    } else {
                        toast.error(
                            'Registration failed. Please check your details and try again.',
                            {
                                position: 'top-center',
                                richColors: true,
                            },
                        );
                    }
                },
                onFinish: () => setIsLoading(false),
            });
            setIsLoading(false);
            signupForm.reset();
        } catch (error) {
            console.error('Catch error', error);
            setIsLoading(false);
        }
    };

    return (
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
                                    <InputPassword {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="password_confirmation"
                        control={signupForm.control}
                        render={({ field }) => (
                            <FormItem className="*:not-first:mt-2">
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <InputPasswordSimple {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <Loader /> : 'Sign up'}
                </Button>
            </form>
        </Form>
    );
};
