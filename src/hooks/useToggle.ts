import { useState } from "react";

export default function useToggle(initialValue: boolean) {
  const [isOpen, setIsOpen] = useState(initialValue);

  const toggle = () => {
    // setIsOpen(!isOpen); // Can break in some cases
    setIsOpen((prev) => !prev);
  };
  return [isOpen, toggle, setIsOpen] as const;
}
