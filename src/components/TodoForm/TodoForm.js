import { useState } from "react";
import { makeStyles } from "@material-ui/core";

import { Button, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    form: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
    },
    inputField: {
        flex: 5,
        marginRight: theme.spacing(2),
    },
    uploadImgBtn: {
        flex: 1,
        backgroundColor: theme.palette.info.main,
        marginRight: theme.spacing(2),

        color: "#fff",
        [theme.breakpoints.down("sm")]: {
            fontSize: 10,
        },
    },
    submitBtn: {
        flex: 1,
        [theme.breakpoints.down("sm")]: {
            fontSize: 10,
        },
    },
}));

export default function TodoForm({ onSubmit }) {
    const classes = useStyles();

    const [todo, setTodo] = useState({
        id: "dummyId",
        todo: "",
        image: "",
    });

    return (
        <form
            className={classes.form}
            autoComplete="off"
            onSubmit={(event) => onSubmit(todo, event)}
        >
            <TextField
                className={classes.inputField}
                value={todo.todo}
                onChange={(event) =>
                    setTodo((currentState) => ({
                        ...currentState,
                        todo: event.target.value,
                    }))
                }
                name="todo"
                type="text"
                autoFocus
                label="Input your todo item"
                size="small"
                variant="outlined"
            />

            <Button
                className={classes.uploadImgBtn}
                type="submit"
                fullWidth
                variant="contained"
                color="inherit"
            >
                Add Image
            </Button>
            <Button
                className={classes.submitBtn}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
            >
                Submit
            </Button>
        </form>
    );
}
