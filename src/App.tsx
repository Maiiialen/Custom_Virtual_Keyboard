import { ReactNode, useState, useEffect } from "react";
import Keyboard from "./components/keyboard/Keyboard";
import {
  Box,
  Button,
  // InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useKeyboardStore } from "./store/store";
import { buttonStyle } from "./AppStyle";

function App({
  children,
  isBlocked,
  predefinedName,
  customConfig,
}: {
  children: ReactNode;
  isBlocked: boolean;
  predefinedName?: string;
  customConfig?: JSON;
}) {
  const [keyboardName, setKeyboardName] = useState(
    useKeyboardStore((state) => state.chosedKeyboard)
  );
  const allKeyboards = useKeyboardStore((state) => state.allKeyboards);
  const [blocked, setBlocked] = useKeyboardStore((state) => [
    state.blocked,
    state.setBlocked,
  ]);

  if (customConfig) {
    // if(customConfig) // TO DO parse/safeparse with zod
    // useKeyboardStore.getState().addNewConfig(customConfig);
    // setKeyboardName(customConfig);
  }

  useEffect(() => {
    setBlocked(isBlocked);
  }, [isBlocked]);

  useEffect(() => {
    if (predefinedName) setKeyboardName(predefinedName);
  }, [predefinedName]);

  const handleChangeKeyboardName = (event: SelectChangeEvent) => {
    setKeyboardName(event.target.value);
    useKeyboardStore.getState().setChosenKeyboard(event.target.value);
  };

  const changeBlocked = () => {
    setBlocked(!useKeyboardStore.getState().blocked);
  };

  return (
    <Box>
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
            {/* <InputLabel id="demo-simple-select-label" sx={{ color: "white" }}>
              Keyboard
            </InputLabel> */}
            <Select
              value={keyboardName}
              // label="Keyboard"
              onChange={handleChangeKeyboardName}
              sx={{
                backgroundColor: "#3b3b3b",
                color: "white",
                border: "1px solid #858585",
                minWidth: "250px",
              }}
            >
              {Object.keys(allKeyboards).map((keyboard) => (
                <MenuItem value={keyboard}>{keyboard}</MenuItem>
              ))}
            </Select>
          </Box>
          <Button sx={buttonStyle} onClick={changeBlocked}>
            {blocked ? "unblock" : "block"}
          </Button>
        </Box>
        {children}
      </Box>
      <Keyboard />
    </Box>
  );
}

export default App;
