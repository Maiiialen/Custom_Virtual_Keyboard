export type KeyboardStore = {
  show: boolean;
  target: HTMLElement | null;
  type: string;
  blocked: boolean;
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
};
