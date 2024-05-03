import { useEffect, useRef, useState } from "react";
import { useKeyboardStore } from "../../store/store";
import Keyboard, { KeyboardReactInterface } from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./keyboard.scss";

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
    const tagName = (event.target as HTMLElement).tagName
    if (tagName === "INPUT" || tagName === "TEXTAREA")
      setNewTarget({
        show: true,
        target: event.target as HTMLInputElement,
        type: (event.target as HTMLInputElement).type,
      });
    setPreviousValue((event.target as HTMLInputElement).value);
    setLayoutName("default");
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

  useEffect(() => {
    const page = document.getElementById("page");
    const keyboardOverlay = document.getElementById("keyboard");
    if (target) {
      const difference =
        target.getBoundingClientRect()?.bottom -
        (window.innerHeight - (keyboardOverlay?.offsetHeight ?? 0));
      if (show && !blocked && page) {
        page.style.transform = `translateY(-${difference + 20}px)`;
      }
    }
    return () => {
      if (page) {
        page.style.transform = "";
      }
    };
  }, [target, show, blocked]);

  const onChange = (actualInput: string) => {
    console.log("onChange", previousValue, actualInput)
    const input = previousValue + actualInput.slice(-1);
    setPreviousValue(input);

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

  const handleBackspace = () => {
    const input = previousValue.slice(0, -1);
    setPreviousValue(input);

    const setter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    )?.set;
    setter?.call(target, input);
  };

  const onKeyPress = (button: string, e: MouseEvent | undefined) => {
    console.log("onKeyPress")
    e?.preventDefault();
    if (button.includes("shift")) handleShift();
    if (button.includes("lay1")) handleLay1();
    if (button.includes("lay2")) handleLay2();
    if (button.includes("backspace")) handleBackspace();
  };

  const onKeyReleased = (button: string) => {
    if (button === "{enter}") {
      target?.blur();
      setTimeout(() => setShow(false), 50);
    }
  };

  if (!show || blocked) return null;

  return (
    <div
      id="keyboard"
      className="keyboard"
      onMouseDown={(e) => e.preventDefault()}
    >
      <Keyboard
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
  );
}

export default CustomKeyboard;
