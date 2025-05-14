import type {Todolist} from "../App.tsx";

const initialState: Todolist[] = []

// const action = {
//     type: 'todos/todoAdded',
//     payload: {
//         id: '1eb42cac-f809-4c16-b6b0-f3c6169d83b0'
//     },
// }


type Action = DeleteTodolistAction;

export const todolistReducer = (state: Todolist[] = initialState, action: Action): Todolist[] => {
    switch (action.type) {
        case 'delete_todolist': {
            return state.filter(todolist => todolist.id !== action.payload.id)
        }
        default:
            return state
    }
}


export const deleteTodolistAC =  (id: string)=> {
    return {type: 'delete_todolist', payload:{id}} as const
}

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>

