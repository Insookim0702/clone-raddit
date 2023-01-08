import { FC } from "react";

interface Props {
  className?: string;
  type?: string;
  placeholder?: string;
  value: string;
  error: string | undefined;
  setValue: (str: string) => void;
}

const InputGroup: FC<Props> = ({
  className = "",
  type = "",
  placeholder = "",
  value,
  error,
  setValue,
}) => {
  return (
    <div className="mb-2">
      <input
        type={type}
        className="w-full p-3 transition duration-200 border border-gray-400 bg-gray-50 focus:bg-white hover:bg-white rounded"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <small className="text-red-500 font-medium">{error}</small>
    </div>
  );
};

export default InputGroup;
