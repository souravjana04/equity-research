import PropTypes from 'prop-types';

const MacroStrip = ({ items }) => {
  const trendStyles = {
    gain: 'text-gain',
    loss: 'text-loss',
    neutral: 'text-muted',
  };

  // Duplicate items multiple times to ensure the strip is wide enough for a seamless loop on large screens
  const scrollItems = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full bg-surface border-b border-subtle overflow-hidden relative">
      <div className="flex items-center w-max animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
        {scrollItems.map((item, idx) => (
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
            {/* Always show the divider since we are looping */}
            <div className="w-px h-4 bg-default shrink-0" />
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
