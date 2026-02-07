
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getSupabase } from '@/lib/supabaseClient';
import { z } from 'zod';

export const dynamic = 'force-dynamic'; // Prevent static pre-rendering

const SubscriptionSchema = z.object({
    email: z.string().email(),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = SubscriptionSchema.parse(body);

        // 1. Check/Insert Supabase
        const supabase = getSupabase(); // Initialize at runtime
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
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
            from: 'Jason <jason@hevel.ca>',
            to: email,
            subject: 'Signal Established (Hevel)',
            html: `
                <div style="font-family: monospace; color: #000;">
                    <h1>Signal Established.</h1>
                    <p>You have successfully connected to the Hevel frequency.</p>
                    <p>This is not a newsletter. It is a signal.</p>
                    <p>Expect low-frequency, high-value transmissions regarding:</p>
                    <ul>
                        <li>The Digital Ghost Protocol</li>
                        <li>System Updates</li>
                        <li>New Equipment</li>
                    </ul>
                    <p>You are now part of the network.</p>
                    <br/>
                    <p>Stand by.</p>
                    <p>- Jason</p>
                </div>
            `
        });

        return NextResponse.json({ message: 'Signal Received.' }, { status: 200 });

    } catch (error: any) {
        console.error('SERVER ERROR:', error);
        return NextResponse.json(
            { message: 'Transmission Failed.', error: error.message },
            { status: 500 }
        );
    }
}
