import {Button} from "./Button.tsx";
import {type ChangeEvent} from "react";
import {FilterValues, Task} from "../App.tsx";
import {CreateItemForm} from "./CreateItemForm.tsx";

export type TodolistItemPropstype = {
    todolistId: string
    title?: string
    subtitle?: string
    description?: string
    tasks: Task[]
    filter?: FilterValues
    deleteTask: (taskId: string, todolistId: string) => void
    changeFilter: (filter: FilterValues, todolistId: string) => void
    createTask: (title: string, todolistId: string) => void
    changeTaskStatus?: (taskId: string, isDone: boolean, todolistId: string) => void
    deleteTodolist: (todolistId: string) => void
}

export const TodolistItem = ({
                                 todolistId,
                                 title,
                                 tasks,
                                 deleteTask,
                                 changeFilter,
                                 createTask,
                                 changeTaskStatus,
                                 filter,
                                 deleteTodolist
                             }: TodolistItemPropstype) => {

    const createTaskHandler = (title: string) => {
        createTask(title, todolistId)
    }

    return (
        <div>

            <h3>
                {title}
                <Button title={'❌'} style={{marginLeft: '5px'}} onClick={() => deleteTodolist(todolistId)}/>
            </h3>
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
                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input
                                    type="checkbox"
                                    checked={task.isDone}
                                    onChange={changeTaskStatusHandler}
                                />
                                <span>{task.title}</span>
                                <Button title={'❌'} onClick={deleteTaskHandler} style={{marginLeft: '5px'}}/>
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

