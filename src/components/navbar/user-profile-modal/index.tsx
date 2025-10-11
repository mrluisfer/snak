import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { getInitials } from '@/lib/get-initials';
import type { ApiUser } from '@/types/api/api-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const userProfileSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
});

export const UserProfileModal = ({ user }: { user: ApiUser }) => {
    const [isOpen, setIsOpen] = useState(false);

    const userProfileForm = useForm<z.infer<typeof userProfileSchema>>({
        resolver: zodResolver(userProfileSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
        },
    });

    const handleSubmit = (data: z.infer<typeof userProfileSchema>) => {
        try {
            router.put('/api/users/' + user.id, data, {
                onSuccess: () => {
                    toast.success('Profile updated successfully!', {
                        richColors: true,
                    });
                    userProfileForm.reset(data);
                    setIsOpen(false);
                },
                onError: () => {
                    toast.error('Failed to update profile. Please try again.', {
                        richColors: true,
                    });
                },
            });
        } catch (error) {
            console.error('Failed to update user profile:', error);
            toast.error('Failed to update profile. Please try again.', {
                richColors: true,
            });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger type="button">
                <Avatar className="size-10 cursor-pointer transition hover:brightness-75">
                    <AvatarFallback>
                        {getInitials(user?.name ?? '')}
                    </AvatarFallback>
                </Avatar>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>User Profile</DialogTitle>
                    <DialogDescription>
                        You can log out or manage your profile here.
                    </DialogDescription>
                </DialogHeader>
                <Form {...userProfileForm}>
                    <form
                        onSubmit={userProfileForm.handleSubmit(handleSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            name="name"
                            control={userProfileForm.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Name"
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
                            control={userProfileForm.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Email"
                                            type="email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="flex flex-1 items-center sm:justify-between">
                            <Button variant="ghost" asChild>
                                <Link href="/logout" method="post" as="button">
                                    Log out
                                </Link>
                            </Button>
                            <div className="space-x-4">
                                <DialogClose
                                    asChild
                                    type="button"
                                    onClick={() => {
                                        userProfileForm.reset();
                                    }}
                                >
                                    <Button variant="secondary">Close</Button>
                                </DialogClose>
                                <Button type="submit">Save Changes</Button>
                            </div>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
