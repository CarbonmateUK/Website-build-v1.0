import { z } from "zod";

const UserSchema = z.object({
  id: z.string(),
  username: z.string().min(1),
  passwordHash: z.string().min(10),
  role: z.enum(["admin", "customer"]).default("customer"),
});

export type AppUser = z.infer<typeof UserSchema>;

/**
 * Parses USERS_JSON environment variable into a list of users.
 * USERS_JSON should be a JSON array of { id, username, passwordHash, role }.
 */
export function getAllUsers(): AppUser[] {
  const json = process.env.USERS_JSON;
  if (!json) return [];
  try {
    const parsed = JSON.parse(json);
    const users = z.array(UserSchema).parse(parsed);
    // Deduplicate by username (last one wins)
    const map = new Map<string, AppUser>();
    for (const user of users) map.set(user.username.toLowerCase(), user);
    return Array.from(map.values());
  } catch (err) {
    console.error("Invalid USERS_JSON:", err);
    return [];
  }
}

export function getUserByUsername(username: string): AppUser | undefined {
  const users = getAllUsers();
  const key = username.toLowerCase();
  return users.find((u) => u.username.toLowerCase() === key);
}

