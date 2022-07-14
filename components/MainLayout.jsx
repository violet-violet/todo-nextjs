import { Anchor, Footer, Main, Page, PageContent, PageHeader } from "grommet"

const MainLayout = ({ title, subtitle, link = "/", children }) => {
    return (
        <Page kind="narrow">
            <PageContent height={{ min: "100vh" }}>
                <PageHeader
                    title={title}
                    subtitle={subtitle}
                    parent={<Anchor href={link} label="Home" />}
                />

                <Main>{children}</Main>

                <Footer>Made by Violet</Footer>
            </PageContent>
        </Page>
    )
}

export default MainLayout
