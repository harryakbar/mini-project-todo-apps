import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import { Container, TextField, Typography, Button } from "@material-ui/core";
import TransitionAlert from "../../components/TransitionAlert/TransitionAlert";
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
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);

    const [isOpenAlert, setIsOpenAlert] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const payload = {
            email,
            password,
            confirmPassword,
        };

        axios
            .post(`${baseUrl}/signup`, payload)
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

    // validate password
    useEffect(() => {
        if (password === confirmPassword) {
            setIsPasswordMatch(true);
        } else {
            setIsPasswordMatch(false);
        }
    }, [password, confirmPassword]);

    return (
        <>
            <Head>
                <title>Sign Up</title>
                <meta name="signup" content="Sign up for Todo App dashboard" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <body>
                <Container component="main" maxWidth="sm">
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Sign Up
                        </Typography>

                        <form
                            className={classes.form}
                            autoComplete="off"
                            onSubmit={handleSubmit}
                        >
                            {/* error api feedback */}
                            <TransitionAlert
                                open={isOpenAlert}
                                setOpen={setIsOpenAlert}
                                severity="error"
                                message="Fail to sign up! Please check your email and password"
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
                            />

                            {/* confirm password field */}
                            <TextField
                                value={confirmPassword}
                                onChange={(event) =>
                                    setConfirmPassword(event.target.value)
                                }
                                name="confirm-password"
                                type="password"
                                label="Confirm Password"
                                size="small"
                                variant="outlined"
                            />
                            {password &&
                                confirmPassword &&
                                !isPasswordMatch && (
                                    <label className={classes.errorMessage}>
                                        {"Password didn't match"}
                                    </label>
                                )}

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Sign Up
                            </Button>

                            <Link href="/auth/login">
                                <a className={classes.link}>
                                    Already have an account? Log In
                                </a>
                            </Link>
                        </form>
                    </div>
                </Container>
            </body>
        </>
    );
}
