import Head from "next/head";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useCookies } from "react-cookie";

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
    const [cookies] = useCookies();
    const [email, setEmail] = useState("");

    useEffect(() => {
        setEmail(cookies.TodoApp_userMail);
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
