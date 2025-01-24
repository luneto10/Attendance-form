import React from "react";

interface TextInputProps {
    id: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    placeholder: string;
    required?: boolean;
}

function TextInput({
    id,
    name,
    value,
    onChange,
    label,
    placeholder,
    required,
}: TextInputProps) {
    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">
                {label}
            </label>
            <input
                type="text"
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className="form-control"
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
}

export default TextInput;
