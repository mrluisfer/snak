import { addressListSpinnerAtom } from '@/atoms';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useAtomValue } from 'jotai';
import { BugIcon, RotateCcwIcon } from 'lucide-react';
import useSWR, { mutate } from 'swr';
import { AddressItem } from './address-item';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const ListAllAddresses = () => {
    // const setAddressListSpinner = useSetAtom(addressListSpinnerAtom);
    const addressListSpinner = useAtomValue(addressListSpinnerAtom);

    const { data, error, isLoading } = useSWR(
        '/api/address-by-user-id',
        fetcher,
    );

    if (isLoading)
        return (
            <div className="flex items-center justify-start gap-2">
                <Spinner />
                <p>Loading addresses...</p>
            </div>
        );

    if (error || data?.status === 0)
        return (
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center justify-start gap-2">
                    <BugIcon className="text-red-400" />
                    <p>Error loading addresses</p>
                </div>
                <Button
                    variant={'outline'}
                    onClick={() => mutate('/api/address-by-user-id')}
                >
                    <RotateCcwIcon />
                    Retry
                </Button>
            </div>
        );

    return (
        <div className="space-y-2">
            <h3>All Addresses</h3>
            <ul className="relative space-y-2">
                {addressListSpinner ? (
                    <li className="hover:bg-accent/50 bg-accent/70 absolute inset-0 flex cursor-wait items-center justify-center rounded-lg transition-all">
                        <Spinner />
                    </li>
                ) : null}
                {data.addresses.length === 0 && <li>No addresses found.</li>}
                {data.addresses.map((addr: { id: string; address: string }) => (
                    <AddressItem key={addr.id} addr={addr} />
                ))}
            </ul>
        </div>
    );
};
