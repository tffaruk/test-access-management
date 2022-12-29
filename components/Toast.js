import { Snackbar } from "@mui/material";
import { useAppContext } from "context/state";

const Toast = () => {
  const {
    toastState: { isToast, message },
    toastDispatch,
  } = useAppContext();

  if (isToast) {
    setTimeout(() => {
      toastDispatch({
        type: "TOAST_END",
      });
    }, 500);
  }
  const vertical = "top";
  const horizontal = "right";
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={isToast}
      message={message}
      key={"top" + "right"}
    />
  );
};

export default Toast;
