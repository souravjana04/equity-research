import PropTypes from 'prop-types';

const Badge = ({ children, variant = 'muted', className = '' }) => {
  const baseClasses = 'font-ui text-[10px] font-semibold leading-[12px] tracking-[0.05em] uppercase rounded-sm border px-2 py-1 inline-flex items-center justify-center';
  
  const variantMap = {
    muted: 'bg-canvas border-default text-muted',
    primary: 'bg-surface border-strong text-primary',
    accent: 'bg-accent/10 border-accent/20 text-accent',
    gain: 'bg-gain-bg border-gain-border text-gain',
    loss: 'bg-loss-bg border-loss-border text-loss',
    warning: 'bg-warning-bg border-warning-border text-warning',
    info: 'bg-info-bg border-info-border text-info',
  };

  return (
    <span className={`${baseClasses} ${variantMap[variant] || variantMap.muted} ${className}`}>
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['muted', 'primary', 'accent', 'gain', 'loss', 'warning', 'info']),
  className: PropTypes.string,
};

export default Badge;
