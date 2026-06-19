import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";
import "./Input.css";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hasError?: boolean;
}

export function TextInput({ label, error, hasError, id, className = "", ...rest }: TextInputProps) {
  return (
    <div className={`fg ${hasError ? "has-error" : ""} ${className}`}>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...rest} />
      {error && <span className="ferr">{error}</span>}
    </div>
  );
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hasError?: boolean;
}

export function TextArea({ label, error, hasError, id, className = "", ...rest }: TextAreaProps) {
  return (
    <div className={`fg ${hasError ? "has-error" : ""} ${className}`}>
      <label htmlFor={id}>{label}</label>
      <textarea id={id} {...rest} />
      {error && <span className="ferr">{error}</span>}
    </div>
  );
}

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  hasError?: boolean;
  options: string[];
  placeholder?: string;
}

export function SelectInput({ label, error, hasError, id, options, placeholder, className = "", ...rest }: SelectInputProps) {
  return (
    <div className={`fg ${hasError ? "has-error" : ""} ${className}`}>
      <label htmlFor={id}>{label}</label>
      <select id={id} {...rest}>
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      {error && <span className="ferr">{error}</span>}
    </div>
  );
}
