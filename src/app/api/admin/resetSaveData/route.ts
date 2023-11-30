import { supabase } from '@/config/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const sessionToken = req.cookies.get(
    process.env.NEXT_PUBLIC_COOKIE_NAME ?? '__Secure-next-auth.session-token',
  )

  if (!sessionToken?.value)
    return NextResponse.json({
      data: null,
      error: 'Session not found',
      status: 401,
    })

  const { id } = await req.json()

  try {
    const response = await supabase.from('save_data').upsert({
      user_id: id,
      clicker_state: { income: 0 },
      income: 0,
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
