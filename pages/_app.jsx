import { Grommet } from "grommet"
import "../styles/globals.css"
import { theme } from "../styles/theme"

const MyApp = ({ Component, pageProps }) => (
    <Grommet theme={theme}>
        <Component {...pageProps} />
    </Grommet>
)

export default MyApp
