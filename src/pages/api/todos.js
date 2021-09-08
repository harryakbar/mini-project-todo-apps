let todos = [
    {
        id: 1,
        todo: "Read a book",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80",
    },
    {
        id: 2,
        todo: "Workout",
        image: null,
    },
    {
        id: 3,
        todo: "Study before exam",
        image: null,
    },
];

export default function handler(req, res) {
    switch (req.method) {
        case "GET":
            res.status(200).json({
                code: 200,
                message: "todos fetched",
                error: null,
                data: todos,
            });

        case "DELETE":
            todos = todos.filter((todo) => todo.id !== req.body.id);
            res.status(200).json({
                code: 200,
                message: `todo with id of ${req.body.id} has been deleted!`,
                error: null,
                data: null,
            });

        default:
            res.status(405).json({
                code: 405,
                message: "",
                error: "Method not allowed!",
                data: null,
            });
            break;
    }
}
