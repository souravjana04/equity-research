import PropTypes from 'prop-types';
import TickerBadge from './TickerBadge';
import SignalBadge from './SignalBadge';
import Button from './Button';
import { X, ArrowRight } from 'lucide-react';

const SwingTradeCard = ({ 
  ticker, 
  company, 
  signal, 
  entryLow, 
  entryHigh, 
  target, 
  stopLoss, 
  rr, 
  onDismiss, 
  onOpenTrade 
}) => {
  let rrColor = 'text-primary';
  if (rr >= 2) {
    rrColor = 'text-gain';
  } else if (rr >= 1) {
    rrColor = 'text-warning';
  } else {
    rrColor = 'text-loss';
  }

  const formatNumber = (num) => new Intl.NumberFormat('en-IN').format(num);

  return (
    <div className="bg-surface border border-default rounded-lg p-4 flex flex-col hover:border-accent/50 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <TickerBadge ticker={ticker} />
          <span className="text-sm font-medium text-primary">{company}</span>
        </div>
        <SignalBadge signal={signal} />
      </div>

      <div className="grid grid-cols-4 gap-2 mb-5">
        <div className="flex flex-col">
          <span className="text-xs text-muted mb-1">Entry Zone</span>
          <span className="font-mono text-sm">₹{formatNumber(entryLow)}–{formatNumber(entryHigh)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-muted mb-1">Target</span>
          <span className="font-mono text-sm text-gain">₹{formatNumber(target)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-muted mb-1">Stop Loss</span>
          <span className="font-mono text-sm text-loss">₹{formatNumber(stopLoss)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-muted mb-1">R:R</span>
          <span className={`font-mono text-sm font-bold ${rrColor}`}>{rr} : 1</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto pt-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onDismiss}
          className="text-muted hover:text-loss !px-2"
        >
          <X className="w-4 h-4 mr-1" />
          Dismiss
        </Button>
        <Button 
          variant="accent" 
          size="sm" 
          onClick={onOpenTrade}
        >
          Open Trade <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

SwingTradeCard.propTypes = {
  ticker: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  signal: PropTypes.string.isRequired,
  entryLow: PropTypes.number.isRequired,
  entryHigh: PropTypes.number.isRequired,
  target: PropTypes.number.isRequired,
  stopLoss: PropTypes.number.isRequired,
  rr: PropTypes.number.isRequired,
  onDismiss: PropTypes.func,
  onOpenTrade: PropTypes.func,
};

export default SwingTradeCard;
