'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@/lib/auth-client';
import { getInitials } from '@/lib/get-initials';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { DeleteAccountBtn } from './delete-account-btn';
import { LogOutBtn } from './log-out-btn';

const accountFormSchema = z.object({
    username: z.string().min(3).max(20).optional(),
    email: z.email().optional(),
});

export const AccountForm = () => {
    const { data, error, isPending } = authClient.useSession();

    const form = useForm({
        resolver: zodResolver(accountFormSchema),
        defaultValues: {
            username: data?.user.name,
            email: data?.user.email,
        },
    });

    const handleSubmit = async (data: z.infer<typeof accountFormSchema>) => {
        console.log(data);
        await authClient.updateUser({
            name: data.username,
        });
    };

    if (error) {
        return <div>Error loading user data</div>;
    }

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-6"
                >
                    <div className="flex items-end gap-4">
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage
                                src={
                                    data?.user.image ||
                                    '/default-user-profile.png'
                                }
                                alt={data?.user.name || 'User'}
                            />
                            <AvatarFallback className="rounded-lg">
                                {getInitials(data?.user.name || '')}
                            </AvatarFallback>
                        </Avatar>
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            autoComplete="off"
                                            placeholder={
                                                data?.user.name || field.value
                                            }
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="email"
                        disabled
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled
                                        autoComplete="on"
                                        type="email"
                                        value={data?.user.email || field.value}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        disabled={
                            isPending ||
                            !form.formState.isDirty ||
                            !form.formState.isValid
                        }
                    >
                        {isPending ? (
                            <>
                                <Spinner />
                                Loading...
                            </>
                        ) : (
                            'Save changes'
                        )}
                    </Button>
                </form>
            </Form>
            <LogOutBtn />
            <DeleteAccountBtn />
        </>
    );
};
