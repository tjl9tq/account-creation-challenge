import React, { ChangeEvent, useState } from 'react';

interface Props {
  label: string;
  onChange?: (value: string) => void;
  required?: boolean;
  type?: string;
  onBlur?: () => void;
}

export function Input({ onChange, label, required = true, type, onBlur }: Props) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const id = label.replace(/ /gm, '_');

  const validateValue = (value: string) => {
    if (value.length === 0) {
      setError(`${label} is required`);
    } else {
      setError('');
    }
  };

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const {
      target: { value },
    } = event;
    setValue(value);
    if (error) validateValue(value);
    onChange?.(value);
  }

  const handleOnFocus = () => {
    setIsFocused(true);
  };

  const handleOnBlur = (event: ChangeEvent<HTMLInputElement>) => {
    setIsFocused(false);
    validateValue(event.target.value);
    onBlur?.();
  };

  return (
    <div className="my-8 relative">
      <label
        className={`absolute text-sm font-semibold text-slate-500 top-5 left-2 transition-tranform transition-top duration-200 cursor-text pointer-events-none ${
          (isFocused || Boolean(value)) && 'transform scale-[.66] !top-1 !left-0.5'
        }`}
      >
        {label}
      </label>
      <input
        id={id}
        required={required}
        className={`w-full px-3 pt-6 pb-1 border-b-2 focus:outline-none ${isFocused && 'border-wealthfront'}  ${
          error && '!border-red-500'
        } transition duration-200`}
        value={value}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onChange={handleChange}
        type={type}
      />
      <div className={`transition-height duration-200 h-0 ${error && 'h-1.5'}`}>
        {error && <div className="text-xs text-red-500 my-3 mx-2.5">{error}</div>}
      </div>
    </div>
  );
}
