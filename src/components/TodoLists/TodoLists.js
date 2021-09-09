import { useState } from "react";

import { Button, makeStyles, Typography } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import EditIcon from "@material-ui/icons/Edit";
import PublishIcon from "@material-ui/icons/Publish";
import CloseIcon from "@material-ui/icons/Cancel";

const useStyles = makeStyles((theme) => ({
    TodoLists: {
        margin: theme.spacing(3, 0),
    },
    todoItem: {
        display: "flex",
        alignItems: "center",
        margin: theme.spacing(2, 0),
    },
    todo: {
        flex: 5,
        border: "1px solid #c8c8c8",
        height: 50,
        borderRadius: theme.spacing(1),
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    todoField: {
        flex: 1,
        border: "0px solid #c8c8c8",
        outline: "none",
        borderRadius: theme.spacing(0.2),
        padding: theme.spacing(1),
        marginLeft: theme.spacing(0.5),
        "&:hover": {
            cursor: "default",
        },
    },
    activeField: {
        borderWidth: 1,
        "&:hover": {
            cursor: "text",
        },
    },
    editIcon: {
        margin: theme.spacing(0, 1),
        border: "1px solid #c8c8c8",
        borderRadius: theme.spacing(0.5),
        fontSize: 36,
        padding: theme.spacing(0.5),

        "&:hover": {
            cursor: "pointer",
        },
    },
    updateBtn: {
        margin: theme.spacing(0, 1),
    },
    checkbox: {
        marginRight: theme.spacing(2),
        "& > *": {
            transform: "scale(2.5)",
        },
    },
    image: {
        flex: 1,
        borderRadius: "1rem",
        justifySelf: "flex-end",
        height: 60,
        marginLeft: theme.spacing(2),
        width: 110,
        position: "relative",
        left: 20,
        zIndex: -1,

        "&:hover": {
            cursor: "pointer",
        },

        [theme.breakpoints.up("md")]: {
            flex: 0.5,
        },
    },
    publishIcon: {
        zIndex: 1,
        position: "relative",
        left: 2,
        bottom: 45,
        border: "1px solid #c8c8c8",
        borderRadius: 5,
        background: "#fff",
        "&:hover": {
            cursor: "pointer",
        },
    },
}));

export default function TodoLists({ todos, onUpdateTodo, onRemoveTodo }) {
    const classes = useStyles();
    const [isEdit, setIsEdit] = useState(0);
    const [onEditTodo, setOnEditTodo] = useState({
        id: 0,
        todo: "",
        image: "",
        imageFile: null,
    });

    // image preview
    const [todoImageId, setTodoImageId] = useState(0);
    const [currentFile, setCurrentFile] = useState(null);

    return (
        <div className={classes.TodoLists}>
            <Typography variant="h3" component="h1" gutterBottom>
                My Todo List
            </Typography>

            <form
                onSubmit={(event) => {
                    setIsEdit(0);
                    setOnEditTodo({
                        id: 0,
                        todo: "",
                        image: "",
                        imageFile: null,
                    });
                    onUpdateTodo(onEditTodo, event);
                }}
            >
                {todos.map((todo) => (
                    <div className={classes.todoItem} key={todo.id}>
                        {/* todo checkbox */}
                        <Checkbox
                            className={classes.checkbox}
                            onClick={(event) => onRemoveTodo(todo.id, event)}
                            color="primary"
                        />

                        {/* todo item */}
                        <div className={classes.todo}>
                            <input
                                className={`${classes.todoField} ${
                                    isEdit === todo.id
                                        ? classes.activeField
                                        : null
                                }`}
                                readOnly={isEdit !== todo.id}
                                type="text"
                                placeholder={todo.todo}
                                onChange={(event) =>
                                    setOnEditTodo((currentState) => ({
                                        ...currentState,
                                        id: todo.id,
                                        todo: event.target.value,
                                    }))
                                }
                            />

                            {/* edit or update button */}
                            {isEdit === todo.id ? (
                                <Button
                                    type="submit"
                                    className={classes.updateBtn}
                                    variant="contained"
                                    color="primary"
                                >
                                    Update
                                </Button>
                            ) : (
                                <EditIcon
                                    className={classes.editIcon}
                                    onClick={() => setIsEdit(todo.id)}
                                />
                            )}
                        </div>

                        {/* todo image */}
                        {todo.image ? (
                            <div>
                                <img
                                    className={classes.image}
                                    src={todo.image}
                                />
                                <CloseIcon className={classes.publishIcon} />
                            </div>
                        ) : (
                            <label onClick={() => setIsEdit(todo.id)}>
                                <img
                                    className={classes.image}
                                    src={`${
                                        onEditTodo.imageFile &&
                                        todoImageId === todo.id
                                            ? currentFile
                                            : "/default-img.png"
                                    }`}
                                />
                                <input
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={(event) => {
                                        setOnEditTodo((todos) => ({
                                            ...todos,
                                            id: todo.id,
                                            image: event.target.files[0].name,
                                            imageFile: event.target.files[0],
                                        }));

                                        // image preview
                                        setTodoImageId(todo.id);
                                        setCurrentFile(
                                            URL.createObjectURL(
                                                event.target.files[0]
                                            )
                                        );
                                    }}
                                />
                                <PublishIcon className={classes.publishIcon} />
                            </label>
                        )}
                    </div>
                ))}

                {/* submit hidden button */}
                <button style={{ display: "none" }} type="submit"></button>
            </form>
        </div>
    );
}
