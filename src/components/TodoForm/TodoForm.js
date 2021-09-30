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
        color: "#fff",
        fontWeight: 600,
        display: "grid",
        placeItems: "center",
        backgroundColor: theme.palette.info.main,
        marginRight: theme.spacing(2),
        borderRadius: theme.spacing(0.5),

        [theme.breakpoints.down("sm")]: {
            fontSize: 10,
        },

        "&:hover": {
            backgroundColor: "#1186d3",
            cursor: "pointer",
        },
    },
    removeImageBtn: {
        flex: 1,
        marginRight: theme.spacing(2),
        backgroundColor: "#da645d",
        color: "#fff",

        [theme.breakpoints.down("sm")]: {
            fontSize: 10,
        },

        "&:hover": {
            backgroundColor: "#ca544d",
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
        todo: "",
        image: "",
        imageFile: null,
    });

    const removeImage = (event) => {
        event.preventDefault();
        setTodo((currentTodo) => ({
            ...currentTodo,
            image: "",
            imageFile: null,
        }));
    };

    return (
        <form
            className={classes.form}
            autoComplete="off"
            onSubmit={(event) => onSubmit(todo, event)}
            encType="multipart/form-data"
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
                inputProps={{
                    "data-testid": "todo-input",
                }}
                name="todo"
                type="text"
                autoFocus
                label="Input your todo item"
                size="small"
                variant="outlined"
            />

            {todo.image ? (
                <Button
                    className={classes.removeImageBtn}
                    onClick={removeImage}
                    fullWidth
                    variant="contained"
                >
                    Remove Image
                </Button>
            ) : (
                <label className={classes.uploadImgBtn}>
                    <input
                        type="file"
                        style={{ display: "none" }}
                        onChange={(event) =>
                            setTodo((todos) => ({
                                ...todos,
                                image: event.target.files[0].name,
                                imageFile: event.target.files[0],
                            }))
                        }
                    />
                    ADD IMAGE
                </label>
            )}
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
