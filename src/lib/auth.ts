import { cookies } from 'next/headers';

export type UserRole = 'user' | 'admin' | null;

export interface Session {
  role: UserRole;
  isAuthenticated: boolean;
}

export async function getSession(): Promise<Session> {
  const cookieStore = await cookies();
  const authSession = cookieStore.get('auth_session');

  if (!authSession) {
    return { role: null, isAuthenticated: false };
  }

  const role = authSession.value as UserRole;
  
  return {
    role,
    isAuthenticated: !!role,
  };
}

export async function isAdmin(): Promise<boolean> {
  const session = await getSession();
  return session.role === 'admin';
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('auth_session');
}
