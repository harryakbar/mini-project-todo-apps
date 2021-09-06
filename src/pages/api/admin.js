// Users data
const users = [
    {
        email: "abigail@gmail.com",
        role: "user, admin",
        isActive: "True"
    },
    {
        email: "bary.burton@gmail.com",
        role: "user",
        isActive: "False"
    },
    {
        email: "cindy@gmail.com",
        role: "user",
        isActive: "True"
    },
    {
        email: "edward@gmail.com",
        role: "user",
        isActive: "False"
    },
    {
        email: "fahmi@gmail.com",
        role: "user",
        isActive: "True"
    },
    {
        email: "gellen@gmail.com",
        role: "user, admin",
        isActive: "True"
    },
    {
        email: "harry@gmail.com",
        role: "user, admin",
        isActive: "True"
    },
    {
        email: "jason@gmail.com",
        role: "user, admin",
        isActive: "True"
    },
    {
        email: "ryan@gmail.com",
        role: "user, admin",
        isActive: "True"
    },
];

export default function handler(req, res) {
    switch (req.method) {
        case "GET":
            res.status(200).json({
                users: users
            });
            break;

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
