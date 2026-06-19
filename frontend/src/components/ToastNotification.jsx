import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Info, AlertTriangle, AlertCircle, CheckCircle, X } from 'lucide-react';

const ToastNotification = ({ type = 'info', message, duration = 3000, onClose }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const config = {
    info: { icon: Info, text: 'text-info' },
    warning: { icon: AlertTriangle, text: 'text-warning' },
    error: { icon: AlertCircle, text: 'text-loss' },
    success: { icon: CheckCircle, text: 'text-gain' },
  };

  const { icon: Icon, text } = config[type] || config.info;

  const content = (
    <div className="fixed top-6 right-6 z-[200] animate-in slide-in-from-right fade-in duration-300">
      <div className="flex items-start gap-3 bg-surface border border-default shadow-lg rounded-lg p-4 w-80">
        <Icon className={`w-5 h-5 shrink-0 ${text}`} />
        <div className="flex-1 font-ui text-[13px] leading-[18px] text-primary">
          {message}
        </div>
        <button 
          onClick={onClose}
          className="shrink-0 text-muted hover:text-primary transition-colors focus:outline-none"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return createPortal(content, document.body);
};

ToastNotification.propTypes = {
  type: PropTypes.oneOf(['info', 'warning', 'error', 'success']),
  message: PropTypes.node.isRequired,
  duration: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};

export default ToastNotification;
