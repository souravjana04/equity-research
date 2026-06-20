import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export default function AlertPopover({ 
  ticker, 
  ltp, 
  initialTarget, 
  initialDirection, 
  position, 
  onClose, 
  onSave 
}) {
  const [alertTarget, setAlertTarget] = useState(initialTarget || ltp.toString());
  const [alertDirection, setAlertDirection] = useState(initialDirection || 'above');
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div 
      ref={popoverRef}
      className="absolute z-[100] w-[280px] bg-surface border border-default rounded-lg shadow-[var(--shadow)] p-4 text-left"
      style={{ top: position.top, left: position.left }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-3 border-b border-subtle pb-2">
        <h4 className="font-ui text-[13px] font-medium text-primary">Set Price Alert</h4>
        <span className="font-ui text-[11px] font-semibold text-secondary">{ticker}</span>
      </div>
      
      <div className="mb-4">
        <p className="font-ui text-[11px] text-muted mb-1">Current LTP</p>
        <p className="font-mono text-[13px] text-primary">₹{ltp.toFixed(2)}</p>
      </div>

      <div className="space-y-3 mb-4">
        <div>
          <label className="block font-ui text-[11px] font-medium text-secondary mb-1">Target Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-muted text-[13px]">₹</span>
            <input 
              type="number"
              className="w-full bg-canvas border border-default rounded-md pl-7 pr-3 py-1.5 text-[13px] font-mono focus:outline-none focus:border-accent"
              value={alertTarget}
              onChange={(e) => setAlertTarget(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block font-ui text-[11px] font-medium text-secondary mb-1">Alert when:</label>
          <div className="flex gap-2">
            <button 
              className={`flex-1 py-1.5 rounded-full text-[11px] font-medium transition-colors border ${alertDirection === 'above' ? 'bg-primary text-surface border-primary' : 'bg-canvas text-secondary border-default hover:bg-subtle'}`}
              onClick={() => setAlertDirection('above')}
            >
              ● Above
            </button>
            <button 
              className={`flex-1 py-1.5 rounded-full text-[11px] font-medium transition-colors border ${alertDirection === 'below' ? 'bg-primary text-surface border-primary' : 'bg-canvas text-secondary border-default hover:bg-subtle'}`}
              onClick={() => setAlertDirection('below')}
            >
              ○ Below
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        <button 
          className="px-3 py-1.5 text-[11px] font-medium text-secondary hover:bg-canvas rounded-md transition-colors"
          onClick={onClose}
        >
          Cancel
        </button>
        <button 
          className="px-3 py-1.5 text-[11px] font-medium bg-accent hover:bg-accent-hover text-surface rounded-md transition-colors"
          onClick={() => onSave(alertTarget, alertDirection)}
        >
          Set Alert
        </button>
      </div>
    </div>
  );
}

AlertPopover.propTypes = {
  ticker: PropTypes.string.isRequired,
  ltp: PropTypes.number.isRequired,
  initialTarget: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  initialDirection: PropTypes.oneOf(['above', 'below']),
  position: PropTypes.shape({
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
