import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useState,
  KeyboardEvent,
} from "react";
import Style from "@styles/components/SearchBar.module.scss";
import { AiOutlineSearch as Launch } from "react-icons/ai";
import useTranslation from "next-translate/useTranslation";

interface SearchBarProps {
  onSearch: (str: string) => void;
  onIconKeyDown: (str: string, e: KeyboardEvent<HTMLDivElement>) => void;
  className?: string;
  placeholder?: string;
  ariaLabel: string;
}

export default function SearchBar({
  onSearch,
  onIconKeyDown,
  className,
  placeholder = "",
  ariaLabel,
}: SearchBarProps) {
  const [input, setInput] = useState("");
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setInput(event.target.value);
  };
  const search = () => {
    onSearch(input);
  };
  const handleEnterKey: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
      search();
    }
  };
  const { t } = useTranslation();
  return (
    <div className={`${Style.wrapper} ${className}`}>
      <input
        onChange={handleChange}
        onKeyPress={handleEnterKey}
        placeholder={placeholder}
      />
      <div
        role="button"
        onClick={search}
        className="btn"
        aria-label={ariaLabel}
        onKeyDown={(e) => onIconKeyDown(input, e)}
        tabIndex={0}
      >
        <Launch />
      </div>
    </div>
  );
}
