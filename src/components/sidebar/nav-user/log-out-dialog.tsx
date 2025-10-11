import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { handleLogOut } from '@/lib/sign-out';
import { AlertDialogCancel } from '@radix-ui/react-alert-dialog';
import { LogOutIcon, UserXIcon, XIcon } from 'lucide-react';
import { ReactNode } from 'react';

export const LogOutDialog = ({ children }: { children: ReactNode }) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                        <UserXIcon className="text-primary" />
                        Are you sure you want to log out?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        You will need to log in again to access your account and
                        all your benefits.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="gap-6">
                    <AlertDialogCancel asChild>
                        <Button variant="outline" className="group">
                            <XIcon className="size-4" />
                            Cancel
                        </Button>
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogOut}>
                        <LogOutIcon />
                        Log Out
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
