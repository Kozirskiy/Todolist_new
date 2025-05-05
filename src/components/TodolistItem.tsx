// import {Button} from "./Button.tsx";
import Button from '@mui/material/Button'
import {type ChangeEvent} from "react";
import {FilterValues, Task} from "../App.tsx";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Box from '@mui/material/Box'
import {containerSx} from './TodolistItem.styles'
import {getListItemSx} from "./TodolistItem.styles";


export type TodolistItemPropstype = {
    todolistId: string
    title: string
    // subtitle?: string
    // description?: string
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
    // const changeFilterHandler = () => {
    //     changeFilter('Active', todolistId)
    // }

    return (
        <div>

            <h3>
                <EditableSpan value={title} onChange={changeTodolistTitleHandler}/>

                {/*<Button title={'❌'} style={{marginLeft: '5px'}} onClick={() => deleteTodolist(todolistId)}/>*/}
            </h3>
            <IconButton onClick={deleteTodolistHandler}>
                <DeleteIcon/>
            </IconButton>
            <div>
                <CreateItemForm onCreateItem={createTaskHandler}/>
            </div>

            {tasks.length === 0 ? (
                <p>Array is empty</p>) : (
                <List style={{listStyleType: 'none', paddingLeft: 0}}>
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
                            <ListItem key={task.id}
                                      sx={getListItemSx(task.isDone)}>
                                <div>
                                    <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                    <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                                </div>
                                <IconButton onClick={deleteTaskHandler}>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItem>
                        )
                    })}
                </List>
            )}
            <Box sx={containerSx}>
                <Button variant={filter === 'All' ? 'outlined' : 'text'}
                        color={'inherit'}
                        onClick={() => changeFilter('All', todolistId)}>
                    All
                </Button>
                <Button variant={filter === 'Active' ? 'outlined' : 'text'}
                        color={'primary'}
                        onClick={() => changeFilter('Active', todolistId)}>
                    Active
                </Button>
                <Button variant={filter === 'Completed' ? 'outlined' : 'text'}
                        color={'secondary'}
                        onClick={() => changeFilter('Completed', todolistId)}>
                    Completed
                </Button>
            </Box>
        </div>
    );
};

