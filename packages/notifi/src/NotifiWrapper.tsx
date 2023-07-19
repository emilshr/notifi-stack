import { PropsWithChildren, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { socket } from "./socket-utils";

export const NotifiWrapper = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    console.log("Notifi wrapper init");
    socket.addEventListener("open", () => {
      console.log("Socket connection started in notifi");
    });
    socket.addEventListener("close", () => {
      console.log("Socket connection closed in notifi");
    });
    socket.addEventListener("error", () => {
      console.log("Socket connection error in notifi");
    });
    socket.addEventListener("message", () => {
      console.log("Message received via sockets in notifi");
    });
    return () => {
      socket.close();
    };
  }, []);

  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
};
