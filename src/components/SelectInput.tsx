import React from "react";

interface SelectInputProps {
    id: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    label: string;
    options: { value: string; label: string }[];
    required?: boolean;
    disabled?: boolean;
}

function SelectInput({
    id,
    name,
    value,
    onChange,
    label,
    options,
    required,
    disabled,
}: SelectInputProps) {
    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">
                {label}
            </label>
            <select
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className="form-select"
                required={required}
                disabled={disabled}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SelectInput;
