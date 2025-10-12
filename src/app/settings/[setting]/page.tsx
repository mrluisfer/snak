import { Card, CardContent } from '@/components/ui/card';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AccountForm } from './_components/account/account-form';

// Configuración centralizada de las rutas de settings
const SETTINGS_CONFIG = {
    account: {
        name: 'account',
        href: '/settings/account',
        component: AccountForm,
        title: 'Account Settings',
        description: 'Manage your account settings and preferences',
    },
    billing: {
        name: 'billing',
        href: '/settings/billing',
        component: () => <div>Billing Component Placeholder</div>,
        title: 'Billing Settings',
        description: 'Manage your billing information and subscriptions',
    },
    privacy: {
        name: 'privacy',
        href: '/settings/privacy',
        component: () => <div>Privacy Component Placeholder</div>,
        title: 'Privacy Settings',
        description: 'Control your privacy and data preferences',
    },
} as const;

// Type-safe settings keys
type SettingKey = keyof typeof SETTINGS_CONFIG;

// Validación más eficiente con Set (O(1) lookup)
const VALID_SETTINGS = new Set(Object.keys(SETTINGS_CONFIG));

// Función helper para validación
function isValidSetting(setting: string): setting is SettingKey {
    return VALID_SETTINGS.has(setting);
}

// Metadata dinámica
export async function generateMetadata({
    params,
}: {
    params: Promise<{ setting: string }>;
}): Promise<Metadata> {
    const { setting } = await params;

    if (!isValidSetting(setting)) {
        return {
            title: 'Settings Not Found',
        };
    }

    const config = SETTINGS_CONFIG[setting];
    return {
        title: config.title,
        description: config.description,
    };
}

// Generación estática de rutas válidas (mejor SEO y performance)
export function generateStaticParams() {
    return Object.keys(SETTINGS_CONFIG).map((setting) => ({
        setting,
    }));
}

export default async function SettingsPage({
    params,
}: {
    params: Promise<{ setting: string }>;
}) {
    const { setting } = await params;

    // Validación temprana con notFound() en lugar de redirect
    if (!isValidSetting(setting)) {
        notFound(); // Devuelve 404, más apropiado que redirect
    }

    const config = SETTINGS_CONFIG[setting];
    const SettingComponent = config.component;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    {config.title}
                </h1>
                <p className="text-muted-foreground mt-2">
                    {config.description}
                </p>
            </div>

            <Card>
                <CardContent className="pt-6">
                    <SettingComponent />
                </CardContent>
            </Card>
        </div>
    );
}
