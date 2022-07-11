import { useCallback } from "react"

/* COMPONENTS */
import { Box, Button, CheckBox, Text } from "grommet"

/* HELPERS */
import { IsNotEmptyArray } from "../../helpers/ValueTests"

/* ICONS */
import { FormTrash } from "grommet-icons"

const Task = ({ id, text, isCompleted, onTaskToggle, onDelete }) => {
    const toggleCheckbox = useCallback(() => {
        onTaskToggle(id)
    }, [id, onTaskToggle])

    const deleteTask = useCallback(() => {
        onDelete(id)
    }, [id, onDelete])

    return (
        <Box direction="row" gap="small" align="center" justify="between">
            <Box direction="row" gap="small" align="center">
                <CheckBox checked={isCompleted} onChange={toggleCheckbox} />
                <Text>{text}</Text>
            </Box>

            <Button
                a11yTitle="Delete task"
                icon={<FormTrash />}
                hoverIndicator
                onClick={deleteTask}
            />
        </Box>
    )
}

const TaskList = ({ list, ...rest }) => (
    <Box pad="xsmall" gap="small">
        {list.map((task) => (
            <Task key={task.id} {...task} {...rest} />
        ))}
    </Box>
)

export default TaskList
