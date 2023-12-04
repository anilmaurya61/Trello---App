import React, { useEffect, useState } from "react";
import { Button, TextField, Box, Typography, IconButton, Checkbox } from '@mui/material';
import { AddOutlined as AddIcon, Close as CloseIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { addTodo, getTodo, deleteTodo, updateTodo } from '../services/firestoreService'
import { ToastContainer, toast } from 'react-toastify';

export default function Todos({ cardInfo }) {
    const [addaTodo, setAddaTodo] = useState(true);
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [updatedTodo, setUpdatedTodo] = useState('');
    const [todoId, setTodoId] = useState('');
    const [textError, setTextError] = useState('');
    const [isDeleted, setIsDeleted] = useState(null);
    const [isAddedTodo, setIsAddedTodo] = useState(null);


    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                let todos = await getTodo({
                    boardId: cardInfo.boardId,
                    listId: cardInfo.listId,
                    cardId: cardInfo.cardId,
                });
                setTodos(todos)
            } catch (error) {
                console.error('Error fetching todo:', error);
            }
        };

        fetchTodo();
    },[isDeleted, isAddedTodo]);
    const handleEditTodo = (todoId, todoTitle) => {
        setIsEdit(true);
        setTodoId(todoId);
        setUpdatedTodo(todoTitle);
    }
    const handleEditTodoTitle = (event) => {
        setUpdatedTodo(event.target.value);
    }

    const handleTodoTitleChange = (event) => {
        setTodo(event.target.value);
        setTextError('')
    }
    const handleAddaTodo = () => {
        setAddaTodo(!addaTodo)
    }

    const handleAddTodo = async () => {
        if (todo.trim() != '') {
            const updatedTodos = [{ 'todoTitle': todo }, ...todos];
            setTodo('');
            setAddaTodo(!addaTodo)
            await addTodo({ 'todo': todo, 'boardId': cardInfo.boardId, 'listId': cardInfo.listId, 'cardId': cardInfo.cardId, 'isCompleted': false });
            setIsAddedTodo(updatedTodos);
        }
        else{
            setTextError('Title Can not be empty')
        }
    }

    const handletododelete = async (todoId) => {
        await deleteTodo({ 'todoId': todoId, 'boardId': cardInfo.boardId, 'listId': cardInfo.listId, 'cardId': cardInfo.cardId })
        setIsDeleted(todoId)
    }

    const handleIsCompletedTodo = async (todoId, isCompleted) => {
        try {
            const updatedTodoData = {
                'isCompleted': !isCompleted,
            };
            !isCompleted && toast.success("Todo is Completed")
            setTodos((prevTodos) =>
                prevTodos.map((prevTodo) =>
                    prevTodo.id === todoId ? { ...prevTodo, isCompleted: !prevTodo.isCompleted } : prevTodo
                )
            );
            await updateTodo(cardInfo.boardId, cardInfo.listId, cardInfo.cardId, todoId, updatedTodoData);
            toast.dismiss()
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const handleUpdateTodo = async () => {
        try {
            const updatedTodoData = {
                'todoTitle': updatedTodo,
            };
            setTodos((prevTodos) =>
                prevTodos.map((prevTodo) =>
                    prevTodo.id === todoId ? { ...prevTodo, todoTitle: updatedTodo } : prevTodo
                )
            );
            setIsEdit(false);
            await updateTodo(cardInfo.boardId, cardInfo.listId, cardInfo.cardId, todoId, updatedTodoData);

        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    return (
        <>
            <Box sx={{ margin: '0 auto', width: '70%', backgroundColor: 'white', borderRadius: '10px', padding: '16px' }}>

                {addaTodo ?
                    <Button onClick={handleAddaTodo} variant="outlined" startIcon={<AddIcon />} sx={{ margin: '10px', width: '75%' }}>
                        Add a Todo
                    </Button>
                    : <Box sx={{
                        width: '100%',
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        padding: '10px',
                        margin: '5px',
                        boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.3)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <TextField error={textError !== ''} helperText={textError !== '' ? 'Todo Title cannot be empty' : ''}
                            id="outlined-error" value={todo} onChange={handleTodoTitleChange} label="Todo title" variant="outlined" sx={{ marginBottom: '10px', width: '100%' }} />
                        <Button onClick={handleAddTodo} variant="contained" sx={{ margin: '10px', width: '5rem' }}>
                            Save
                        </Button>
                        <IconButton onClick={handleAddaTodo}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                }
                
                {todos.length > 0 && <Typography variant="h6">Todos</Typography>}
                {isEdit && <Box sx={{
                    width: '100%',
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    padding: '10px',
                    margin: '5px',
                    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.3)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <TextField value={updatedTodo} onChange={handleEditTodoTitle} label="Todo title" variant="outlined" sx={{ marginBottom: '10px', width: '100%' }} />
                    <Button onClick={handleUpdateTodo} variant="contained" sx={{ margin: '10px', width: '5rem' }}>
                        Save
                    </Button>
                    <IconButton onClick={()=> setIsEdit(false)}>
                        <CloseIcon />
                    </IconButton>
                </Box>}
                <Box sx={{ height: '15rem' }}>
                    <Box sx={{ overflowY: 'auto', height: '100%' }}>
                        <ToastContainer/>
                        {todos.length > 0 && todos.map((todo, index) => (
                            <Box key={index}
                                sx={{
                                    width: '95%',
                                    backgroundColor: 'white',
                                    borderRadius: '10px',
                                    padding: '0px 10px',
                                    margin: '5px',
                                    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.3)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <Typography variant="h6">{todo.todoTitle}</Typography>
                                <Box sx={{ display: 'flex', gap: '1rem' }}>
                                    <Checkbox
                                        {...label}
                                        checked={todo.isCompleted}
                                        onChange={() => handleIsCompletedTodo(todo.id, todo.isCompleted)}
                                    />
                                    <IconButton aria-label="edit" onClick={() => handleEditTodo(todo.id, todo.todoTitle)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handletododelete(todo.id)} aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </>
    );
}