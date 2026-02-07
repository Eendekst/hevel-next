
'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, Loader2, Check } from 'lucide-react';
import clsx from 'clsx';

const schema = z.object({
    email: z.string().email({ message: "Invalid signal." }),
});

type FormData = z.infer<typeof schema>;

export default function NewsletterForm() {
    const [status, setStatus] = useState<'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR'>('IDLE');
    const [message, setMessage] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        setStatus('LOADING');
        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const json = await res.json();

            if (!res.ok) throw new Error(json.error || json.message);

            setStatus('SUCCESS');
            setMessage(json.message);
        } catch (err: any) {
            setStatus('ERROR');
            setMessage(err.message || 'Transmission Failed.');
        }
    };

    if (status === 'SUCCESS') {
        return (
            <div className="flex items-center space-x-2 text-green-600 font-mono text-sm">
                <Check className="w-4 h-4" />
                <span>{message}</span>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <div className="flex items-center border border-black/10 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-black transition-all bg-white">
                <input
                    {...register('email')}
                    type="email"
                    placeholder="Enter the Signal..."
                    className="w-full px-4 py-3 outline-none text-sm placeholder:text-gray-400 bg-transparent"
                    disabled={status === 'LOADING'}
                />
                <button
                    type="submit"
                    disabled={status === 'LOADING'}
                    className="px-4 py-3 hover:bg-black/5 transition-colors disabled:opacity-50"
                >
                    {status === 'LOADING' ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                </button>
            </div>
            {errors.email && (
                <p className="text-red-500 text-xs font-mono">
                    {errors.email.message}
                </p>
            )}
            {status === 'ERROR' && (
                <p className="text-red-500 text-xs font-mono">
                    {message}
                </p>
            )}
        </form>
    );
}
