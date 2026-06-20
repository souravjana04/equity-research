import PropTypes from 'prop-types';
import TickerBadge from './TickerBadge';

const EarningsEventCard = ({ ticker, name, event, date, daysLeft }) => {
  // Determine color coding for the urgency of the event
  let badgeClass = 'bg-canvas border-default text-secondary';
  if (daysLeft <= 2) {
    badgeClass = 'bg-loss-bg border-loss-border text-loss font-semibold';
  } else if (daysLeft <= 5) {
    badgeClass = 'bg-warning-bg border-warning-border text-warning font-medium';
  }

  return (
    <div className="flex items-center justify-between py-2.5 border-b border-subtle last:border-b-0 hover:bg-page/50 px-1 transition-colors rounded-sm gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <TickerBadge ticker={ticker} />
        <div className="flex flex-col min-w-0">
          <span className="font-ui text-[13px] font-medium text-primary truncate">
            {name}
          </span>
          <span className="font-ui text-[11px] text-muted truncate">
            {event}
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-4 shrink-0">
        <span className="font-mono text-[12px] text-secondary">
          {date}
        </span>
        <span className={`font-ui text-[10px] px-2 py-0.5 rounded-sm border ${badgeClass}`}>
          {daysLeft}d left
        </span>
      </div>
    </div>
  );
};

EarningsEventCard.propTypes = {
  ticker: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  event: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  daysLeft: PropTypes.number.isRequired,
};

export default EarningsEventCard;
