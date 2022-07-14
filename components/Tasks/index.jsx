import { useCallback, useEffect, useMemo, useState } from "react"
import { v4 as uuidv4 } from "uuid"

/* COMPONENTS */
import AddNewTask from "./AddNewTask"
import TaskList from "./TaskList"
import Filters from "./Filters"
import { Box, Spinner } from "grommet"

/* HELPERS */
import { IsNotEmptyArray, IsSet } from "../../helpers/ValueTests"
import { useLocalStorage } from "../../helpers/React/Utils"

/* CONST */
export const ALL_TASKS = "all"
export const ACTIVE_TASKS = "active"
export const DONE_TASKS = "done"
const storageName = "NextTodo"

const Tasks = ({ defaultList, storageAddition = "" }) => {
    const [storage, setStorage] = useLocalStorage(
        `${storageName}${storageAddition}`,
        "",
        true
    )

    const defaultState = useMemo(() => {
        if (IsSet(storage)) {
            return storage
        }

        if (IsNotEmptyArray(defaultList)) {
            return defaultList
        }

        return []
    }, [storage, defaultList])

    const [tasks, setTasks] = useState(defaultState)
    const [filter, setFilter] = useState(ALL_TASKS)

    const addTask = useCallback((text) => {
        const newTask = {
            id: uuidv4(),
            text,
            isCompleted: false,
        }

        setTasks((_s) => [..._s, newTask])
    }, [])

    const updateTaskText = useCallback((id, text) => {
        setTasks((_s) => {
            const target = _s.findIndex((item) => item.id === id)

            if (target >= 0) {
                const state = [..._s]

                state[target].text = text

                return state
            }

            return _s
        })
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

    const onFilter = useCallback((newFilter) => {
        setFilter((_f) => (newFilter !== _f ? newFilter : _f))
    }, [])

    const tasksLeft = useMemo(() => {
        if (!IsNotEmptyArray(tasks)) {
            return 0
        }

        return tasks.reduce((acc, current) => {
            if (!current.isCompleted) {
                acc += 1
            }

            return acc
        }, 0)
    }, [tasks])

    const visibleTasks = useMemo(() => {
        if (filter === ACTIVE_TASKS) {
            return tasks.filter((_t) => !_t.isCompleted)
        }

        if (filter === DONE_TASKS) {
            return tasks.filter((_t) => _t.isCompleted)
        }

        return tasks
    }, [tasks, filter])

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
                        list={visibleTasks}
                        onDelete={deleteTask}
                        onTaskToggle={toggleTask}
                        onTextUpdate={updateTaskText}
                    />
                    <Filters filter={filter} onFilter={onFilter} />
                </Box>
            )}
        </Box>
    )
}

const TasksWrap = (props) => {
    const [mount, setMount] = useState(false)

    useEffect(() => {
        setMount(true)
    }, [])

    if (!mount) {
        return <Spinner />
    }

    return <Tasks {...props} />
}

export default TasksWrap
