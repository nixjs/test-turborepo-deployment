import Link from 'next/link'
import React from 'react'

export default function Custom404() {
    return (
        <div className="text-center pt-32 pb-32">
            <h1>404 - Page Not Found</h1>
            <Link href={'/'}>Home</Link>
        </div>
    )
}
