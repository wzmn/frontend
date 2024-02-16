import { toast } from "react-toastify";

export default function MsgToast(
  msg: string,
  type: "success" | "warning" | "error" | "info" | "warn" | "dark",
  delay: number = 1200
) {
  toast[type](msg, {
    autoClose: delay,
    hideProgressBar: true,
  });
}
