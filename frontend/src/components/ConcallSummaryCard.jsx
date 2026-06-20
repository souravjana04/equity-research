import PropTypes from 'prop-types';
import { ArrowRight } from 'lucide-react';
import TickerBadge from './TickerBadge';
import SentimentBadge from './SentimentBadge';

const ConcallSummaryCard = ({ ticker, quarter, sentiment, summary, keyPoints = [], actions, isCompact = false }) => {
  return (
    <div className="bg-surface border border-default rounded-lg p-card-padding flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TickerBadge ticker={ticker} />
          <span className="font-ui text-[13px] text-muted">{quarter} Concall</span>
        </div>
        <SentimentBadge sentiment={sentiment} />
      </div>

      <p className={`font-ui text-[13px] leading-[18px] text-primary mb-4 ${isCompact ? 'line-clamp-2' : 'line-clamp-3'}`}>
        {summary}
      </p>

      {!isCompact && keyPoints && keyPoints.length > 0 && (
        <div className="mb-4 flex-1">
          <ul className="space-y-2">
            {keyPoints.slice(0, 3).map((point, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-border-strong mt-1.5 shrink-0" />
                <span className="font-ui text-[12px] leading-[16px] text-secondary">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-auto pt-4 border-t border-subtle">
        {actions ? (
          <div className="flex items-center justify-end gap-3">
            {actions}
          </div>
        ) : (
          <button className="flex items-center gap-1 font-ui text-[13px] font-medium text-accent hover:text-accent-hover transition-colors group">
            {isCompact ? 'View Full' : 'View Summary'}
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
};

ConcallSummaryCard.propTypes = {
  ticker: PropTypes.string.isRequired,
  quarter: PropTypes.string.isRequired,
  sentiment: PropTypes.oneOf(['POSITIVE', 'CAUTIOUS', 'NEGATIVE', 'NEUTRAL']).isRequired,
  summary: PropTypes.string.isRequired,
  keyPoints: PropTypes.arrayOf(PropTypes.string),
  actions: PropTypes.node,
  isCompact: PropTypes.bool,
};

export default ConcallSummaryCard;
