import { useCallback } from "react"

/* COMPONENTS */
import { Box, Button, Text } from "grommet"

/* CONST */
import { ACTIVE_TASKS, ALL_TASKS, DONE_TASKS } from "."

const Filters = ({ filter, onFilter }) => {
    const filterAll = useCallback(() => {
        onFilter(ALL_TASKS)
    }, [onFilter])

    const filterActive = useCallback(() => {
        onFilter(ACTIVE_TASKS)
    }, [onFilter])

    const filterDone = useCallback(() => {
        onFilter(DONE_TASKS)
    }, [onFilter])

    return (
        <Box direction="row" align="center" gap="small">
            <Button
                label="All"
                primary={filter === ALL_TASKS}
                hoverIndicator
                onClick={filterAll}
            />
            <Button
                label="Active"
                primary={filter === ACTIVE_TASKS}
                hoverIndicator
                onClick={filterActive}
            />
            <Button
                label="Completed"
                primary={filter === DONE_TASKS}
                hoverIndicator
                onClick={filterDone}
            />
        </Box>
    )
}

export default Filters
