import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { db } from '@/lib/db';

// Clé secrète pour JWT (devrait être dans les variables d'environnement)
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-for-development';

export interface AuthUser {
  id: string;
  email: string;
  role: 'ADMIN' | 'CLIENT';
  name?: string;
}

export async function verifyAuth(request: NextRequest): Promise<AuthUser | null> {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    
    // Vérifier que l'utilisateur existe dans la base de données
    const user = await db.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, role: true, name: true }
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role as 'ADMIN' | 'CLIENT',
      name: user.name || undefined
    };
  } catch (error) {
    console.error('Auth verification error:', error);
    return null;
  }
}

export function generateToken(user: AuthUser): string {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export async function requireAuth(request: NextRequest, requiredRole?: 'ADMIN' | 'CLIENT'): Promise<AuthUser> {
  const user = await verifyAuth(request);
  
  if (!user) {
    throw new Error('Unauthorized');
  }
  
  if (requiredRole && user.role !== requiredRole) {
    throw new Error('Forbidden');
  }
  
  return user;
}

// Exporter un objet auth pour compatibilité avec les imports existants
export const auth = {
  verifyAuth,
  generateToken,
  requireAuth
};