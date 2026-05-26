const ALGORITHM = "AES-GCM";
const KEY_LENGTH = 256;

async function getKey(): Promise<CryptoKey> {
  const rawKey = process.env.ENCRYPTION_KEY!;
  const keyBuffer = Buffer.from(rawKey, "hex");
  return crypto.subtle.importKey("raw", keyBuffer, { name: ALGORITHM, length: KEY_LENGTH }, false, ["encrypt", "decrypt"]);
}

export async function encrypt(text: string): Promise<string> {
  const key = await getKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(text);
  const ciphertext = await crypto.subtle.encrypt({ name: ALGORITHM, iv }, key, encoded);
  const result = Buffer.concat([Buffer.from(iv), Buffer.from(ciphertext)]);
  return result.toString("base64");
}

export async function decrypt(data: string): Promise<string> {
  const key = await getKey();
  const buffer = Buffer.from(data, "base64");
  const iv = buffer.subarray(0, 12);
  const ciphertext = buffer.subarray(12);
  const decrypted = await crypto.subtle.decrypt({ name: ALGORITHM, iv }, key, ciphertext);
  return new TextDecoder().decode(decrypted);
}
