import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {

    return (
        <Html lang="en-us" className="h-full">
            <Head />
            <body className="h-full bg-gray-200">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}