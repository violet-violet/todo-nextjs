import { useCallback, useMemo, useState } from "react"

/* COMPONENTS */
import { Box, Button, TextInput } from "grommet"

/* ICONS */
import { LinkDown } from "grommet-icons"

/* HELPERS */
import { IsNotEmptyArray, IsNumber, IsSet } from "../../helpers/ValueTests"

const AddNewTask = ({ isToggleAllDisabled, tasksLeft, onAdd, onToggleAll }) => {
    const [value, setValue] = useState("")

    const onChange = useCallback((event) => setValue(event.target.value), [])

    const onKeyDown = useCallback(
        (e) => {
            if (e.keyCode === 13 && IsSet(value)) {
                onAdd(value)
                setValue("")
            }
        },
        [value, onAdd]
    )

    const undoneCount = useMemo(
        () => (IsNumber(tasksLeft) && tasksLeft > 0 ? tasksLeft : undefined),
        [tasksLeft]
    )

    const a11yTitle = useMemo(
        () => `make ${undoneCount} tasks done`,
        [undoneCount]
    )

    return (
        <Box direction="row" gap="small">
            <Button
                icon={<LinkDown />}
                badge={undoneCount}
                disabled={isToggleAllDisabled}
                a11yTitle={a11yTitle}
                hoverIndicator
                focusIndicator
                onClick={onToggleAll}
            />

            <TextInput
                value={value}
                placeholder="What needs to be done?"
                onChange={onChange}
                onKeyDown={onKeyDown}
            />
        </Box>
    )
}

export default AddNewTask
