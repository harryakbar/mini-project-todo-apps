import { useState, useEffect } from "react";
import axios from "axios";
import Router from "next/router";
import Cookies from "universal-cookie";

import Head from "next/head";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import {
    Container,
    TextField,
    Typography,
    Button,
    Grid,
} from "@material-ui/core";
import AppSnackbar from "../../components/Snackbar/Snackbar";
import { emailValidation } from "../../utils/regex";
import { baseUrl } from "../../utils/baseUrl";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(10),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    form: {
        "& > *": {
            margin: theme.spacing(1),
            width: "40ch",
        },
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        alignItems: "center",
        marginTop: theme.spacing(1),
    },
    link: {
        textDecoration: "none",
        color: theme.palette.info.main,
    },
    errorMessage: {
        color: theme.palette.error.main,
        margin: 0,
    },
}));

export default function Login() {
    const classes = useStyles();
    const cookies = new Cookies();

    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [password, setPassword] = useState("");

    const [isOpenAlert, setIsOpenAlert] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const payload = {
            email,
            password,
        };

        axios
            .post(`${baseUrl}/login`, payload)
            .then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    cookies.set("TodoApp_userMail", email, {
                        path: "/",
                    });
                    cookies.set(
                        "TodoApp_userToken",
                        "dummyuserauthtokencookie",
                        {
                            path: "/",
                        }
                    );
                    Router.push("/");
                }
            })
            .catch((err) => {
                setIsOpenAlert(true);
                console.error(err);
            });
    };

    // email validation
    useEffect(() => {
        if (email) {
            const isValid = emailValidation.test(String(email).toLowerCase());
            setIsEmailValid(isValid);
        } else {
            setIsEmailValid(false);
        }
    }, [email]);

    return (
        <>
            <Head>
                <title>Login</title>
                <meta
                    name="description"
                    content="Login for Todo App dashboard"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body>
                <Container component="main" maxWidth="sm">
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Log in
                        </Typography>
                        <form
                            className={classes.form}
                            autoComplete="off"
                            onSubmit={handleSubmit}
                        >
                            {/* error api feedback */}
                            <AppSnackbar
                                isOpen={isOpenAlert}
                                handleClose={setIsOpenAlert}
                                severity="error"
                                message="Fail to login! Please check your email and password"
                            />

                            {/* email field */}
                            <TextField
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                name="email"
                                type="email"
                                autoFocus
                                label="Email"
                                size="small"
                                variant="outlined"
                                required
                            />
                            {email && !isEmailValid && (
                                <label className={classes.errorMessage}>
                                    Please insert a valid email address
                                </label>
                            )}

                            {/* password field */}
                            <TextField
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                name="password"
                                type="password"
                                label="Password"
                                size="small"
                                variant="outlined"
                                required
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Log In
                            </Button>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Link href="/auth/forgot">
                                        <a className={classes.link}>
                                            Forgot password?
                                        </a>
                                    </Link>
                                </Grid>
                                <Grid item xs={12}>
                                    <Link href="/auth/signup">
                                        <a className={classes.link}>
                                            {"Don't have an account? Sign Up"}
                                        </a>
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Container>
            </body>
        </>
    );
}
