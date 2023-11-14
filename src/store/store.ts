import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { KeyboardType, KeyboardStore } from "./types";

export const useKeyboardStore = create<KeyboardStore>()(
  devtools((set, get) => ({
    show: false,
    target: null,
    type: "",
    blocked: true,
    chosedKeyboard: "MicrosoftSwiftKeyboard",
    allKeyboards: {
      one: {
        layout: {
          default: [
            "1 2 3 4 5 6 7 8 9 0",
            "q w e r t y u i o p",
            "a s d f g h j k l ;",
            "{shift} z x c v b n m , .",
            "{lay1} {space} {lay2}",
          ],
        }, // make a function that on layout save/change saves also all keys to buttonTheme to all group
        buttonTheme: [
          {
            class: "background-shadow-black",
            buttons: "1 2 3 4 5 6 7 8 9 0 {lay1} {lay2} {shift}",
          },
          {
            class: "unit-6",
            buttons: "{space}",
          },
          {
            class: "unit-2",
            buttons: "{lay1} {lay2}",
          },
          {
            class: "rounded-button",
            buttons:
              "1 2 3 4 5 6 7 8 9 0 q w e r t y u i o p a s d f g h j k l ; {shift} z x c v b n m , . {lay1} {space} {lay2}",
          },
        ],
        display: {
          "{shift}": "⇧",
          "{lay1}": "&123",
          "{lay2}": "˅",
          "{empty-half}": " ",
          "{backspace}": "⌫",
          "{enter}": "⏎",
          "{\\}": "\\",
        },
      },
      three: {
        layout: {
          default: [
            "1 2 3 4 5",
            "q w e r t y",
            "a s d f g h",
            "{shift} z x c .",
            "{lay1} {space} {lay2}",
          ],
        },
        buttonTheme: [
          {
            class: "unit-6",
            buttons: "{space}",
          },
          {
            class: "unit-2",
            buttons: "{lay1} {lay2} 1 2 3 4 5 6 7 8 9 0",
          },
          {
            class: "border-vine-green",
            buttons:
              "1 2 3 4 5 q w e r t y a s d f g h {shift} z x c . {lay1} {space} {lay2}",
          },
        ],
        display: {
          "{shift}": "⇧",
          "{lay1}": "&123",
          "{lay2}": "˅",
          "{empty-half}": " ",
          "{backspace}": "⌫",
          "{enter}": "⏎",
          "{\\}": "\\",
        },
      },
      MicrosoftSwiftKeyboard: {
        layout: {
          default: [
            "q w e r t y u i o p",
            "{empty-half} a s d f g h j k l {empty-half}",
            "{shift} z x c v b n m {backspace}",
            "{lay1} , {space} . {enter}",
          ],
          special1: [
            "1 2 3 4 5 6 7 8 9 0",
            "@ # £ & _ - ( ) = %",
            `{lay2} " * ' : / ! ? + {small-backspace}`,
            "{lay1abc} , {space} . {enter}",
          ],
          special2: [
            "$ € ¥ ¢ © ® ™ ~ ¿",
            "{tab} [ ] { } < > ^ ¡",
            "{lay2-long} ` ; ÷ {\\} | ¦ ¬ {small-backspace-long}",
            "{lay1abc-long} {small-space} × § ¶ ° {small-enter-long}",
          ],
          shift: [
            "Q W E R T Y U I O P",
            "{empty-half} A S D F G H J K L {empty-half}",
            "{shift} Z X C V B N M {backspace}",
            "{lay1} , {space} . {enter}",
          ],
        },
        buttonTheme: [
          {
            class: "rounded-button",
            buttons:
              "q w e r t y u i o p a s d f g h j k l ; {shift} z x c v b n m , . {lay1} {lay1abc} {lay1abc-long} {space} {small-space} {lay2} {enter} {backspace} {lay2-long} {lay1abc} {small-backspace} {small-enter} {small-backspace-long} {small-enter-long} {tab} 1 2 3 4 5 6 7 8 9 0 @ # & _ - ( ) = % ' * : / ! £ ? + $ € ¥ ¢ © ® ™ ~ ¿ [ ] { } < > ^ ¡ ` ; ÷ {\\} | ¦ ¬ × § ¶ ° Q W E R T Y U I O P A S D F G H J K L Z X C V B N M",
          },
          {
            class: "rounded-button",
            buttons: `"`,
          },
          {
            class: "background-shadow-black",
            buttons:
              "{lay1} {lay2} {shift} . , {enter} {backspace} {tab} {small-enter-long} {small-backspace-long} {small-backspace} {lay2-long} {lay1abc} {lay1abc-long}",
          },
          {
            class: "unit-5",
            buttons: "{space}",
          },
          {
            class: "unit-3",
            buttons: "{small-space}",
          },
          {
            class: "unit-1-5",
            buttons:
              "{lay1} {shift} {backspace} {enter} {lay1abc-long} $ {tab} {lay2-long} {lay1abc} ¿ ¡ {small-backspace-long} {small-enter-long}",
          },
          {
            class: "empty-half",
            buttons: "{empty-half}",
          },
          {
            class: "small",
            buttons: "{lay2}",
          },
        ],
        display: {
          "{shift}": "⇧",
          "{lay1}": "123",
          "{lay1abc}": "abc",
          "{lay2}": "{&=",
          "{empty-half}": " ",
          "{backspace}": "⌫",
          "{enter}": "⏎",
          "{\\}": "\\",
          "{small-backspace}": "⌫",
          "{small-backspace-long}": "⌫",
          "{small-space}": " ",
          "{small-enter}": "⏎",
          "{tab}": "⇥",
          "{small-enter-long}": "⏎",
          "{lay2-long}": "123",
          "{lay1abc-long}": "abc",
        },
      },
    },
    setNewTarget: ({
      show,
      target,
      type,
    }: {
      show: boolean;
      target: HTMLElement | null;
      type: string;
    }) => {
      set({
        show: show,
        target: target,
        type: type,
      });
    },
    setShow: (show: boolean) => {
      set({ show: show });
    },
    setBlocked: (isBlocked: boolean) => {
      set({ blocked: isBlocked });
    },
    setChosenKeyboard: (newChosenKeyboard: string) => {
      set({ chosedKeyboard: newChosenKeyboard });
    },
    addNewConfig: (newConfig: KeyboardType) => {  // TO DO add produce?
      set({ allKeyboards: { ...get().allKeyboards, ...newConfig } });
    },
  }))
);
