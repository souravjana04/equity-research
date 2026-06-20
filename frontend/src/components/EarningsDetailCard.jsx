import PropTypes from 'prop-types';
import { Clock, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import TickerBadge from './TickerBadge';
import EarningsBadge from './EarningsBadge';

const EarningsDetailCard = ({ evt }) => {
  return (
    <div className="border border-default rounded-md p-4 bg-page/30 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Link to={`/stock/${evt.ticker}`} state={{ from: 'Earnings', fromPath: '/earnings' }} className="hover:opacity-80">
            <TickerBadge ticker={evt.ticker} />
          </Link>
          <div className="flex flex-col">
            <span className="font-medium text-sm text-primary">{evt.company}</span>
            <span className="text-xs text-muted">{evt.quarter}</span>
          </div>
        </div>
      </div>
      
      <div className="text-xs text-muted flex items-center gap-1.5">
        <Clock className="w-3.5 h-3.5" />
        Reporting: {evt.timing}
      </div>

      <div className="flex items-center justify-between mt-1 bg-surface border border-subtle p-2.5 rounded">
        <div className="flex flex-col">
          <span className="text-[11px] text-muted uppercase tracking-wider mb-0.5">EPS Est</span>
          <span className="font-mono text-sm text-primary">₹{evt.epsEst.toFixed(2)}</span>
        </div>
        <div className="w-px h-8 bg-subtle"></div>
        <div className="flex flex-col text-right">
          <span className="text-[11px] text-muted uppercase tracking-wider mb-0.5">Revenue Est</span>
          <span className="font-mono text-sm text-primary">₹{evt.revEst.toLocaleString('en-IN')} Cr</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted">Status:</span>
          <EarningsBadge type={evt.result} />
        </div>
        {evt.result === 'pending' && (
          <button className="flex items-center gap-1.5 px-2.5 py-1.5 border border-default rounded text-xs font-medium text-primary hover:bg-subtle transition-colors">
            <Bell className={`w-3.5 h-3.5 ${evt.reminderSet ? 'fill-warning text-warning' : ''}`} />
            {evt.reminderSet ? 'Reminder Set' : 'Set Reminder'}
          </button>
        )}
      </div>
    </div>
  );
};

EarningsDetailCard.propTypes = {
  evt: PropTypes.shape({
    ticker: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    quarter: PropTypes.string.isRequired,
    timing: PropTypes.string.isRequired,
    epsEst: PropTypes.number.isRequired,
    revEst: PropTypes.number.isRequired,
    result: PropTypes.oneOf(['beat', 'miss', 'inline', 'pending']).isRequired,
    reminderSet: PropTypes.bool,
  }).isRequired,
};

export default EarningsDetailCard;
