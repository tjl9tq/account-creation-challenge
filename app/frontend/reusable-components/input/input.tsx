import React, { ChangeEvent, useState } from 'react';

interface Props {
  label: string;
  onChange?: (value: string) => void;
  required?: boolean;
  error?: string;
}

export function Input({ onChange, label, required = true, error = 'password is required' }: Props) {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const id = label.replace(/ /gm, '_');

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
    onChange?.(event.target.value);
  }

  return (
    <div className="my-8 relative">
      <label
        className={`absolute text-sm font-semibold text-slate-500 top-3 left-2 transition-tranform transition-top duration-200 ${
          (isFocused || Boolean(value)) && 'transform scale-[.66] top-0 left-0'
        }`}
      >
        {label}
      </label>
      <input
        id={id}
        required={required}
        className="block w-full px-2 pt-4 pb-1 border-b-2 border-slate-300 "
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={handleChange}
      />
      {error && <div className="text-sm text-red-500">{error}</div>}
    </div>
  );
}
