import {Button} from "./Button.tsx";
import {type ChangeEvent} from "react";
import {FilterValues, Task} from "../App.tsx";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

export type TodolistItemPropstype = {
    todolistId: string
    title: string
    subtitle?: string
    description?: string
    tasks: Task[]
    filter?: FilterValues
    deleteTask: (taskId: string, todolistId: string) => void
    changeFilter: (filter: FilterValues, todolistId: string) => void
    createTask: (title: string, todolistId: string) => void
    changeTaskStatus?: (taskId: string, isDone: boolean, todolistId: string) => void
    deleteTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const TodolistItem = ({
                                 changeTodolistTitle,
                                 todolistId,
                                 title,
                                 tasks,
                                 deleteTask,
                                 changeFilter,
                                 createTask,
                                 changeTaskStatus,
                                 filter,
                                 deleteTodolist,
                                 changeTaskTitle
                             }: TodolistItemPropstype) => {

    const createTaskHandler = (title: string) => {
        createTask(title, todolistId)
    }
    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(todolistId, title)
    }
    const deleteTodolistHandler = () => {
        deleteTodolist(todolistId)
    }


    return (
        <div>

            <h3>
                <EditableSpan value={title} onChange={changeTodolistTitleHandler} />

                {/*<Button title={'❌'} style={{marginLeft: '5px'}} onClick={() => deleteTodolist(todolistId)}/>*/}
            </h3>
            <IconButton onClick={deleteTodolistHandler}>
                <DeleteIcon />
            </IconButton>
            <div>
                <CreateItemForm onCreateItem={createTaskHandler}/>
            </div>

            {tasks.length === 0 ? (
                <p>Array is emty</p>) : (
                <ul>
                    {tasks.map((task) => {
                        const deleteTaskHandler = () => deleteTask(task.id, todolistId)

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus && changeTaskStatus(task.id, newStatusValue, todolistId)
                        }

                        const changeTaskTitleHandler = (title: string) => {
                            changeTaskTitle(todolistId, task.id, title)
                        }
                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input
                                    type="checkbox"
                                    checked={task.isDone}
                                    onChange={changeTaskStatusHandler}
                                />
                                <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                                {/*<Button title={'❌'} onClick={deleteTaskHandler} style={{marginLeft: '5px'}}/>*/}
                                <IconButton onClick={deleteTaskHandler}>
                                    <DeleteIcon />
                                </IconButton>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button
                    className={filter === 'All' ? 'active-filter ' : ''}
                    title={'All'}
                    onClick={() => changeFilter('All', todolistId)}

                />

                <Button
                    className={filter === 'Active' ? 'active-filter ' : ''}
                    title={'Active'}
                    onClick={() => changeFilter('Active', todolistId)}
                />

                <Button
                    className={filter === 'Completed' ? 'active-filter ' : ''}
                    title={'Completed'}
                    onClick={() => changeFilter('Completed', todolistId)}
                />
            </div>
        </div>
    );
};

