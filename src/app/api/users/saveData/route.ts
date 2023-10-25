import { supabase } from '@/config/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const sessionToken = req.cookies.get('next-auth.session-token')
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

  if (!userId)
    return NextResponse.json({
      data: null,
      error: 'User not found',
      status: 404,
    })

  const saveData = await supabase
    .from('save_data')
    .select('*')
    .eq('user_id', userId.data?.userId)
    .single()

  return NextResponse.json(saveData)
}

export async function POST(req: NextRequest) {
  const sessionToken = req.cookies.get('next-auth.session-token')
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

  if (!userId)
    return NextResponse.json({
      data: null,
      error: 'User not found',
      status: 404,
    })

  try {
    const response = await supabase
      .from('save_data')
      .update({ clicker_state: saveData })
      .eq('user_id', userId.data?.userId)
    return NextResponse.json(response)
  } catch (error) {
    console.log(error)
  }

  return NextResponse.json({
    data: null,
    error: 'Something went wrong',
    status: 500,
  })
}
