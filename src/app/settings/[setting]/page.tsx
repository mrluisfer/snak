export default async function SettingsAccountPage({
    params,
}: {
    params: Promise<{ setting: string }>;
}) {
    const { setting } = await params;

    console.log(setting);
    return <p>User Page</p>;
}
