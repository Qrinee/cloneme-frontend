import React from 'react';
import { Button } from '@/components/ui/button';

/**
 * ModernButton - A button component with modern styling
 * @param {string} variant - Button variant: 'primary', 'secondary', 'outline', 'ghost'
 * @param {string} size - Button size: 'sm', 'default', 'lg'
 * @param {boolean} gradient - Use gradient background
 * @param {boolean} hoverLift - Enable lift effect on hover
 * @param {React.ReactNode} children - Button content
 */
export function ModernButton({ 
  children, 
  variant = 'primary',
  size = 'default',
  gradient = false,
  hoverLift = false,
  className = '',
  ...props 
}) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return gradient 
          ? 'bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] hover:opacity-90'
          : 'bg-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/90';
      case 'secondary':
        return 'bg-[var(--bg-tertiary)] hover:bg-[var(--bg-card-hover)]';
      case 'outline':
        return 'border-[var(--border-glow)] hover:bg-[var(--glass-bg)] hover:border-[var(--accent-primary)]';
      case 'ghost':
        return 'text-[var(--text-secondary)] hover:text-white hover:bg-[var(--glass-bg)]';
      default:
        return '';
    }
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    default: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const liftClass = hoverLift ? 'hover-lift' : '';
  
  return (
    <Button 
      className={`${getVariantClasses()} ${sizeClasses[size]} ${liftClass} transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}

export default ModernButton;





