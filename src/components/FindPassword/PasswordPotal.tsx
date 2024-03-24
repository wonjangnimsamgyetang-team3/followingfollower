import ReactDOM from "react-dom";

const PasswordPotal = ({ children }: props) => {
  if (typeof window === "undefined") {
    return null;
  }
  const node = document.getElementById("pwPortal") as Element;
  return ReactDOM.createPortal(children, node);
};

export default PasswordPotal;
