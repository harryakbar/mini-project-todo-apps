import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export default function AppSnackbar({
    isOpen,
    handleClose,
    severity,
    message,
}) {
    return (
        <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    );
}
