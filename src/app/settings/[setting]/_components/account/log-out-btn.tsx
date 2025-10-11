import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { handleLogOut } from '@/lib/sign-out';
import { useState } from 'react';

export const LogOutBtn = () => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="mt-4 flex items-center justify-between">
            <Label>Log out of all devices</Label>
            <Button
                variant={'secondary'}
                onClick={(event) => {
                    handleLogOut(event, {
                        onRequest: () => setIsLoading(true),
                        onSuccess: () => setIsLoading(false),
                        onError: () => setIsLoading(false),
                    });
                }}
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <Spinner />
                        Logging out...
                    </>
                ) : (
                    'Log out'
                )}
            </Button>
        </div>
    );
};
