import { ReactNode } from "react";
import Keyboard from "./components/keyboard/Keyboard";

function App({
  children,
  isBlocked,
}: {
  children: ReactNode;
  isBlocked: boolean;
}) {
  return (
    <div>
      {children}
      <Keyboard isBlocked={isBlocked} />
    </div>
  );
}

export default App;
