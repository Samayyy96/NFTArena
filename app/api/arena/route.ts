import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // This will be used to proxy arena server requests
    return NextResponse.json({ status: 'Arena API ready' })
  } catch (error) {
    return NextResponse.json({ error: 'Arena API error' }, { status: 500 })
  }
} 