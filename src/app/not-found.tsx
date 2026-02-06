import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 text-center space-y-8">

            <div className="space-y-2">
                <h2 className="text-6xl font-black tracking-tighter text-red-600 animate-pulse">404</h2>
                <h1 className="text-4xl font-bold tracking-tight uppercase">Signal Lost</h1>
            </div>

            <p className="max-w-md text-gray-400 font-mono text-sm leading-relaxed">
                The protocol you are searching for does not exist or has been redacted from the public record.
            </p>

            <Link
                href="/"
                className="px-8 py-3 bg-white text-black font-bold text-sm tracking-widest uppercase hover:bg-gray-200 transition-colors"
            >
                Return to Source
            </Link>

        </div>
    )
}
