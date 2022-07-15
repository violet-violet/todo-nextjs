import { useContext } from "react"

/* COMPONENTS */
import {
    Anchor,
    Box,
    Button,
    Footer,
    Main,
    Menu,
    Page,
    PageContent,
    PageHeader,
    Paragraph,
    ResponsiveContext,
} from "grommet"
import { More } from "grommet-icons"
import Link from "next/link"

/* CONST */
const title = "TODOS"

const actions = [
    {
        label: "Movies",
        secondary: true,
        href: "/to-watch",
    },
    {
        label: "Shop",
        secondary: true,
        href: "to-buy",
    },
]

const controls = {
    small: (
        <Menu
            dropAlign={{ top: "bottom", right: "right" }}
            items={actions.map((action) => ({
                label: action.label,
                href: action.href,
            }))}
            icon={<More />}
        />
    ),
    medium: actions.map((action, index) => (
        <Link key={index} href={action.href}>
            <Button {...action} />
        </Link>
    )),
    large: actions.map((action, index) => (
        <Link key={index} href={action.href}>
            <Button {...action} />
        </Link>
    )),
}

const MainLayout = ({ subtitle, isNoLink, isNoHeader, children }) => {
    const size = useContext(ResponsiveContext)

    return (
        <Page kind="narrow">
            <PageContent height={{ min: "100vh" }}>
                {!isNoHeader && (
                    <PageHeader
                        title={title}
                        subtitle={subtitle}
                        parent={
                            isNoLink ? undefined : (
                                <Link href="/">
                                    <Anchor href="/" label="Home" />
                                </Link>
                            )
                        }
                        actions={
                            <Box direction="row" gap="small" align="center">
                                {controls[size]}
                            </Box>
                        }
                    />
                )}

                <Main>{children}</Main>

                <Footer>
                    <Paragraph>
                        <Link href="https://github.com/violet-violet">
                            <Anchor
                                href="https://github.com/violet-violet"
                                label="Made by Violet"
                            />
                        </Link>
                    </Paragraph>
                </Footer>
            </PageContent>
        </Page>
    )
}

export default MainLayout
