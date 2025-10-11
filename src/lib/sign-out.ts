import { ErrorContext, RequestContext } from 'better-auth/react';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import { authClient } from './auth-client';

type HandleLogOutParams = {
    onSuccess?: () => void;
    onError?: (error: ErrorContext) => void;
    onRequest?: (request: RequestContext) => void;
};

export const handleLogOut = async (
    event?: React.MouseEvent<HTMLButtonElement>,
    params?: HandleLogOutParams,
) => {
    await authClient.signOut({
        fetchOptions: {
            onRequest: (request) => {
                if (params?.onRequest) {
                    params.onRequest(request);
                }
            },
            onSuccess: () => {
                if (params?.onSuccess) {
                    params.onSuccess();
                }
                toast.success('Logged out successfully');
                redirect('/auth/login');
            },
            onError: (error) => {
                if (params?.onError) {
                    params.onError(error);
                }
                toast.error('Failed to log out. Please try again.', {
                    description: JSON.stringify(error),
                });
            },
        },
    });
};
