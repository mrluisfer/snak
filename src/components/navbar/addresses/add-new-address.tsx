import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { useState } from 'react';
import { toast } from 'sonner';
import { mutate } from 'swr';

export const AddNewAddress = () => {
    const [address, setAddress] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/address-by-user-id', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ address }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data: { status: 1 | 0 } = await response.json();
            if (data.status !== 1) {
                throw new Error('Failed to save address');
            }
            toast.success('Address saved successfully!');
            setAddress('');
            // Optionally, you can trigger a re-fetch of the addresses list here
            // e.g., by using a context or a state management solution  to notify the ListAllAddresses component
            // mutate('/api/address-by-user-id'); // If using SWR in ListAllAddresses
            await mutate('/api/address-by-user-id');
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            toast.error('Failed to save address. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <>
            <Label htmlFor="new-address" className="w-fit">
                Add a new Address
            </Label>
            <div className="flex items-end justify-between gap-2">
                <Input
                    id="new-address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Main Street, City, Country"
                    type="text"
                    autoComplete="shipping street-address webauthn"
                />
                <Button
                    disabled={!address.length || isLoading}
                    onClick={handleSave}
                >
                    {isLoading ? (
                        <>
                            <Spinner />
                            Saving...
                        </>
                    ) : (
                        'Save Address'
                    )}
                </Button>
            </div>
        </>
    );
};
