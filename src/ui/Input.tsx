import React from 'react';
import './ui.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className={`ui-input-container ${className}`}>
      {label && <label className="ui-input-label">{label}</label>}
      <input 
        className={`ui-input ${error ? 'error' : ''}`} 
        {...props} 
      />
      {error && <span className="ui-input-error">{error}</span>}
    </div>
  );
};
