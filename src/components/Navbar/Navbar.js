import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        background: theme.palette.secondary.main,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    rightSide: {
        display: "flex",
        alignItems: "center",
        "& > *": {
            marginLeft: theme.spacing(2),
        },
    },
    email: {
        textDecorationLine: "underline",
    },
    logoutBtn: {
        color: "#fff",
        backgroundColor: "#da645d",
        "&:hover": {
            backgroundColor: "#ca544d",
        },
    },
}));

export default function Navbar({ title, email }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        {title}
                    </Typography>
                    <div className={classes.rightSide}>
                        <Typography className={classes.email} variant="body1">
                            {email}
                        </Typography>
                        <Button
                            className={classes.logoutBtn}
                            variant="contained"
                        >
                            Log Out
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
