import React from 'react';

/**
 * FeatureCard - A card component for displaying features
 * @param {React.ReactNode} icon - Icon to display
 * @param {string} title - Feature title
 * @param {string} description - Feature description
 * @param {boolean} hoverLift - Enable lift effect on hover
 */
export function FeatureCard({ 
  icon, 
  title, 
  description,
  hoverLift = true,
  className = '',
  ...props 
}) {
  return (
    <div 
      className={`card-modern p-8 text-center ${hoverLift ? 'hover-lift' : ''} ${className}`}
      {...props}
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl 
        bg-gradient-to-br from-[var(--accent-primary-glow)] to-[var(--accent-secondary-glow)] 
        mb-6 group-hover:scale-110 transition-transform duration-300">
        <div className="text-[var(--accent-primary)]">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-[var(--text-secondary)]">{description}</p>
    </div>
  );
}

export default FeatureCard;





