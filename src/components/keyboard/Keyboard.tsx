import { useEffect, useRef, useState } from "react";
import { useKeyboardStore } from "../../store/store";
import Keyboard, { KeyboardReactInterface } from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./keyboard.css";

function CustomKeyboard() {
  const [
    show,
    target,
    blocked,
    setNewTarget,
    setShow,
    allKeyboards,
    chosedKeyboard,
  ] = useKeyboardStore((state) => [
    state.show,
    state.target,
    state.blocked,
    state.setNewTarget,
    state.setShow,
    state.allKeyboards,
    state.chosedKeyboard,
  ]);
  const [keyboard, setKeyboard] = useState(allKeyboards[chosedKeyboard]);
  const [layoutName, setLayoutName] = useState("default");
  const [previousValue, setPreviousValue] = useState("");
  const keyboardElement = useRef<KeyboardReactInterface | null>(null);

  useEffect(() => {
    setKeyboard(allKeyboards[chosedKeyboard]);
  }, [chosedKeyboard]);

  const handleOpenKeyboard = (event: Event) => {
    if ((event.target as HTMLElement).tagName === "INPUT")
      setNewTarget({
        show: true,
        target: event.target as HTMLInputElement,
        type: (event.target as HTMLInputElement).type,
      });
    setPreviousValue((event.target as HTMLInputElement).value);
  };

  const handleCloseKeyboard = () => {
    setNewTarget({ show: false, target: null, type: "" });
  };

  useEffect(() => {
    window.addEventListener("focusin", handleOpenKeyboard, false);
    window.addEventListener("focusout", handleCloseKeyboard, false);

    return () => {
      window.removeEventListener("focusin", handleOpenKeyboard);
      window.removeEventListener("focusout", handleOpenKeyboard);
    };
  }, []);

  const onChange = (actualInput: string) => {
    const input = previousValue + actualInput;

    const setter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    )?.set;
    setter?.call(target, input);
  };

  const handleShift = () => {
    if (keyboard.layout["shift"])
      setLayoutName(layoutName === "default" ? "shift" : "default");
  };

  const handleLay1 = () => {
    if (keyboard.layout["special1"])
      setLayoutName(
        layoutName === "default" || layoutName === "shift"
          ? "special1"
          : "default"
      );
  };

  const handleLay2 = () => {
    if (keyboard.layout["special2"])
      setLayoutName(layoutName === "special1" ? "special2" : "special1");
  };

  const onKeyPress = (button: string, e: MouseEvent | undefined) => {
    e?.preventDefault();
    if (button.includes("shift")) handleShift();
    if (button.includes("lay1")) handleLay1();
    if (button.includes("lay2")) handleLay2();
  };

  const onKeyReleased = (button: string) => {
    if (button === "{enter}") {
      target?.blur();
      setTimeout(() => setShow(false), 50);
    }
  };

  if (!show || blocked) return null;

  return (
    <div className={"case"}>
      <div onClick={(e) => e.preventDefault()} className="keyboard">
        {/* <div ref={input} onClick={(e) => e.preventDefault()} className="keyboard"> */}
        <Keyboard
          style={{ "&.hg-button.colored-key": { backgroundColor: "red" } }}
          keyboardRef={(r) => (keyboardElement.current = r)}
          onChange={onChange}
          onKeyPress={onKeyPress}
          onKeyReleased={onKeyReleased}
          layoutName={layoutName}
          layout={keyboard.layout}
          buttonTheme={keyboard.buttonTheme}
          mergeDisplay={true}
          display={keyboard.display}
        />
      </div>
    </div>
  );
}

export default CustomKeyboard;
