export type KeyboardStore = {
  show: boolean;
  target: HTMLElement | null;
  type: string;
  blocked: boolean;
  chosedKeyboard: string;
  allKeyboards: KeyboardType;
  setNewTarget: ({
    show,
    target,
    type,
  }: {
    show: boolean;
    target: HTMLElement | null;
    type: string;
  }) => void;
  setBlocked: (isBlocked: boolean) => void;
  setShow: (show: boolean) => void;
  setChosenKeyboard: (newChosenKeyboard: string) => void;
  addNewConfig: (newConfig: KeyboardType) => void;
};

export type KeyboardType = {
  [key: string]: {
    layout: Layout;
    buttonTheme: ButtonTheme[];
    display: Display;
  };
};

type Layout = {
  [key: string]: string[];
};

type ButtonTheme = {
  class: string;
  buttons: string;
};

type Display = {
  [key: string]: string;
};
