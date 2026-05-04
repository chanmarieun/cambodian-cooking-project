import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const TO_EMAIL = process.env.CONTACT_EMAIL ?? 'chanmarie.un@gmail.com'

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const { name, email, question } = await request.json()

  if (!name || !email || !question) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  try {
    await resend.emails.send({
      from: 'Cambodian Cooking Collective <noreply@resend.dev>',
      to: TO_EMAIL,
      subject: `New question from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nQuestion:\n${question}`,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Ask email error', err)
    return NextResponse.json({ error: 'Email failed' }, { status: 500 })
  }
}
