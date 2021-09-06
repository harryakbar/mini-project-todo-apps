import { emailValidation } from "../../utils/regex";

export default function handler(req, res) {
    switch (req.method) {
        case "POST":
            const { email, password } = req.body;

            // validate email
            const validEmail = emailValidation.test(
                String(email).toLowerCase()
            );
            if (!validEmail) {
                res.status(400).json({
                    code: 400,
                    message: "",
                    error: "Invalid email address!",
                    data: null,
                });
            }

            // validate password
            if (password.length == 0) {
                res.status(400).json({
                    code: 400,
                    message: "",
                    error: "Password can't be empty!",
                    data: null,
                });
            }

            res.status(200).json({
                code: 200,
                message: "Login success!",
                error: "",
                data: {
                    email,
                    password,
                },
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
