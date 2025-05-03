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


    // useState for taskTitle
    // const [taskTitle, setTaskTitle] = useState('')
    // const [error, setError] = useState<string | null>(null)

    // const createTaskHandler = () => {
    //     const trimmedTitle = taskTitle.trim()
    //     if (trimmedTitle !== '') {
    //         createTask(trimmedTitle, todolistId)
    //         setTaskTitle('')
    //     } else {
    //         setError('Title is require')
    //     }
    // }

    const createTaskHandler = (title: string) => {
        createTask(title, todolistId)
    }

    // const createTaskOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === "Enter" && !isAddBtnDisabled) {
    //         createTaskHandler()
    //         setTaskTitle('')
    //     }
    // }

    // const setTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    //     setTaskTitle(event.currentTarget.value)
    //     setError(null)
    // }

    // const isAddBtnDisabled = !taskTitle.trim() || taskTitle.length > 30
    // const isAddBtnDisabled = !taskTitle.trim() || taskTitle.trim().length > 30


    return (
        <div>

            <h3>
                {title}
                <Button title={'❌'} style={{marginLeft: '5px'}} onClick={() => deleteTodolist(todolistId)}/>
            </h3>
            <div>

                <CreateItemForm onCreateItem={createTaskHandler}/>

                {/*<input*/}
                {/*    className={error ? 'error' : ''}*/}
                {/*    value={taskTitle}*/}
                {/*    placeholder={'enter text'}*/}
                {/*    onChange={setTaskTitleHandler}*/}
                {/*    onKeyDown={createTaskOnKeyDownHandler}*/}
                {/*/>*/}
                {/*<Button*/}
                {/*    disabledButton={isAddBtnDisabled}*/}
                {/*    title={'+'}*/}
                {/*    onClick={createTaskHandler}/>*/}

                {/*{error && <div className={'error-message'}>{error}</div>}*/}
                {/*{taskTitle && <div>max lenht 30 symbol</div>}*/}
                {/*{taskTitle.length > 30 && <div style={{color: 'red'}}>please max lenht 30 symbol</div>}*/}

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

