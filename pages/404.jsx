import Link from "next/link"

const ErrorPage = () => (
    <>
        <h1>404</h1>
        <p>
            <Link href="/">
                <a>Home</a>
            </Link>
        </p>
    </>
)

export default ErrorPage
