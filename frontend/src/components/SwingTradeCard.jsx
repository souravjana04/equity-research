import PropTypes from 'prop-types';
import { TrendingUp } from 'lucide-react';
import StatusBadge from './StatusBadge';

const SwingTradeCard = ({ ticker, entry, target, stopLoss, status, setupType }) => {
  return (
    <div className="bg-surface border border-default rounded-lg p-card-padding flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2 text-primary font-ui text-[15px] font-medium">
          <TrendingUp className="w-4 h-4 text-accent" />
          <span>Swing Strategy</span>
          <span className="font-mono text-[13px] text-muted ml-1">{ticker}</span>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="flex flex-col">
          <span className="font-ui text-[10px] font-semibold tracking-[0.05em] uppercase text-muted mb-1">Entry</span>
          <span className="font-mono text-[13px] font-medium text-primary">{entry}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-ui text-[10px] font-semibold tracking-[0.05em] uppercase text-muted mb-1">Target</span>
          <span className="font-mono text-[13px] font-medium text-gain">{target}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-ui text-[10px] font-semibold tracking-[0.05em] uppercase text-muted mb-1">Stop Loss</span>
          <span className="font-mono text-[13px] font-medium text-loss">{stopLoss}</span>
        </div>
      </div>

      {setupType && (
        <div className="mt-auto pt-4 border-t border-subtle flex items-center">
          <span className="font-ui text-[11px] bg-canvas text-secondary px-2 py-1 rounded-sm">
            Setup: {setupType}
          </span>
        </div>
      )}
    </div>
  );
};

SwingTradeCard.propTypes = {
  ticker: PropTypes.string.isRequired,
  entry: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  target: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  stopLoss: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  status: PropTypes.oneOf(['ACTIVE', 'EXITED', 'PAUSED', 'INVALIDATED']).isRequired,
  setupType: PropTypes.string,
};

export default SwingTradeCard;
