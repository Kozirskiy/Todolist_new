import {v1} from "uuid";
import {Todolist} from "../App.tsx";
import {deleteTodolistAC, todolistReducer} from "./todolist-reduser.ts";
import {test, expect} from "vitest";
import { defineConfig } from 'vitest/config';


export default defineConfig({
    test: {
        globals: true, // <--- Це головне
    },
})

test('correct todolist should be deleted', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    // 1.start state
    const startState: Todolist[] = [
        {id: todolistId1, title: 'what to learn', filter: 'All'},
        {id: todolistId2, title: 'what to buy', filter: 'All'}
    ]

    // 2.action
    // const action = {
    //     type: 'delete_todolist',
    //     payload: {
    //         id: todolistId1
    //     },
    // } as const

    const endState = todolistReducer(startState, deleteTodolistAC(todolistId1))

    // 3. Проверка, что действие измененило state соответствующим образом
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    // удалится нужный тудулист, не любой
    expect(endState[0].id).toBe(todolistId2)

})
