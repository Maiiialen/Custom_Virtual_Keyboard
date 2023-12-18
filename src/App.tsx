import { ReactNode, useEffect } from "react";
import Keyboard from "./components/keyboard/Keyboard";
// import {
//   Box,
//   Button,
//   MenuItem,
//   Select,
//   SelectChangeEvent,
// } from "@mui/material";
import { useKeyboardStore } from "./store/store";
// import { buttonStyle } from "./AppStyle";

function App({
  children,
  isBlocked = false,
  predefinedName = "MicrosoftSwiftKeyboard",
  customConfig,
}: {
  children: ReactNode;
  isBlocked?: boolean;
  predefinedName?: string;
  customConfig?: JSON;
}) {
  const setBlocked = useKeyboardStore((state) => state.setBlocked);
  const setChosenKeyboard = useKeyboardStore(
    (state) => state.setChosenKeyboard
  );

  if (customConfig) {
    // if(customConfig) // TO DO parse/safeparse with zod
    // useKeyboardStore.getState().addNewConfig(customConfig);
    // setKeyboardName(customConfig);
  }

  useEffect(() => {
    setBlocked(isBlocked);
  }, [isBlocked]);

  useEffect(() => {
    if (predefinedName) setChosenKeyboard(predefinedName);
  }, [predefinedName]);

  // const handleChangeKeyboardName = (event: SelectChangeEvent) => {
  //   setKeyboardName(event.target.value);
  //   useKeyboardStore.getState().setChosenKeyboard(event.target.value);
  // };

  // const changeBlocked = () => {
  //   setBlocked(!useKeyboardStore.getState().blocked);
  // };

  return (
    <>
      {/* // <Box>
    //   <Box
    //     id="page"
    //     sx={{
    //       display: "flex",
    //       flexDirection: "column",
    //       alignItems: "center",
    //       gap: "40px",
    //     }}
    //   >
    //     <Box
    //       sx={{
    //         position: "absolute",
    //         top: 0,
    //         width: "100vw",
    //         display: "flex",
    //         alignItems: "center",
    //         justifyItems: "center",
    //         justifyContent: "center",
    //         gap: "20px",
    //         padding: "5px",
    //         backgroundColor: "#8e8e8e",
    //       }}
    //     >
    //       <Box>
    //         <Select
    //           value={keyboardName}
    //           onChange={handleChangeKeyboardName}
    //           sx={{
    //             backgroundColor: "#3b3b3b",
    //             color: "white",
    //             border: "1px solid #858585",
    //             minWidth: "250px",
    //           }}
    //         >
    //           {Object.keys(allKeyboards).map((keyboard) => (
    //             <MenuItem value={keyboard}>{keyboard}</MenuItem>
    //           ))}
    //         </Select>
    //       </Box>
    //       <Button sx={buttonStyle} onClick={changeBlocked}>
    //         {blocked ? "unblock" : "block"}
    //       </Button>
    //     </Box>
    //     {children}
    //   </Box> */}
      {children}
      <Keyboard />
      {/* </Box> */}
    </>
  );
}

export default App;
