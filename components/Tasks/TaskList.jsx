import { useCallback, useState } from "react"

/* COMPONENTS */
import { Box, Button, CheckBox, Paragraph, TextInput } from "grommet"

/* HELPERS */
import { IsSet } from "../../helpers/ValueTests"

/* UI */
import { FormTrash } from "grommet-icons"
import UiTask from "./ui/UiTask"

const Task = (props) => {
    const { id, text, isCompleted, onTaskToggle, onDelete, onTextUpdate } =
        props

    const [label, setLabel] = useState({
        isEditable: false,
        text: "",
    })

    const toggleCheckbox = useCallback(() => {
        onTaskToggle(id)
    }, [id, onTaskToggle])

    const deleteTask = useCallback(() => {
        onDelete(id)
    }, [id, onDelete])

    const startEdit = useCallback(
        (e) => {
            if (e.detail === 2) {
                setLabel((_l) => ({ ..._l, isEditable: true, text }))
            }
        },
        [text]
    )

    const onLabelChange = useCallback((e) => {
        setLabel((_l) => ({ ..._l, text: e.target.value }))
    }, [])

    const finishEdit = useCallback(() => {
        onTextUpdate(id, label.text)
        setLabel((_l) => ({ ..._l, isEditable: false, text: "" }))
    }, [id, label, onTextUpdate])

    const onKeyDown = useCallback(
        (e) => {
            if (e.keyCode === 13 && IsSet(label.text)) {
                finishEdit()
            }
        },
        [label.text, finishEdit]
    )

    return (
        <Box direction="row" gap="small" align="center" justify="between">
            <Box direction="row" gap="small" align="center" width="100%">
                <CheckBox checked={isCompleted} onChange={toggleCheckbox} />

                {!label.isEditable && (
                    <UiTask onClick={startEdit}>{text}</UiTask>
                )}

                {label.isEditable && (
                    <TextInput
                        value={label.text}
                        onChange={onLabelChange}
                        onBlur={finishEdit}
                        onKeyDown={onKeyDown}
                        placeholder="Type at least one symbol"
                    />
                )}
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

const TaskList = ({ list, ...rest }) => {
    if (list.length === 0) {
        return (
            <Box>
                <Paragraph>No tasks</Paragraph>
            </Box>
        )
    }

    return (
        <Box pad="xsmall" gap="small">
            {list.map((task) => (
                <Task key={task.id} {...task} {...rest} />
            ))}
        </Box>
    )
}

export default TaskList
