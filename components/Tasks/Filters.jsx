import { Box, Button, Text } from "grommet"

const Filters = ({ tasksLeft }) => {
    return (
        <Box direction="row" align="center" gap="small">
            <Button label="All" primary hoverIndicator />
            <Button label="Active" hoverIndicator />
            <Button label="Completed" hoverIndicator />
        </Box>
    )
}

export default Filters
