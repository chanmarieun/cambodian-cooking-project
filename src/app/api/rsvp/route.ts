import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const TO_EMAIL = process.env.CONTACT_EMAIL ?? 'chanmarie.un@gmail.com'

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const { name, email, eventSlug, eventTitle } = await request.json()

  if (!name || !email || !eventSlug) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  try {
    await resend.emails.send({
      from: 'Cambodian Cooking Collective <noreply@resend.dev>',
      to: TO_EMAIL,
      subject: `New RSVP: ${eventTitle}`,
      text: `New registration for "${eventTitle}"\n\nName: ${name}\nEmail: ${email}\nEvent: ${eventSlug}`,
    })

    await resend.emails.send({
      from: 'Cambodian Cooking Collective <noreply@resend.dev>',
      to: email,
      subject: `You're registered: ${eventTitle}`,
      text: `Hi ${name},\n\nYou're registered for "${eventTitle}". We can't wait to cook with you!\n\n— Cambodian Cooking Collective`,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('RSVP email error', err)
    return NextResponse.json({ error: 'Email failed' }, { status: 500 })
  }
}
