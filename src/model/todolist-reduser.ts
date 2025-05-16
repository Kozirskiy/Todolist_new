import type {FilterValues, Todolist} from "../App.tsx";
import {v1} from "uuid";

const initialState: Todolist[] = []

// const action = {
//     type: 'todos/todoAdded',
//     payload: {
//         id: '1eb42cac-f809-4c16-b6b0-f3c6169d83b0'
//     },
// }


export const todolistReducer = (state: Todolist[] = initialState, action: Action): Todolist[] => {
    switch (action.type) {
        case 'delete_todolist': {
            return state.filter(todolist => todolist.id !== action.payload.id)
        }

        case 'create_todolist': {
            const newTodolist: Todolist = {id: action.payload.id, title: action.payload.title, filter: "All"}
            return [...state, newTodolist]
        }

        case 'change_todolist_title': {
            return state.map(todolist =>
                todolist.id === action.payload.id
                    ? {...todolist, title: action.payload.title}
                    : todolist)
        }

        case 'change_todolist_filter': {
            return state.map(tl =>
                tl.id === action.payload.id
                    ? {...tl, filter: action.payload.filter} : tl)
        }

        default:
            return state
    }
}
//delete AC
export const deleteTodolistAC = (id: string) => {
    return {type: 'delete_todolist', payload: {id}} as const
}
export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>


//create AC
export const createTodolistAC = (title: string) => {
    return {
        type: 'create_todolist',
        payload: {
            id: v1(),
            title
        }
    } as const;
}
export type CreatorTodolistAction = ReturnType<typeof createTodolistAC>


//change title AC
export const changeTodolistTitleAC = (payload: { id: string; title: string }) => {
    return {
        type: 'change_todolist_title',
        payload
    } as const
}
export type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>


//change filter AC
export const changeTodolistFilterAC = (payload: { id: string; filter: FilterValues  }) => {
    return {
        type: 'change_todolist_filter',
        payload
    } as const
}
export type ChangeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>



type Action = DeleteTodolistAction | CreatorTodolistAction | ChangeTodolistTitleAction | ChangeTodolistFilterAction;





