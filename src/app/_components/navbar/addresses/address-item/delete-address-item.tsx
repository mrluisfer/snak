import { addressListSpinnerAtom } from '@/atoms';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useSetAtom } from 'jotai';
import { TrashIcon } from 'lucide-react';
import { toast } from 'sonner';
import { mutate } from 'swr';

export const DeleteAddressItem = ({ id }: { id: string }) => {
    const setAddressListSpinner = useSetAtom(addressListSpinnerAtom);

    const handleDeleteAddress = async () => {
        try {
            setAddressListSpinner(true);
            const response = await fetch(`/api/delete-address/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data: { status: 1 | 0 } = await response.json();
            if (data.status !== 1) {
                throw new Error('Failed to delete address');
            }
            toast.success('Address deleted successfully!');
            // Optionally, you can trigger a re-fetch of the addresses list here
            // e.g., by using a context or a state management solution to notify the ListAllAddresses component
            // mutate('/api/address-by-user-id'); // If using SWR in ListAllAddresses
            mutate('/api/address-by-user-id');
            setAddressListSpinner(false);
        } catch (error) {
            console.error('Error deleting address:', error);
            toast.error('Failed to delete address. Please try again.');
            setAddressListSpinner(false);
        }
    };

    return (
        <DropdownMenuItem variant="destructive" onClick={handleDeleteAddress}>
            <TrashIcon className="mr-2 size-4" />
            Delete Address
        </DropdownMenuItem>
    );
};
