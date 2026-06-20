import PropTypes from 'prop-types';
import { ExternalLink, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const ConcallBadge = ({ status, url }) => {
  if (status === 'n/a' || !status) {
    return <span className="font-ui text-xs text-muted">—</span>;
  }

  const baseClasses = "font-ui text-xs font-medium rounded-md border px-2 py-0.5 inline-flex items-center justify-center gap-1.5 transition-colors";

  if (status === 'ready') {
    const badge = (
      <span className={`${baseClasses} bg-accent/10 border-accent text-accent hover:bg-accent/20 cursor-pointer`}>
        Summary Ready <ExternalLink className="w-3 h-3" />
      </span>
    );
    if (url) {
      return <Link to={url}>{badge}</Link>;
    }
    return badge;
  }

  if (status === 'pending') {
    return (
      <span className={`${baseClasses} bg-muted/10 border-default text-muted`}>
        <Clock className="w-3 h-3" /> Pending
      </span>
    );
  }

  return null;
};

ConcallBadge.propTypes = {
  status: PropTypes.oneOf(['ready', 'pending', 'n/a']),
  url: PropTypes.string,
};

export default ConcallBadge;
