const {crypto} = globalThis;

/**
 * Creates an array of length `size` of random bytes
 * @param size
 * @returns Array of random ints (0 to 255)
 */
function getRandomValues(size: number) {
    return crypto.getRandomValues(new Uint8Array(size));
}

/** Generate cryptographically strong random string
 * @param size The desired length of the string
 * @returns The random string
 */
function random(size: number) {
    const mask = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~';
    let result = '';
    const randomUints = getRandomValues(size);

    for (let i = 0; i < size; i++) {
        // cap the value of the randomIndex to mask.length - 1
        const randomIndex = randomUints[i] % mask.length;

        result += mask[randomIndex];
    }

    return result;
}

/** Generate a PKCE challenge verifier
 * @param length Length of the verifier
 * @returns A random verifier `length` characters long
 */
function generateVerifier(length: number): string {
    return random(length);
}

/** Generate a PKCE code challenge from a code verifier
 * @param codeVerifier
 * @returns The base64 url encoded code challenge
 */
export async function generateChallenge(codeVerifier: string) {
    const buffer = await crypto.subtle.digest(
        'SHA-256',
        new TextEncoder().encode(codeVerifier),
    );

    // Generate base64url string
    // btoa is deprecated in Node.js but is used here for web browser compatibility
    // (which has no good replacement yet, see also https://github.com/whatwg/html/issues/6811)
    return btoa(String.fromCharCode(...new Uint8Array(buffer)))
        .replace(/\//g, '_')
        .replace(/\+/g, '-')
        .replace(/=/g, '');
}

/** Generate a PKCE challenge pair
 * @param length Length of the verifer (between 43-128). Defaults to 43.
 * @returns PKCE challenge pair
 */
export default async function pkceChallenge(length?: number): Promise<{
    codeVerifier: string
    codeChallenge: string
}> {
    if (!length) {
        length = 43;
    }

    if (length < 43 || length > 128) {
        throw new Error(`Expected a length between 43 and 128. Received ${length}.`);
    }

    const verifier = generateVerifier(length);
    const challenge = await generateChallenge(verifier);

    return {
        codeVerifier: verifier,
        codeChallenge: challenge,
    };
}

/** Verify that a codeVerifier produces the expected code challenge
 * @param codeVerifier
 * @param expectedChallenge The code challenge to verify
 * @returns True if challenges are equal. False otherwise.
 */
export async function verifyChallenge(
    codeVerifier: string,
    expectedChallenge: string,
) {
    const actualChallenge = await generateChallenge(codeVerifier);

    return actualChallenge === expectedChallenge;
}
