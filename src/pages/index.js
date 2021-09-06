import Head from "next/head";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Cookies from "universal-cookie";

import axios from "../lib/axios";
import Navbar from "../components/Navbar/Navbar";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
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
                <h1>Todo</h1>
            </main>
        </div>
    );
}
