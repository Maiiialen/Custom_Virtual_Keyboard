import { ReactNode, useEffect } from "react";
import { useKeyboardStore } from "../store/store";
import Keyboard from "../keyboard/Keyboard";

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

  useEffect(() => {
    setBlocked(isBlocked);
  }, [isBlocked]);

  useEffect(() => {
    if (predefinedName) setChosenKeyboard(predefinedName);
  }, [predefinedName]);

  return (
    <>
      <div id="page">{children}</div>
      <Keyboard />
    </>
  );
}

export default App;
