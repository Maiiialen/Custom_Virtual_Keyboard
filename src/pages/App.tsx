import { ReactNode, useEffect } from "react";
import { useKeyboardStore } from "../store/store";
import Keyboard from "../keyboard/CustomKeyboard";

function App({
  children,
  isBlocked = false,
  name = "MicrosoftSwiftKeyboard",
}: {
  children: ReactNode;
  isBlocked?: boolean;
  name?: string;
}) {
  const setBlocked = useKeyboardStore((state) => state.setBlocked);
  const setChosenKeyboard = useKeyboardStore(
    (state) => state.setChosenKeyboard
  );

  useEffect(() => {
    setBlocked(isBlocked);
  }, [isBlocked]);

  useEffect(() => {
    if (name) setChosenKeyboard(name);
    console.log("name", name)
  }, [name]);

  return (
    <>
      <div id="CustomVirtualKeyboardByMaialen">{children}</div>
      <Keyboard />
    </>
  );
}

export default App;
