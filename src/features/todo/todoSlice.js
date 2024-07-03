import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [{ id: 1, text: "hellow world", completed: false }],
    editTodo: null
}

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        restoreTodos: (state, action) => {
            const todos = action.payload
            state.todos = todos
        },
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(), // creates random ids
                text: action.payload
            }
            state.todos.push(todo)
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) =>
                todo.id !== action.payload)
        },
        updateTodo: (state, action) => {
            const { id, text } = action.payload;
            const todo = state.todos.find(todo => todo.id === id);
            if (todo) {
                todo.text = text;
            }
        },
        toggleTodo: (state, action) => {
            const todo = state.todos.find((todo) => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed
            }
        },
        setEditTodo: (state, action) => {
            state.editTodo = action.payload
        },
        cleaEditTodo: (state, action) => {
            state.editTodo = null;
        }
    }
})

export const { addTodo, removeTodo, updateTodo, setEditTodo, cleaEditTodo, toggleTodo, restoreTodos } = todoSlice.actions

export default todoSlice.reducer