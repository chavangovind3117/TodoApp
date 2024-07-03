import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeTodo, setEditTodo, toggleTodo, restoreTodos } from '../features/todo/todoSlice'

const Todo = () => {

    const todos = useSelector(state => state.todos)
    const dispatch = useDispatch()

    const editTodo = (todo) => {
        dispatch(setEditTodo(todo))
    }

    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem("todos"))

        if (todos && todos.length > 0) {
            dispatch(restoreTodos(todos))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])

    return (
        <>
            <div className='text-black py-2 px-6 focus:outline-none font-bold tracking-wide text-3xl'>Todos</div>
            <ul className="list-none">
                {todos.map((todo) => (
                    <li
                        className={`mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded relative `}
                        key={todo.id}
                    >
                        <div className='flex gap-3 justify-center items-center text-white'>
                            <div className='flex relative'>
                                <input
                                    type="checkbox"
                                    onChange={() => dispatch(toggleTodo(todo.id))}
                                    checked={todo.completed}
                                    className={`before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-green-500 checked:bg-green-500 checked:before:bg-green-500 hover:before:opacity-10`}
                                />
                                <span
                                    class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                                        stroke="currentColor" stroke-width="1">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </span>
                            </div>


                            <div className={`text-white flex justify-center items-center ${todo.completed ? " line-through" : ""}`}>{todo.text}</div>
                        </div>

                        <div className='flex gap-3'>
                            {/* update todo */}
                            <button
                                onClick={() => editTodo(todo)}
                                className=" text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded text-md"
                            >
                                Edit
                            </button>
                            {/* delete todo */}
                            <button
                                onClick={() => dispatch(removeTodo(todo.id))}
                                className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                </svg>
                            </button>
                        </div>

                    </li >
                ))}
            </ul >
        </>
    )
}

export default Todo