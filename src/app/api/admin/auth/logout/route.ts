import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    // Get token from cookie
    const token = request.cookies.get('admin-token')?.value

    if (token) {
      // Delete session from database
      await db.session.deleteMany({
        where: { token }
      })
    }

    // Create response and delete cookie
    const response = NextResponse.json({
      success: true,
      message: 'Déconnexion réussie'
    })

    response.cookies.delete('admin-token')

    return response

  } catch (error) {
    console.error('Logout error:', error)
    
    // Still try to delete cookie even if there's an error
    const response = NextResponse.json({
      success: true,
      message: 'Déconnexion réussie'
    })
    
    response.cookies.delete('admin-token')
    
    return response
  }
}