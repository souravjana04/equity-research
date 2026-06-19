import PropTypes from 'prop-types';
import { Info, AlertTriangle, AlertCircle, CheckCircle, X } from 'lucide-react';

const AlertBanner = ({ type = 'info', message, dismissible = false, onDismiss }) => {
  const config = {
    info: { icon: Info, border: 'border-l-info', bg: 'bg-info-bg', text: 'text-info' },
    warning: { icon: AlertTriangle, border: 'border-l-warning', bg: 'bg-warning-bg', text: 'text-warning' },
    error: { icon: AlertCircle, border: 'border-l-loss', bg: 'bg-loss-bg', text: 'text-loss' },
    success: { icon: CheckCircle, border: 'border-l-gain', bg: 'bg-gain-bg', text: 'text-gain' },
  };

  const { icon: Icon, border, bg, text } = config[type] || config.info;

  return (
    <div className={`w-full flex items-start gap-3 p-3 rounded-r-md border-l-4 border-y border-r border-default ${border} ${bg}`}>
      <Icon className={`w-5 h-5 shrink-0 ${text}`} />
      <div className="flex-1 pt-0.5 font-ui text-[13px] leading-[18px] text-primary">
        {message}
      </div>
      {dismissible && (
        <button 
          onClick={onDismiss}
          className="shrink-0 p-1 rounded-md hover:bg-black/5 text-muted hover:text-primary transition-colors focus:outline-none"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

AlertBanner.propTypes = {
  type: PropTypes.oneOf(['info', 'warning', 'error', 'success']),
  message: PropTypes.node.isRequired,
  dismissible: PropTypes.bool,
  onDismiss: PropTypes.func,
};

export default AlertBanner;
