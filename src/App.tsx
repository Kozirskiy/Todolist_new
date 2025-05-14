import './App.css'
import {TodolistItem} from "./components/TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";
import {CreateItemForm} from "./components/CreateItemForm.tsx";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
// import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import {containerSx} from "./components/TodolistItem.styles.ts";
import {NavButton} from "./components/NavButton.ts";
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'


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
export type ThemeMode = 'dark' | 'light'

export const App = () => {
    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#087EA4',
            }
        }
    })
    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    const todolistId_1 = v1()
    const todolistId_2 = v1()

    const [todolists, setTodolists] = useState<Todolist[]>([
        {id: todolistId_1, title: 'Skills', filter: 'All'},
        {id: todolistId_2, title: 'Future Skills', filter: 'All'}]
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
    }

// change filter
    const changeFilter = (filter: FilterValues, todolistId: string) => (
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter} : tl))
    )


    // delete todolist
    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    //create todolist
    const createTodolist = (title: string) => {
        const newTodolist: Todolist = {id: v1(), title, filter: 'All'}
        setTodolists([newTodolist, ...todolists])
        setTasks({[newTodolist.id]: [], ...tasks})
    }

    // change task title
    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({
            ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title} : task
            )
        })
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, title} : todolist))
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
            <Grid key={tl.id}>
                <Paper sx={{p: '0 20px 20px 20px'}}>
                    <TodolistItem
                        changeTodolistTitle={changeTodolistTitle}
                        changeTaskTitle={changeTaskTitle}
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
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="app">
            {/*<p style={{fontSize: '25px', fontWeight: 'bolder', marginRight: '150px', color: 'green'}}>NEW TODOLIST</p>*/}
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar position="static" sx={{mb: '30px'}}>
                    <Toolbar>
                        <Container maxWidth={'lg'} sx={containerSx}>
                            <IconButton color="inherit">
                                <MenuIcon/>
                            </IconButton>
                            <div>
                                <NavButton>Sign in</NavButton>
                                <NavButton>Sign up</NavButton>
                                <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                                <Switch color={'default'} onChange={changeMode}/>
                            </div>
                        </Container>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>


            <Container maxWidth={'lg'}>
                <Grid container sx={{mb: '30px'}}>
                    <CreateItemForm onCreateItem={createTodolist}/>
                </Grid>

                <Grid container spacing={6}>
                    {todolistComponents}
                </Grid>
            </Container>

            {/*<Test1/>*/}
            {/*<TestJS_Lessons/>*/}
        </div>
    )
}

