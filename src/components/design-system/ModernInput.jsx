import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

/**
 * ModernInput - An input component with modern styling
 * @param {string} label - Input label
 * @param {React.ReactNode} icon - Icon to display
 * @param {string} type - Input type
 * @param {string} placeholder - Placeholder text
 */
export function ModernInput({ 
  label, 
  icon, 
  type = 'text', 
  placeholder,
  id,
  required = false,
  className = '',
  ...props 
}) {
  return (
    <div className={`space-y-3 ${className}`}>
      {label && (
        <Label htmlFor={id} className="text-[var(--text-secondary)]">
          {label}
        </Label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--accent-primary)]">
            {icon}
          </span>
        )}
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          required={required}
          className={`bg-[var(--glass-bg)] border-[var(--border-subtle)] 
            hover:border-[var(--border-glow)] focus:border-[var(--accent-primary)] 
            transition-all duration-300 ${icon ? 'pl-12' : ''}`}
          {...props}
        />
      </div>
    </div>
  );
}

export default ModernInput;





