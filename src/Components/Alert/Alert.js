import { useEffect, useState } from 'react';
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AlertHelper = ({isOpen, text, alertColor, onClose}) => {
    const [openError, setError] = useState(false);
    const [errorText, setErrorText] = useState(false);
    const [alert, setAlert] = useState("");

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        setError(false);
        onClose(false);
    };

    useEffect(() => {
        setError(isOpen);
        setErrorText(text);
        setAlert(alertColor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen])

    return (
            <Snackbar
                anchorOrigin={{
                vertical: "top",
                horizontal: "right",
                }}
                open={openError}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert severity={alert}>{errorText}</Alert>
            </Snackbar>
    )
}


export default AlertHelper;