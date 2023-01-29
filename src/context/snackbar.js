import React, { useState } from "react";

const SnackbarContext = React.createContext({
  isDisplayed: false,
  displayMsg: (msg) => {},
  onClose: () => {},
  msg: "",
  color: "green",
});

export const useSnackbar = () => React.useContext(SnackbarContext);

let timer;
export const SnackBarContextProvider = (props) => {
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState("green");
  const [isDisplayed, setIsDisplayed] = useState(false);
  const displayHandler = (msg, color = "green") => {
    setMsg(msg);
    setColor(color);
    setIsDisplayed(true);
    timer = setTimeout(() => {
      closeHandler();
    }, 3000);
  };
  const closeHandler = () => {
    clearTimeout(timer);
    setIsDisplayed(false);
  };
  return (
    <SnackbarContext.Provider
      value={{
        msg,
        color,
        isDisplayed,
        displayMsg: displayHandler,
        onClose: closeHandler,
      }}
    >
      {props.children}
    </SnackbarContext.Provider>
  );
};
export default SnackbarContext;
