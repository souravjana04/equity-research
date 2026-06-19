import PropTypes from 'prop-types';
import { ArrowRight } from 'lucide-react';
import TickerBadge from './TickerBadge';
import StatusBadge from './StatusBadge';

const ThesisCard = ({ ticker, thesis, horizon, status, entryPrice, targetPrice }) => {
  return (
    <div className="bg-surface border border-default rounded-lg p-card-padding flex flex-col">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <TickerBadge ticker={ticker} />
        <span className="font-ui text-[10px] font-semibold tracking-[0.05em] uppercase border border-default rounded-sm px-1.5 py-0.5 text-secondary">
          {horizon}
        </span>
        <div className="ml-auto">
          <StatusBadge status={status} />
        </div>
      </div>

      <p className="font-ui text-[13px] leading-[18px] text-primary flex-1 mb-4">
        {thesis}
      </p>

      <div className="mt-auto pt-3 border-t border-subtle flex items-center font-mono text-[11px] text-muted">
        <span>Entry: {entryPrice}</span>
        <ArrowRight className="w-3 h-3 mx-2 text-border-strong" />
        <span>Target: {targetPrice}</span>
      </div>
    </div>
  );
};

ThesisCard.propTypes = {
  ticker: PropTypes.string.isRequired,
  thesis: PropTypes.string.isRequired,
  horizon: PropTypes.oneOf(['SHORT', 'MEDIUM', 'LONG']).isRequired,
  status: PropTypes.oneOf(['ACTIVE', 'EXITED', 'PAUSED', 'INVALIDATED']).isRequired,
  entryPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  targetPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default ThesisCard;
