import PropTypes from 'prop-types';
import TickerBadge from './TickerBadge';

const WatchlistCard = ({ ticker, ltp, dayChange }) => {
  const isGain = dayChange >= 0;
  const changeText = `${isGain ? '+' : ''}${dayChange.toFixed(2)}%`;
  const textClass = isGain ? 'text-gain' : 'text-loss';

  return (
    <div className="flex items-center justify-between py-2 border-b border-subtle last:border-b-0 hover:bg-page/50 px-1 transition-colors rounded-sm">
      <div className="flex items-center gap-2">
        <TickerBadge ticker={ticker} variant={isGain ? 'gain' : 'loss'} />
      </div>
      <div className="flex items-center gap-4">
        <span className="font-mono text-[13px] text-primary">
          ₹{ltp.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
        <span className={`font-mono text-[13px] font-medium w-16 text-right ${textClass}`}>
          {changeText}
        </span>
      </div>
    </div>
  );
};

WatchlistCard.propTypes = {
  ticker: PropTypes.string.isRequired,
  ltp: PropTypes.number.isRequired,
  dayChange: PropTypes.number.isRequired,
};

export default WatchlistCard;
