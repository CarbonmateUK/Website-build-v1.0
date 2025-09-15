/**
 * User management utilities for NextAuth
 * Handles user authentication and validation
 */

import bcrypt from 'bcryptjs';
import { User } from './types';

/**
 * Parse users from environment variable
 * Expected format: JSON array of user objects
 */
export function getUsers(): User[] {
  const usersJson = process.env.USERS_JSON;
  if (!usersJson) {
    throw new Error('USERS_JSON environment variable is required');
  }
  
  try {
    return JSON.parse(usersJson);
  } catch {
    throw new Error('Invalid USERS_JSON format. Expected valid JSON array.');
  }
}

/**
 * Find user by username
 */
export function findUserByUsername(username: string): User | null {
  const users = getUsers();
  return users.find(user => user.username === username) || null;
}

/**
 * Find user by ID
 */
export function findUserById(id: string): User | null {
  const users = getUsers();
  return users.find(user => user.id === id) || null;
}

/**
 * Verify user password
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Hash password for storage
 * Use this utility to generate password hashes for USERS_JSON
 */
export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

/**
 * Validate user credentials
 */
export async function validateCredentials(username: string, password: string): Promise<User | null> {
  const user = findUserByUsername(username);
  if (!user) {
    return null;
  }
  
  const isValid = await verifyPassword(password, user.passwordHash);
  return isValid ? user : null;
}

/**
 * Generate sample user data for development
 * Run this in a Node.js script to generate USERS_JSON
 */
export function generateSampleUsers(): void {
  const sampleUsers = [
    {
      id: 'demo-user-1',
      username: 'demo',
      passwordHash: hashPassword('DemoPassword123'),
      role: 'customer' as const
    },
    {
      id: 'admin-user-1', 
      username: 'admin',
      passwordHash: hashPassword('AdminPassword123'),
      role: 'admin' as const
    }
  ];
  
  console.log('Sample USERS_JSON:');
  console.log(JSON.stringify(sampleUsers, null, 2));
}
