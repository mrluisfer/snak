import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { TooltipProvider } from '@/components/ui/tooltip';
import { authClient } from '@/lib/auth-client';
import { TriangleAlertIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const DeleteAccountBtn = () => {
    const router = useRouter();

    const handleDeleteAccount = async () => {
        await authClient.deleteUser({
            callbackURL: '/',
        });
        router.push('/');
    };

    return (
        <div className="mt-4 flex items-center justify-between">
            <Label>Delete your account</Label>
            <TooltipProvider>
                <AlertDialog>
                    <AlertDialogTrigger>
                        <Button variant={'destructive'} size={'sm'}>
                            Delete
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle className="flex items-center gap-2">
                                <TriangleAlertIcon className="text-primary" />
                                This action cannot be undone.
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                This will permanently delete your account and
                                remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel asChild>
                                <Button variant="outline" className="group">
                                    Cancel
                                </Button>
                            </AlertDialogCancel>
                            <AlertDialogAction asChild>
                                <Button
                                    variant="destructive"
                                    onClick={handleDeleteAccount}
                                >
                                    Yes, delete my account
                                </Button>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </TooltipProvider>
        </div>
    );
};
