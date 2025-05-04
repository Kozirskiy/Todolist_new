import './App.css'
import {TodolistItem} from "./components/TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";
import {CreateItemForm} from "./components/CreateItemForm.tsx";
// import {Test1} from "./components/Test1.tsx";

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValues = 'All' | 'Active' | 'Completed'

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type TasksState = {
    [todolistId: string]: Task[]
}

export const App = () => {

    const todolistId_1 = v1()
    const todolistId_2 = v1()

    const [todolists, setTodolists] = useState<Todolist[]>([
        {id: todolistId_1, title: 'Cars', filter: 'All'},
        {id: todolistId_2, title: 'Expo', filter: 'All'}]
    )

    const [tasks, setTasks] = useState<TasksState>({
        [todolistId_1]: [
            {id: v1(), title: 'HTML5', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'REACT', isDone: true},
        ],
        [todolistId_2]: [
            {id: v1(), title: 'Redux', isDone: true},
            {id: v1(), title: 'C++', isDone: false},
            {id: v1(), title: 'HP', isDone: true},
        ]
    })

    const deleteTask = (taskId: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }

    const createTask = (title: string, todolistId: string) => {

        const newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistId]: tasks[todolistId].concat(newTask)})

        // setTasks([{id: v1(), title, isDone: false}, ...tasks])
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {

        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)
        })

        // map method
        // const newState = tasks.map(task => task.id == taskId ? {...task, isDone} : task)
        // setTasks(newState)

    }


// change filter
    const changeFilter = (filter: FilterValues, todolistId: string) => (
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter} : tl))
    )


    // delete todolist
    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
    }

    //create todolist
    const createTodolist = ( title: string) => {
        const newTodolist: Todolist = {id: v1(), title, filter: 'All'}
        setTodolists([ newTodolist, ...todolists])
        setTasks({ [newTodolist.id]:[], ...tasks})
    }

    // change task title
    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {setTasks({
        ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title} : task
        )})
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? { ...todolist, title } : todolist))
    }

//ui

    const todolistComponents = todolists.map(tl => {
        let filteredTasks = tasks[tl.id]

        if (tl.filter === 'Active') {
            filteredTasks = filteredTasks.filter(task => !task.isDone)
        }
        if (tl.filter === 'Completed') {
            filteredTasks = filteredTasks.filter(task => task.isDone)
        }

        return (
            <TodolistItem
                changeTodolistTitle={changeTodolistTitle}
                changeTaskTitle={changeTaskTitle}
                key={tl.id}
                todolistId={tl.id}
                title={tl.title}
                filter={tl.filter}
                tasks={filteredTasks}
                deleteTask={deleteTask}
                changeFilter={changeFilter}
                createTask={createTask}
                changeTaskStatus={changeTaskStatus}
                deleteTodolist={deleteTodolist}
            />
        )
    })



    return (
        <div className="app">
            <p style={{fontSize: '25px', fontWeight: 'bolder', marginRight: '150px', color: 'green'}}>NEW TODOLIST</p>
            <CreateItemForm onCreateItem={createTodolist}/>
            {todolistComponents}

            {/*<Test1/>*/}
            {/*<TestJS_Lessons/>*/}
        </div>
    )
}

