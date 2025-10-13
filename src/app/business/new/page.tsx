'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { TypographyH1 } from '@/components/ui/typography-h1';
import { Providers } from '@/layout/providers';
import { SharedLayout } from '@/layout/shared-layout';
import { authClient } from '@/lib/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeftIcon, PlusIcon, RocketIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const businessFormSchema = z.object({
    name: z.string().min(2).max(100),
    description: z.string().min(10).max(500).optional(),
    address: z.string().max(200).optional(),
});

export default function BusinessNewPage() {
    const router = useRouter();
    const { data: session } = authClient.useSession();

    const newBusinessForm = useForm({
        resolver: zodResolver(businessFormSchema),
        defaultValues: {
            name: '',
            description: '',
            address: '',
        },
    });

    const handleCancel = () => {
        router.push('/business');
    };

    const handleCreateBusiness = async (
        data: z.infer<typeof businessFormSchema>,
    ) => {
        try {
            const response = await fetch('/api/business', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...data, userId: session?.user?.id }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            if (result.status !== 1) {
                throw new Error('Failed to create business');
            }

            router.push('/business');
        } catch (error) {
            console.error('Error creating business:', error);
        }
    };

    return (
        <Providers>
            <SharedLayout>
                <TypographyH1 className="flex items-baseline justify-start gap-2 font-serif">
                    <RocketIcon />
                    Create your next big business idea
                </TypographyH1>

                <Form {...newBusinessForm}>
                    <form
                        className="mt-8"
                        onSubmit={newBusinessForm.handleSubmit(
                            handleCreateBusiness,
                        )}
                    >
                        <Card className="max-w-xl">
                            <CardHeader>
                                <CardTitle>Business Information</CardTitle>
                                <CardDescription>
                                    Please provide the necessary details to
                                    create your business.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <FormField
                                    control={newBusinessForm.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Business Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="The Next Big Thing SA,CV."
                                                    type="text"
                                                    autoComplete="organization"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={newBusinessForm.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem className="mt-4">
                                            <FormLabel>
                                                Business Description
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    {...field}
                                                    placeholder="A brief description of your business."
                                                    autoComplete="organization-description"
                                                    maxLength={500}
                                                    className="h-32 max-h-44 min-h-20 resize-y"
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                {field.value &&
                                                field.value.length > 5 ? (
                                                    <>
                                                        {field.value.length}
                                                        /500
                                                    </>
                                                ) : (
                                                    <>
                                                        Add a brief description
                                                        of your business
                                                        (optional).
                                                    </>
                                                )}
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={newBusinessForm.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem className="mt-4">
                                            <FormLabel>
                                                Business Address
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="123 Business St, City, Country"
                                                    type="text"
                                                    autoComplete="street-address"
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                If you left this empty we will
                                                use your account address as your
                                                business address.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                            <CardFooter>
                                <Button
                                    variant="outline"
                                    type="button"
                                    onClick={handleCancel}
                                >
                                    <ChevronLeftIcon />
                                    Cancel
                                </Button>
                                <Button type="submit" className="ml-auto">
                                    <PlusIcon />
                                    Create Business
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </Form>
            </SharedLayout>
        </Providers>
    );
}
