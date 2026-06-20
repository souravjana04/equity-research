import PropTypes from 'prop-types';

export default function PositionBar({ low, high, current }) {
  const range = high - low;
  const position = current - low;
  const percent = Math.min(Math.max((position / range) * 100, 0), 100);
  
  return (
    <div className="flex items-center w-full min-w-[80px]" title={`Low: ₹${low} | High: ₹${high}`}>
      <div className="w-full h-1.5 bg-muted rounded-full relative">
        <div 
          className="absolute top-0 bottom-0 bg-accent rounded-full" 
          style={{ left: 0, width: `${percent}%` }}
        ></div>
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-1.5 h-3 bg-primary rounded-sm border border-surface shadow-sm"
          style={{ left: `calc(${percent}% - 3px)` }}
        ></div>
      </div>
    </div>
  );
}

PositionBar.propTypes = {
  low: PropTypes.number.isRequired,
  high: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
};
