import Head from "next/head";
import { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Cookies from "universal-cookie";

import axios from "../lib/axios";
import Navbar from "../components/Navbar/Navbar";
import TodoForm from "../components/TodoForm/TodoForm";
import { Container } from "@material-ui/core";
import TodoLists from "../components/TodoLists/TodoLists";

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

    const getTodos = () => {
        axios
            .get("/todos")
            .then((res) => setTodos(res.data))
            .catch((err) => console.log(err));
    };

    const addTodo = useCallback((todo, event) => {
        event.preventDefault();
        console.log(todo);
    }, []);

    const updateTodo = useCallback((todo, event) => {
        event.preventDefault();
        console.log(todo);
    }, []);

    const removeTodo = useCallback((todo, event) => {
        event.preventDefault();
        console.log(todo);
    }, []);

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
                </Container>
            </main>
        </div>
    );
}
