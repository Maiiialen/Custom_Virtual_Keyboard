import { useEffect, useRef, useState } from "react";
import { useKeyboardStore } from "../store/store";
import Keyboard, { KeyboardReactInterface } from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./custom-keyboard.scss";

const numericRegex = new RegExp(/[+-]?([0-9]+([.][0-9]*)?)?/);

function CustomKeyboard() {
  const [
    show,
    target,
    type,
    blocked,
    setNewTarget,
    setShow,
    allKeyboards,
    chosedKeyboard,
  ] = useKeyboardStore((state) => [
    state.show,
    state.target,
    state.type,
    state.blocked,
    state.setNewTarget,
    state.setShow,
    state.allKeyboards,
    state.chosedKeyboard,
  ]);
  const [keyboard, setKeyboard] = useState(allKeyboards[chosedKeyboard]);
  const [layoutName, setLayoutName] = useState("default");
  const keyboardElement = useRef<KeyboardReactInterface | null>(null);

  useEffect(() => {
    setKeyboard(allKeyboards[chosedKeyboard]);
  }, [chosedKeyboard]);

  const setValueAndCursor = (input: string, selectionPosition: number) => {
    const setValue = Object.getOwnPropertyDescriptor(
      type === "textarea"
        ? window.HTMLTextAreaElement.prototype
        : window.HTMLInputElement.prototype,
      "value"
    )?.set;
    setValue?.call(target, input);

    const setSelectionStart = Object.getOwnPropertyDescriptor(
      type === "textarea"
        ? window.HTMLTextAreaElement.prototype
        : window.HTMLInputElement.prototype,
      "selectionStart"
    )?.set;
    setSelectionStart?.call(target, selectionPosition);

    const setSelectionEnd = Object.getOwnPropertyDescriptor(
      type === "textarea"
        ? window.HTMLTextAreaElement.prototype
        : window.HTMLInputElement.prototype,
      "selectionEnd"
    )?.set;
    setSelectionEnd?.call(target, selectionPosition);
  };

  const handleOpenKeyboard = (event: Event) => {
    const tagName = (event.target as HTMLElement).tagName;
    const type = (event.target as HTMLInputElement).type;
    if ((tagName === "INPUT" || tagName === "TEXTAREA") && type !== "checkbox")
      setNewTarget({
        show: true,
        target: event.target as HTMLInputElement,
        type: type,
      });
    type === "number" ? setLayoutName("numeric") : setLayoutName("default");

    if (type === "number") {
      (event.target as HTMLInputElement).type = "text";
      (event.target as HTMLInputElement).selectionStart = (
        event.target as HTMLInputElement
      ).value.length;
      event.target?.addEventListener("blur", changeType, false);
    }
  };

  const handleCloseKeyboard = () => {
    setNewTarget({ show: false, target: null, type: "" });
    window.removeEventListener("blur", changeType);
  };

  const changeType = (event: Event) => {
    (event.target as HTMLInputElement).type = "number";
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
    const page = document.getElementById("CustomVirtualKeyboardByMaialen");
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

  const onChange = (_actualInput: string, event: MouseEvent | undefined) => {
    const previousValue = (target as HTMLInputElement).value;
    const selectionStart = Number((target as HTMLInputElement)?.selectionStart);
    if (
      !(event?.target as HTMLButtonElement)?.dataset?.skbtn?.includes(
        "backspace"
      )
    ) {
      if (
        (event?.target as HTMLButtonElement)?.dataset?.skbtn?.includes("space")
      ) {
        const preInput =
          previousValue.slice(0, selectionStart) +
          " " +
          previousValue.slice(selectionStart, previousValue.length);
        const input =
          (type === "number" ? preInput.match(numericRegex)?.[0] : preInput) ??
          "";
        setValueAndCursor(input, selectionStart + 1);
      } else {
        const preInput =
          previousValue.slice(0, selectionStart) +
          (event?.target as HTMLButtonElement)?.dataset?.skbtn +
          previousValue.slice(selectionStart, previousValue.length);
        const input =
          (type === "number" ? preInput.match(numericRegex)?.[0] : preInput) ??
          "";
        setValueAndCursor(input, selectionStart + 1);
      }
    }
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
    const selectionStart = Number((target as HTMLInputElement)?.selectionStart);
    const previousValue = (target as HTMLInputElement).value;
    const input =
      previousValue.slice(0, selectionStart - 1) +
      previousValue.slice(selectionStart, previousValue.length);

    setValueAndCursor(input, selectionStart - 1);
  };

  const handleIncrease = () => {
    let selectionStart = Number((target as HTMLInputElement)?.selectionStart);
    const previousValue = (target as HTMLInputElement).value;
    const input = (Number(previousValue) + 1).toString();
    if (input.length > previousValue.length)
      selectionStart = selectionStart + 1;

    setValueAndCursor(input, selectionStart);
  };

  const handleDecrease = () => {
    let selectionStart = Number((target as HTMLInputElement)?.selectionStart);
    const previousValue = (target as HTMLInputElement).value;
    const input = (Number(previousValue) - 1).toString();
    if (input.length < previousValue.length)
      selectionStart = selectionStart - 1;

    setValueAndCursor(input, selectionStart);
  };

  const onKeyPress = (button: string, e: MouseEvent | undefined) => {
    e?.preventDefault();
    if (button.includes("shift")) handleShift();
    if (button.includes("lay1")) handleLay1();
    if (button.includes("lay2")) handleLay2();
    if (button.includes("backspace")) handleBackspace();
    if (button.includes("{+}")) handleIncrease();
    if (button.includes("{-}")) handleDecrease();
  };

  const onKeyReleased = (button: string) => {
    if (button.includes("enter")) {
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
