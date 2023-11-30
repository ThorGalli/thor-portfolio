import { supabase } from '@/config/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const sessionToken = req.cookies.get(
    process.env.NEXT_PUBLIC_COOKIE_NAME ?? '__Secure-next-auth.session-token',
  )

  console.log('sessionToken:', sessionToken)

  if (!sessionToken?.value) {
    console.log('sessionToken not found', sessionToken)
    return NextResponse.json({
      data: null,
      error: 'Session not found',
      status: 401,
    })
  }

  const userId = await supabase
    .from('sessions')
    .select('userId')
    .eq('sessionToken', sessionToken?.value)
    .single()

  if (!userId?.data?.userId)
    return NextResponse.json({
      data: null,
      error: 'User not found',
      status: 404,
    })

  try {
    const response = await supabase
      .from('users')
      .select('*')
      .eq('id', userId.data.userId)
      .single()
    return NextResponse.json(response)
  } catch (error) {
    console.log('error on me route:', error)
    return NextResponse.json({
      data: null,
      error,
      status: 500,
    })
  }
}
