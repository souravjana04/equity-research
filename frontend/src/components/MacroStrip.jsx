import PropTypes from 'prop-types';

const MacroStrip = ({ items }) => {
  const trendStyles = {
    gain: 'text-gain',
    loss: 'text-loss',
    neutral: 'text-muted',
  };

  return (
    <div className="w-full bg-surface border-b border-subtle overflow-x-auto no-scrollbar">
      <div className="flex items-center whitespace-nowrap min-w-max px-4">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center">
            <div className="flex items-center gap-2 py-2 px-3 hover:bg-page transition-colors cursor-default">
              <span className="font-ui text-[11px] font-medium text-muted uppercase tracking-tight">
                {item.label}
              </span>
              <span className="font-mono text-[13px] text-primary">
                {item.value}
              </span>
              <span className={`font-mono text-[11px] ${trendStyles[item.trend] || trendStyles.neutral}`}>
                {item.change}
              </span>
            </div>
            {idx < items.length - 1 && (
              <div className="w-px h-4 bg-border-subtle shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

MacroStrip.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      change: PropTypes.string.isRequired,
      trend: PropTypes.oneOf(['gain', 'loss', 'neutral']).isRequired,
    })
  ).isRequired,
};

export default MacroStrip;
