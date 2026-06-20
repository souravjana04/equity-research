import PropTypes from 'prop-types';

const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const baseClasses = 'font-ui font-medium inline-flex items-center justify-center rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent cursor-pointer';
  
  const variantMap = {
    primary: 'bg-primary text-surface hover:bg-primary/90 border border-transparent',
    secondary: 'bg-surface text-primary border border-default hover:bg-canvas',
    accent: 'bg-accent text-white hover:bg-accent-hover border border-transparent',
    ghost: 'bg-transparent text-secondary hover:text-primary hover:bg-canvas',
  };

  const sizeMap = {
    sm: 'text-[11px] px-3 py-1.5',
    md: 'text-[13px] px-4 py-2',
    lg: 'text-[14px] px-6 py-2.5',
  };

  return (
    <button 
      className={`${baseClasses} ${variantMap[variant] || variantMap.primary} ${sizeMap[size] || sizeMap.md} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'accent', 'ghost']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default Button;
