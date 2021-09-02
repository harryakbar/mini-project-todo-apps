export default function handler(req, res) {
    switch (req.method) {
        case "POST":
            const { email, password, confirmPassword } = req.body;

            // validate email
            const re =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            const validEmail = re.test(String(email).toLowerCase());
            if (!validEmail) {
                res.status(400).json({
                    code: 400,
                    message: "",
                    error: "Invalid email address!",
                    data: null,
                });
            }

            // validate password
            const validPassword =
                password === confirmPassword &&
                password.length &&
                confirmPassword.length;
            if (!validPassword) {
                res.status(400).json({
                    code: 400,
                    message: "",
                    error: "Password didn't match!",
                    data: null,
                });
            }

            res.status(200).json({
                code: 200,
                message: "Sign Up success!",
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
