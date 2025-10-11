import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useUser } from '@/hooks/use-user';
import type { ApiAddress } from '@/types/api/api-types';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { MapPinHouseIcon, SaveIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const addressFormSchema = z.object({
    addressId: z.string(),
});

export const Addresses = () => {
    const [addresses, setAddresses] = useState<Array<ApiAddress>>([]);
    const [selected, setSelected] = useState<string | undefined>(undefined);

    const user = useUser();

    const form = useForm<z.infer<typeof addressFormSchema>>({
        resolver: zodResolver(addressFormSchema),
        defaultValues: {
            addressId:
                user?.id_last_address?.toString() ||
                addresses[0]?.id?.toString(),
        },
    });

    const handleSubmitAddress = async (
        data: z.infer<typeof addressFormSchema>,
    ) => {
        const addrId = parseInt(data.addressId);
        if (typeof addrId !== 'number' || isNaN(addrId)) {
            return toast.error('Invalid address selected', {
                richColors: true,
            });
        }
        console.log('Updating last address to:', addrId);
    };

    useEffect(() => {
        (async () => {
            if (!user || !user?.id) return;

            const { data, status } = await axios.get(
                `/api/v1/addresses/${user.id}`,
                { withCredentials: true },
            );
            if (status !== 200)
                return toast.error('Failed to fetch addresses', {
                    richColors: true,
                });
            setAddresses(data);
        })();
    }, []);

    // cuando llegan direcciones, setear la primera como seleccionada si no hay una
    useEffect(() => {
        if (addresses.length && !selected) setSelected(String(addresses[0].id));
    }, [addresses, selected]);

    if (!user || !user?.id) return null;

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmitAddress)}
                className="flex items-center gap-2"
            >
                <FormField
                    name="addressId"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <div className="*:not-first:mt-2">
                                <Select
                                    onValueChange={(value) => {
                                        field.onChange(value);
                                        setSelected(value);
                                    }}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="relative w-[250px] ps-9">
                                            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 text-muted-foreground/80">
                                                <MapPinHouseIcon
                                                    size={16}
                                                    aria-hidden="true"
                                                />
                                            </div>
                                            <SelectValue placeholder="Select address" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {addresses.map((a) => (
                                            <SelectItem
                                                key={a.id}
                                                value={String(a.id)}
                                            >
                                                {a.street}, {a.city}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </FormItem>
                    )}
                />
                {selected === user.id_last_address?.toString() ? null : (
                    <Button type="submit" size={'icon-sm'}>
                        <SaveIcon />
                    </Button>
                )}
            </form>
        </Form>
    );
};
