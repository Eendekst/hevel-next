
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabaseClient';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY!);

const SubscriptionSchema = z.object({
    email: z.string().email(),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = SubscriptionSchema.parse(body);

        // 1. Check/Insert Supabase
        const { error: dbError } = await supabase
            .from('subscribers')
            .insert([{ email }]);

        if (dbError) {
            if (dbError.code === '23505') { // Unique constraint violation
                return NextResponse.json({ message: 'Already enlisted.' }, { status: 409 });
            }
            throw dbError;
        }

        // 2. Send Welcome Email via Resend
        await resend.emails.send({
            from: 'Jason <jason@hevel.ca>',
            to: email,
            subject: 'Welcome to the Sodality (Hevel)',
            html: `<p>Signal Received.</p><p>You are now connected to the Hevel frequency.</p><p>- Jason</p>`
        });

        return NextResponse.json({ message: 'Signal Received.' }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: 'Transmission Failed.' }, { status: 500 });
    }
}
