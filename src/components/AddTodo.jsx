import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { addTodo, updateTodo, cleaEditTodo } from "../features/todo/todoSlice"

const AddTodo = () => {

    const [inputValue, setInput] = useState("")
    const dispatch = useDispatch()
    const editTodo = useSelector((state) => state.editTodo)

    useEffect(() => {
        if (editTodo) {
            setInput(editTodo.text);
        } else {
            setInput("");
        }
    }, [editTodo]);

    const addOrUpdateTodoHandler = (e) => {
        e.preventDefault();

        if (editTodo) {
            dispatch(updateTodo({ id: editTodo.id, text: inputValue }))
            dispatch(cleaEditTodo(null))
        } else {
            dispatch(addTodo(inputValue))
        }
        setInput("")
    }

    return (
        <form onSubmit={addOrUpdateTodoHandler} className="lg:flex-col lg:gap-3 lg:flex space-x-3 mt-12 w-full lg:justify-center lg:items-center">
            <input
                type="text"
                className="bg-gray-800 rounded w-full border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                placeholder="Enter a Todo..."
                value={inputValue}
                onChange={(e) => setInput(e.target.value)}
            />
            <button
                type="submit"
                className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg lg:w-fit "
            >
                {editTodo ? 'Update Todo' : 'Add Todo'}
            </button>
        </form>
    )
}

export default AddTodo