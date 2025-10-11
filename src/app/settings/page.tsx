import { redirect, RedirectType } from 'next/navigation';

export default async function SettingsPage() {
    redirect('/settings/account', RedirectType.replace);
    return null;
}
