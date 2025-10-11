import { Card, CardContent } from '@/components/ui/card';
import { AccountForm } from './_components/account/account-form';

export default async function SettingsAccountPage({
    params,
}: {
    params: Promise<{ setting: string }>;
}) {
    const { setting } = await params;

    console.log(setting);
    return (
        <Card>
            <CardContent>
                {setting === 'account' && <AccountForm />}
            </CardContent>
        </Card>
    );
}
