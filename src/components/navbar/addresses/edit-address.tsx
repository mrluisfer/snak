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
import { zodResolver } from '@hookform/resolvers/zod';
import { SaveIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';
import * as z from 'zod';

const editAddressSchema = z.object({
    address: z.string().min(5).max(100),
});

export const EditAddress = ({
    address,
    setIsEditing,
}: {
    address: {
        id: string;
        address: string;
        userId?: string;
    };
    setIsEditing: (isEditing: boolean) => void;
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(editAddressSchema),
        defaultValues: {
            address: address.address,
        },
    });

    const handleSave = async (data: z.infer<typeof editAddressSchema>) => {
        setIsLoading(true);
        const response = await fetch(
            `/api/address-by-user-id?id=${address.id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ address: data.address }),
            },
        );
        if (!response.ok) {
            console.error('Failed to update address');
            setIsLoading(false);
            return;
        }
        const resData: { status: 1 | 0 } = await response.json();
        if (resData.status !== 1) {
            console.error('Failed to update address');
            setIsLoading(false);
            return;
        }
        setIsLoading(false);
        setIsEditing(false);
        // Optionally, you can trigger a re-fetch of the addresses list here
        // e.g., by using a context or a state management solution to notify the ListAllAddresses component
        // mutate('/api/address-by-user-id'); // If using SWR in ListAllAddresses
        mutate('/api/address-by-user-id');
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    return (
        <div className="flex w-full items-center justify-between gap-2">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSave)}
                    className="flex w-full flex-1 items-center justify-between"
                >
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem className="relative flex-1">
                                <Button
                                    onClick={handleCancel}
                                    variant="ghost"
                                    size={'icon-sm'}
                                    className="absolute right-0 top-1/2 mr-1 -translate-y-1/2"
                                    type="button"
                                    tabIndex={-1}
                                >
                                    <XIcon />
                                </Button>
                                <FormLabel
                                    htmlFor={field.name}
                                    className="sr-only"
                                >
                                    Address
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        disabled={isLoading}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        disabled={
                            !form.formState.isDirty ||
                            !form.formState.isValid ||
                            isLoading
                        }
                        className="ml-2"
                    >
                        {isLoading ? (
                            <>
                                <Spinner />
                                Saving...
                            </>
                        ) : (
                            <>
                                <SaveIcon />
                                Save
                            </>
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
};
