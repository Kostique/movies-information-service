import React, { useEffect, useState } from "react";

interface Props {
  onSearch: (searchTerm: string) => void;
  delay?: number;
  placeholder?: string;
}

const MyInput: React.FC<Props> = ({
  onSearch,
  delay = 700,
  placeholder = "Поиск...",
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const debounceId = setTimeout(() => {
      onSearch(searchTerm);
    }, delay);

    return () => clearTimeout(debounceId);
  }, [searchTerm, delay, onSearch]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  return (
    <form action="#" className="form">
      <div className="form__custom-input">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleChange}
          onFocus={(event: React.FocusEvent<HTMLInputElement>) =>
            onSearch(searchTerm)
          }
        />
      </div>
    </form>
  );
};

export default MyInput;
