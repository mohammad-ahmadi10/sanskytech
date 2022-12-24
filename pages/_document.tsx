import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html  data-theme={"light"} lang="en-us" className={`light`}>
            <Head />
            <body className="h-full bg-gray-200 dark:bg-gray-500">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

