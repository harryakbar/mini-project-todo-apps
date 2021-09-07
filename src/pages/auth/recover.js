import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Container, TextField, Typography, Button } from "@material-ui/core";
import TransitionAlert from "../../components/TransitionAlert/TransitionAlert";

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
    email: {
        fontWeight: 800,
    },
    errorMessage: {
        color: theme.palette.error.main,
        margin: 0,
    },
}));

export default function Recover() {
    const classes = useStyles();
    const router = useRouter();
    const { email } = router.query;

    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);

    const [isOpenAlert, setIsOpenAlert] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (code && isPasswordMatch && password && confirmPassword) {
            // without update user password implementation
            router.push("/auth/login");
        } else {
            setIsOpenAlert(true);
        }
    };

    // validate password
    useEffect(() => {
        if (password === confirmPassword && password && confirmPassword) {
            setIsPasswordMatch(true);
        } else {
            setIsPasswordMatch(false);
        }
    }, [password, confirmPassword]);

    return (
        <>
            <Head>
                <title>Recover</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <body>
                <Container component="main" maxWidth="sm">
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Recover
                        </Typography>

                        <form
                            className={classes.form}
                            autoComplete="off"
                            onSubmit={handleSubmit}
                        >
                            {/* error form feedback */}
                            <TransitionAlert
                                open={isOpenAlert}
                                setOpen={setIsOpenAlert}
                                severity="error"
                                message="Fail to update password! Please check your confirmation code and password"
                            />
                            <label component="body">
                                We already sent confirmation code to{" "}
                                <span className={classes.email}>{email}</span>
                            </label>

                            {/* confirmation code field */}
                            <TextField
                                value={code}
                                onChange={(event) =>
                                    setCode(event.target.value)
                                }
                                name="code"
                                type="text"
                                autoFocus
                                label="Confirmation Code"
                                size="small"
                                variant="outlined"
                            />
                            {!code && (
                                <label className={classes.errorMessage}>
                                    Insert confirmation code
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
                                label="New Password"
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
                                Submit
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
