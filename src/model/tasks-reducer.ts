import type {TasksState} from "../App.tsx";
import {v1} from "uuid";

const initialState: TasksState = {}

export const TasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
    switch (action.type) {
        // case "": {
        //     return state
        // }

        case 'create_todolist': {
            return {
                ...state,
                [action.payload.id]: []
            }
        }

        case 'delete_todolist': {
            const newState = {...state}
            delete newState[action.payload.id]
            return newState
        }
        default:
            return state
    }
}



export const createTodolistAC = (title: string) => {
    return {
        type: 'create_todolist',
        payload: {
            id: v1(),
            title
        }
    } as const
}
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>



export const deleteTodolistAC = (id: string) => {
    return {
        type: 'delete_todolist',
        payload: {
            id
        }
    } as const
}
export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>

type  Actions = CreateTodolistAction | DeleteTodolistAction