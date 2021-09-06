export default function handler(req, res) {
    switch (req.method) {
        case "GET":
            res.status(200).json([
                {
                    id: 1,
                    todo: "Read a book",
                    image: "book.png",
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
            ]);

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
