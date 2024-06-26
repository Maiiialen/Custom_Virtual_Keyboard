import { ReactNode, useEffect } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useKeyboardStore } from "../store/store";
import App from "./App.tsx";

function Example({
  children,
  isBlocked = false,
  name = "MicrosoftSwiftKeyboard",
}: {
  children: ReactNode;
  isBlocked?: boolean;
  name?: string;
}) {
  const [chosedKeyboard, blocked, setBlocked, setChosenKeyboard, allKeyboards] =
    useKeyboardStore((state) => [
      state.chosedKeyboard,
      state.blocked,
      state.setBlocked,
      state.setChosenKeyboard,
      state.allKeyboards,
    ]);

  useEffect(() => {
    setBlocked(isBlocked);
  }, [isBlocked]);

  useEffect(() => {
    if (name) setChosenKeyboard(name);
  }, [name]);

  const handleChangeKeyboardName = (event: SelectChangeEvent) => {
    setChosenKeyboard(event.target.value);
  };

  const changeBlocked = () => {
    setBlocked(!useKeyboardStore.getState().blocked);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "40px",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
            justifyContent: "center",
            gap: "20px",
            padding: "5px",
            backgroundColor: "#8e8e8e",
          }}
        >
          <Box>
            <Select
              value={chosedKeyboard}
              onChange={handleChangeKeyboardName}
              sx={{
                backgroundColor: "#3b3b3b",
                color: "white",
                border: "1px solid #858585",
                minWidth: "250px",
              }}
            >
              {Object.keys(allKeyboards).map((keyboard) => (
                <MenuItem key={keyboard} value={keyboard}>
                  {keyboard}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Button
            sx={{
              color: "white",
              backgroundColor: "#3b3b3b",
              width: "100px",
              padding: "10px",
              ":hover": {
                color: "black",
                backgroundColor: "white",
              },
            }}
            onClick={changeBlocked}
          >
            {blocked ? "unblock" : "block"}
          </Button>
        </Box>
        <App isBlocked={false} name={name}>{children}</App>
      </Box>
    </>
  );
}

export default Example;
