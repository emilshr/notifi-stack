import { PropsWithChildren, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const NotifiWrapper = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    console.log("Notifi wrapper init");
  }, []);

  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
};
