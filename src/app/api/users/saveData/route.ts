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

  const response = await supabase
    .from('save_data')
    .select('*')
    .eq('user_id', userId.data.userId)
    .single()

  return NextResponse.json(response)
}

export async function POST(req: NextRequest) {
  const sessionToken = req.cookies.get(
    process.env.NEXT_PUBLIC_COOKIE_NAME ?? '__Secure-next-auth.session-token',
  )

  const saveData = await req.json()

  if (!sessionToken?.value)
    return NextResponse.json({
      data: null,
      error: 'Session not found',
      status: 401,
    })

  const userId = await supabase
    .from('sessions')
    .select('userId')
    .eq('sessionToken', sessionToken.value)
    .single()

  if (!userId?.data?.userId)
    return NextResponse.json({
      data: null,
      error: 'User not found',
      status: 404,
    })

  try {
    const response = await supabase.from('save_data').upsert({
      user_id: userId.data.userId,
      clicker_state: saveData,
      income: +saveData.income,
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
