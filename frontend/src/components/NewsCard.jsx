import PropTypes from 'prop-types';
import SentimentBadge from './SentimentBadge';

const NewsCard = ({ headline, source, date, sentiment, excerpt, url, isCompact = false }) => {
  if (isCompact) {
    return (
      <div className="bg-surface border border-default rounded-lg p-3.5 flex items-center justify-between hover:border-strong transition-colors gap-4">
        <div className="flex flex-col gap-1 min-w-0">
          <h3 className="font-ui text-[13.5px] font-medium text-primary leading-snug truncate">
            {url ? (
              <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                {headline}
              </a>
            ) : (
              headline
            )}
          </h3>
          <div className="font-ui text-[11px] text-muted">
            <span>{source}</span> • <span>{date}</span>
          </div>
        </div>
        <div className="shrink-0">
          <SentimentBadge sentiment={sentiment} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-default rounded-lg p-card-padding flex flex-col hover:border-strong transition-colors group">
      <div className="flex items-start justify-between gap-4 mb-2">
        <h3 className="font-ui text-base font-medium text-primary leading-snug">
          {headline}
        </h3>
        <SentimentBadge sentiment={sentiment} />
      </div>
      
      <div className="font-ui text-[11px] text-muted mb-3">
        <span>{source}</span> • <span>{date}</span>
      </div>
      
      {excerpt && (
        <p className="font-ui text-[13px] text-secondary leading-relaxed line-clamp-2 mb-4">
          {excerpt}
        </p>
      )}
      
      {url && (
        <div className="mt-auto">
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-ui text-[13px] font-medium text-accent hover:text-accent-hover transition-colors inline-flex items-center gap-1"
          >
            Read more <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </a>
        </div>
      )}
    </div>
  );
};

NewsCard.propTypes = {
  headline: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  sentiment: PropTypes.oneOf(['POSITIVE', 'CAUTIOUS', 'NEGATIVE', 'NEUTRAL']).isRequired,
  excerpt: PropTypes.string,
  url: PropTypes.string,
  isCompact: PropTypes.bool,
};

export default NewsCard;
