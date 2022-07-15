import {
    Anchor,
    Footer,
    Main,
    Page,
    PageContent,
    PageHeader,
    Paragraph,
} from "grommet"
const title = "TODOS"

const MainLayout = ({ subtitle, isNoLink, isNoHeader, children }) => (
    <Page kind="narrow">
        <PageContent height={{ min: "100vh" }}>
            {!isNoHeader && (
                <PageHeader
                    title={title}
                    subtitle={subtitle}
                    parent={
                        isNoLink ? undefined : <Anchor href="/" label="Home" />
                    }
                />
            )}

            <Main>{children}</Main>

            <Footer>
                <Paragraph>
                    <Anchor
                        href="https://github.com/violet-violet"
                        label="Made by Violet"
                    />
                </Paragraph>
            </Footer>
        </PageContent>
    </Page>
)

export default MainLayout
