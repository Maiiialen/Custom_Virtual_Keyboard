import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { KeyboardStore } from "./types";

export const useKeyboardStore = create<KeyboardStore>()(
  devtools((set) => ({
    show: false,
    target: null,
    type: "",
    blocked: true,
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
  }))
);
