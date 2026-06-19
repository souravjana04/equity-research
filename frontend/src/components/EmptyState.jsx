import PropTypes from 'prop-types';

const EmptyState = ({ icon: Icon, title, subtitle, ctaLabel, onCta }) => {
  return (
    <div className="w-full h-full min-h-[240px] flex flex-col items-center justify-center p-8 text-center bg-surface border border-default rounded-lg">
      <div className="w-16 h-16 rounded-full bg-canvas flex items-center justify-center mb-4">
        {Icon && <Icon className="w-8 h-8 text-muted" />}
      </div>
      <h3 className="font-ui text-[15px] font-medium text-primary mb-1">
        {title}
      </h3>
      <p className="font-ui text-[13px] text-secondary max-w-[280px] mb-5">
        {subtitle}
      </p>
      {ctaLabel && onCta && (
        <button 
          onClick={onCta}
          className="bg-accent hover:bg-accent-hover text-surface font-ui text-[13px] font-medium px-4 py-2 rounded-md transition-colors"
        >
          {ctaLabel}
        </button>
      )}
    </div>
  );
};

EmptyState.propTypes = {
  icon: PropTypes.elementType,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  ctaLabel: PropTypes.string,
  onCta: PropTypes.func,
};

export default EmptyState;
