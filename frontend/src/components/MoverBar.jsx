import PropTypes from 'prop-types';

const MoverBar = ({ ticker, change, trend, barWidth }) => {
  const isGain = trend === 'gain';
  const colorClass = isGain ? 'bg-gain' : 'bg-loss';
  const textClass = isGain ? 'text-gain' : 'text-loss';

  return (
    <div className="flex items-center w-full gap-3 py-1.5 group">
      <span className="font-mono text-[13px] text-primary w-20 shrink-0 truncate group-hover:text-accent transition-colors cursor-pointer">
        {ticker}
      </span>
      
      <div className="flex-1 h-2 bg-canvas rounded-full overflow-hidden relative">
        <div 
          className={`absolute top-0 bottom-0 left-0 rounded-full transition-all duration-500 ${colorClass}`}
          style={{ width: `${Math.min(Math.max(barWidth, 0), 100)}%` }}
        />
      </div>
      
      <span className={`font-mono text-[13px] font-medium w-16 text-right shrink-0 ${textClass}`}>
        {change}
      </span>
    </div>
  );
};

MoverBar.propTypes = {
  ticker: PropTypes.string.isRequired,
  change: PropTypes.string.isRequired,
  trend: PropTypes.oneOf(['gain', 'loss']).isRequired,
  barWidth: PropTypes.number.isRequired, // 0 to 100
};

export default MoverBar;
