import { useCallback, useMemo, useState } from "react"
import { v4 as uuidv4 } from "uuid"

/* COMPONENTS */
import AddNewTask from "./AddNewTask"
import TaskList from "./TaskList"
import Filters from "./Filters"
import { Box } from "grommet"

/* HELPERS */
import { IsNotEmptyArray } from "../../helpers/ValueTests"

const Tasks = ({ defaultList }) => {
    const defaultState = useMemo(
        () => (IsNotEmptyArray(defaultList) ? defaultList : []),
        [defaultList]
    )

    const [tasks, setTasks] = useState(defaultState)

    const addTask = useCallback((text) => {
        const newTask = {
            id: uuidv4(),
            text,
            isCompleted: false,
        }

        setTasks((_s) => [..._s, newTask])
    }, [])

    const toggleTask = useCallback((id) => {
        setTasks((_s) => {
            const target = _s.findIndex((item) => item.id === id)

            if (target >= 0) {
                const state = [..._s]

                state[target].isCompleted = !state[target].isCompleted

                return state
            }

            return _s
        })
    }, [])

    const toggleAllTasks = useCallback(() => {
        setTasks((_s) => {
            if (!IsNotEmptyArray(_s)) {
                return _s
            }

            if (_s.some((item) => !item.isCompleted)) {
                return _s.map((item) => {
                    item.isCompleted = true
                    return item
                })
            }

            return _s.map((item) => {
                item.isCompleted = false
                return item
            })
        })
    }, [])

    const deleteTask = useCallback((id) => {
        setTasks((_s) => _s.filter((item) => item.id !== id))
    }, [])

    const tasksLeft = useMemo(() => {
        if (!IsNotEmptyArray(tasks)) {
            return 0
        }

        return tasks.reduce((acc, current, index, arr) => {
            if (!current.isCompleted) {
                acc += 1
            }

            return acc
        }, 0)
    }, [tasks])

    // console.log("Tasks", tasks)

    return (
        <Box pad="xsmall" gap="medium" margin={{ top: "medium" }}>
            <AddNewTask
                tasksLeft={tasksLeft}
                isToggleAllDisabled={!IsNotEmptyArray(tasks)}
                onAdd={addTask}
                onToggleAll={toggleAllTasks}
            />

            {IsNotEmptyArray(tasks) && (
                <Box gap="medium">
                    <TaskList
                        list={tasks}
                        onDelete={deleteTask}
                        onTaskToggle={toggleTask}
                    />
                    <Filters tasksLeft={tasksLeft} />
                </Box>
            )}
        </Box>
    )
}

export default Tasks
