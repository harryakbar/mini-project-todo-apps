import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles, TextField, Typography } from "@material-ui/core";

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
    },
    checkbox: {
        transform: "scale(3)",
        marginRight: theme.spacing(2),
    },
    image: {
        flex: 1,
        borderRadius: "1rem",
        justifySelf: "flex-end",
        height: 60,
        marginLeft: theme.spacing(2),
        "&:hover": {
            cursor: "pointer",
        },
        [theme.breakpoints.up("md")]: {
            flex: 0.5,
        },
    },
}));

export default function TodoLists({ todos, onUpdateTodo, onRemoveTodo }) {
    const classes = useStyles();

    return (
        <div className={classes.TodoLists}>
            <Typography variant="h3" component="h1" gutterBottom>
                My Todo List
            </Typography>
            <form onSubmit={(event) => onUpdateTodo("todo", event)}>
                {todos.map((todo) => (
                    <div className={classes.todoItem} key={todo.id}>
                        <Checkbox
                            className={classes.checkbox}
                            onClick={(event) => onRemoveTodo(todo.id, event)}
                            color="primary"
                        />
                        <TextField
                            value={todo.todo}
                            className={classes.todo}
                            name="todo"
                            type="text"
                            size="medium"
                            variant="outlined"
                        />
                        {todo.image ? (
                            <img className={classes.image} src={todo.image} />
                        ) : (
                            <img
                                className={classes.image}
                                src="/default-img.png"
                            />
                        )}
                    </div>
                ))}
                <button style={{ display: "none" }} type="submit"></button>
            </form>
        </div>
    );
}
