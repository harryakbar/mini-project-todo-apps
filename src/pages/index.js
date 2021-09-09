import Head from "next/head";
import { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Cookies from "universal-cookie";

import axios from "../lib/axios";
import Navbar from "../components/Navbar/Navbar";
import TodoForm from "../components/TodoForm/TodoForm";
import { Container } from "@material-ui/core";
import TodoLists from "../components/TodoLists/TodoLists";
import AppSnackbar from "../components/Snackbar/Snackbar";

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(4),
    },
}));

export default function Dashboard() {
    const classes = useStyles();
    const cookies = new Cookies();
    const [email, setEmail] = useState("");
    const [todos, setTodos] = useState([]);

    // snackbar state
    const [isOpen, setIsOpen] = useState(false);
    const [severity, setSeverity] = useState("");
    const [message, setMessage] = useState("");

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setIsOpen(false);
    };

    // todo CRUD functions
    const getTodos = () => {
        axios
            .get("/todos")
            .then((res) => setTodos(res.data.data))
            .catch((err) => {
                setSeverity("error");
                setMessage("unkown error occurred!");
                setIsOpen(true);
            });
    };

    const addTodo = (todo, event) => {
        event.preventDefault();

        axios
            .post("/todos", { data: { ...todo, id: todos.length + 1 } })
            .then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    getTodos();

                    // show feedback
                    setSeverity("success");
                    setMessage(res.data.message);
                    setIsOpen(true);
                } else {
                    setSeverity("error");
                    setMessage(res.data.error);
                    setIsOpen(true);
                }
            })
            .catch(() => {
                setSeverity("error");
                setMessage("unkown error ocurred!");
                setIsOpen(true);
            });
    };

    const updateTodo = (todo, event) => {
        event.preventDefault();
        console.log(todo);
    };

    const removeTodo = (todoId, event) => {
        event.preventDefault();
        axios
            .delete("/todos", { id: todoId })
            .then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    // remove todo from state
                    setTodos((currentState) =>
                        currentState.filter((todo) => todo.id !== todoId)
                    );

                    // show feedback
                    setSeverity("success");
                    setMessage(res.data.message);
                    setIsOpen(true);
                } else {
                    setSeverity("error");
                    setMessage(res.data.error);
                    setIsOpen(true);
                }
            })
            .catch(() => {
                setSeverity("error");
                setMessage("unkown error ocurred!");
                setIsOpen(true);
            });
    };

    useEffect(() => {
        setEmail(cookies.get("TodoApp_userMail"));
        getTodos();
    }, []);

    return (
        <div>
            <Head>
                <title>Todo App</title>
                <meta
                    name="Todo App"
                    content="Web app for managing todo lists"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Navbar email={email} />
                <Container className={classes.container}>
                    <TodoForm onSubmit={addTodo} />
                    <TodoLists
                        todos={todos}
                        onUpdateTodo={updateTodo}
                        onRemoveTodo={removeTodo}
                    />
                    <AppSnackbar
                        isOpen={isOpen}
                        handleClose={handleClose}
                        severity={severity}
                        message={message}
                    />
                </Container>
            </main>
        </div>
    );
}
