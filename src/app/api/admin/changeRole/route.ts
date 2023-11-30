import { supabase } from '@/config/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const sessionToken = req.cookies.get(
    process.env.NEXT_PUBLIC_COOKIE_NAME ?? '__Secure-next-auth.session-token',
  )

  const { id, newRole } = await req.json()

  if (!sessionToken?.value)
    return NextResponse.json({
      data: null,
      error: 'Session not found',
      status: 401,
    })

  try {
    const response = await supabase.from('users').upsert({
      id,
      admin: newRole,
    })
    return NextResponse.json(response)
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      data: null,
      error: 'Something went wrong',
      status: 500,
    })
  }
}
