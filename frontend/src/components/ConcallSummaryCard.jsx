import PropTypes from 'prop-types';
import { ArrowRight } from 'lucide-react';
import TickerBadge from './TickerBadge';
import SentimentBadge from './SentimentBadge';

const ConcallSummaryCard = ({ ticker, quarter, sentiment, summary, keyPoints }) => {
  return (
    <div className="bg-surface border border-default rounded-lg p-card-padding flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TickerBadge ticker={ticker} />
          <span className="font-ui text-[13px] text-muted">{quarter} Concall</span>
        </div>
        <SentimentBadge sentiment={sentiment} />
      </div>

      <p className="font-ui text-[13px] leading-[18px] text-primary mb-4 line-clamp-3">
        {summary}
      </p>

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

      <div className="mt-auto pt-3 border-t border-subtle">
        <button className="flex items-center gap-1 font-ui text-[13px] font-medium text-accent hover:text-accent-hover transition-colors group">
          View Summary
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};

ConcallSummaryCard.propTypes = {
  ticker: PropTypes.string.isRequired,
  quarter: PropTypes.string.isRequired,
  sentiment: PropTypes.oneOf(['POSITIVE', 'CAUTIOUS', 'NEGATIVE', 'NEUTRAL']).isRequired,
  summary: PropTypes.string.isRequired,
  keyPoints: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ConcallSummaryCard;
