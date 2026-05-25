import React from 'react';

/**
 * GlassCard - A card component with glassmorphism effect
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} children - Card content
 * @param {boolean} glow - Enable glow effect on hover
 * @param {boolean} hoverLift - Enable lift effect on hover
 */
export function GlassCard({ 
  children, 
  className = '', 
  glow = false,
  hoverLift = false,
  ...props 
}) {
  const baseClasses = 'glass-card rounded-xl p-6';
  const glowClass = glow ? 'glow-border' : '';
  const liftClass = hoverLift ? 'hover-lift' : '';
  
  return (
    <div className={`${baseClasses} ${glowClass} ${liftClass} ${className}`} {...props}>
      {children}
    </div>
  );
}

export default GlassCard;





