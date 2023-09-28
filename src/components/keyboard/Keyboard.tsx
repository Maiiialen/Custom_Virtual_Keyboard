import { useEffect, useRef, useState } from "react";
import { useKeyboardStore } from "../../store/store";
import Keyboard from "react-simple-keyboard";
import { layout1, display, buttonTheme } from "./KeyboardLayout";
import "react-simple-keyboard/build/css/index.css";
import "./keyboard.css";

function CustomKeyboard({ isBlocked }: { isBlocked: boolean }) {
  const [show, target, type, blocked, setNewTarget, setShow, setBlocked] =
    useKeyboardStore((state) => [
      state.show,
      state.target,
      state.type,
      state.blocked,
      state.setNewTarget,
      state.setShow,
      state.setBlocked,
    ]);
  const [layout, setLayout] = useState(layout1);
  const [layoutName, setLayoutName] = useState("default");
  const [theme, setTheme] = useState("default");
  const keyboard = useRef<HTMLInputElement | null>(null);
  // const input = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setBlocked(isBlocked);
  }, [isBlocked]);

  const handleOpenKeyboard = (event: Event) => {
    if ((event.target as HTMLElement).tagName === "INPUT")
      setNewTarget({
        show: true,
        target: event.target as HTMLElement,
        type: (event.target as HTMLInputElement).type,
      });
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
    const input = actualInput;
    if (keyboard.current) keyboard.current.value = input;

    const setter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    )?.set;
    setter?.call(target, input);

    const ev = new Event("input", { bubbles: true });
    target?.dispatchEvent(ev);
  };

  const handleShift = () => {
    setLayoutName(layoutName === "default" ? "shift" : "default");
  };

  const onKeyPress = (button: string, e: MouseEvent|undefined) => {
    e?.preventDefault();
    if (button === "{shift}") handleShift();
  };

  const onKeyReleased = (button: string) => {
    if (button === "{enter}") {
      target?.blur();
      setTimeout(() => setShow(false), 50);
    }
  };

  if (!show || blocked) return null;

  return (
    <div className="case">
      <div onClick={(e) => e.preventDefault()} className="keyboard">
        {/* <div ref={input} onClick={(e) => e.preventDefault()} className="keyboard"> */}
        <Keyboard
          keyboardRef={(r) => (keyboard.current = r)}
          onChange={onChange}
          onKeyPress={onKeyPress}
          onKeyReleased={onKeyReleased}
          layoutName={layoutName}
          layout={layout}
          buttonTheme={buttonTheme()}
          mergeDisplay={true}
          display={display}
        />
      </div>
    </div>
  );
}

export default CustomKeyboard;
