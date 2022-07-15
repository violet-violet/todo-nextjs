/* COMPONENTS */
import { Anchor, Heading } from "grommet"
import Link from "next/link"
import MainLayout from "../components/MainLayout"

/* CONST */
const heading = "Yankee Go Home!"

const ErrorPage = () => (
    <MainLayout isNoHeader>
        <Heading>{heading}</Heading>

        <Link href="/">
            <Anchor label="Home" />
        </Link>
    </MainLayout>
)

export default ErrorPage
