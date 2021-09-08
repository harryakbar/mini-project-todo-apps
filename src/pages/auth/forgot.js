import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Container, TextField, Typography, Button } from "@material-ui/core";
import { emailValidation } from "../../utils/regex";

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

    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (email && isEmailValid) {
            Router.push({
                pathname: "/auth/recover",
                query: { email },
            });
        } else {
            setIsEmailValid(false);
        }
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
                <title>Forgot</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <body>
                <Container component="main" maxWidth="sm">
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Forgot Password
                        </Typography>

                        <form
                            className={classes.form}
                            autoComplete="off"
                            onSubmit={handleSubmit}
                        >
                            <label component="body">
                                Insert your account email
                            </label>
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

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Send
                            </Button>

                            <Link href="/auth/login">
                                <a className={classes.link}>
                                    Back to login page
                                </a>
                            </Link>
                        </form>
                    </div>
                </Container>
            </body>
        </>
    );
}
