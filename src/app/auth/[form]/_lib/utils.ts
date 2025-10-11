import { renderAuthFormKeys } from '../_constants/render-auth-form-keys';

// Type-safe auth mode
export type AuthMode = keyof typeof renderAuthFormKeys;

// Create a reverse lookup map for O(1) performance
const authKeyMap = new Map<string, AuthMode>(
    (
        Object.entries(renderAuthFormKeys) as [AuthMode, readonly string[]][]
    ).flatMap(([mode, keys]) =>
        keys.map((key) => [key.toLowerCase(), mode] as const),
    ),
);

/**
 * Converts an authentication key string to its corresponding auth mode.
 *
 * @param key - The authentication key to lookup (case-insensitive)
 * @returns The auth mode ('login' or 'signup'), or null if not found
 *
 * @example
 * getAuthModeFromKey('iniciar-sesion') // returns 'login'
 * getAuthModeFromKey('REGISTER')       // returns 'signup'
 * getAuthModeFromKey('invalid')        // returns null
 */
export function getAuthModeFromKey(key: string): AuthMode | null {
    if (!key || typeof key !== 'string') return null;

    const normalizedKey = key.toLowerCase().trim();
    return authKeyMap.get(normalizedKey) ?? null;
}

// Optional: Helper to check if a key is valid
export function isValidAuthKey(key: string): boolean {
    return getAuthModeFromKey(key) !== null;
}

// Optional: Get all valid keys for a specific mode
export function getKeysForAuthMode(mode: AuthMode): readonly string[] {
    return renderAuthFormKeys[mode];
}
