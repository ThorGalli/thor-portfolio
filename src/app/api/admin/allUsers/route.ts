import { supabase } from '@/config/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const sessionToken = req.cookies.get(
    process.env.NEXT_PUBLIC_COOKIE_NAME ?? '__Secure-next-auth.session-token',
  )

  if (!sessionToken?.value)
    return NextResponse.json({
      data: null,
      error: 'Session not found',
      status: 401,
    })

  const from = req.nextUrl.searchParams.get('from') ?? 0
  const to = req.nextUrl.searchParams.get('to') ?? 10

  const response = await supabase
    .from('save_data')
    .select('income, created_at, clicker_state, users (id, name, image, admin)')
    .range(+from, +to)
    .order('income', { ascending: false })

  return NextResponse.json(response)
}
