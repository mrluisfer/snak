import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ReactNode } from 'react';

export const AuthContainer = ({
    title,
    description,
    children,
}: {
    title: string;
    description?: string;
    children: ReactNode;
}) => {
    return (
        <Card className="w-[500px]">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">{title}</CardTitle>
                {description?.length ? (
                    <CardDescription>{description}</CardDescription>
                ) : null}
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    );
};
