import { supabase } from '@/config/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const _unused = req?.url?.charAt(0)
  try {
    const response = await supabase
      .from('save_data')
      .select('income, users (name)')
      .order('income', { ascending: false })
      .limit(10)
    return NextResponse.json(response)
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      data: null,
      error: "Couldn't get leaderboards",
      status: 500,
    })
  }
}
