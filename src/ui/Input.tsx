import React, { useId } from 'react';
import './ui.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', id, ...props }) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className={`ui-input-container ${className}`}>
      {label && (
        <label htmlFor={inputId} className="ui-input-label">
          {label}
        </label>
      )}
      <input 
        id={inputId}
        className={`ui-input ${error ? 'error' : ''}`} 
        {...props} 
      />
      {error && <span className="ui-input-error">{error}</span>}
    </div>
  );
};
