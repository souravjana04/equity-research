import PropTypes from 'prop-types';

const SectorHeatmapTile = ({ sector, change, stocks = [], size = 'md', trend }) => {
  const variantMap = {
    gain: 'bg-gain-bg border-gain-border text-gain',
    loss: 'bg-loss-bg border-loss-border text-loss',
    flat: 'bg-muted border-default text-secondary',
  };

  const sizeClasses = {
    lg: 'min-h-[140px] p-3',
    md: 'min-h-[100px] p-3',
    sm: 'min-h-[60px] p-2 flex items-center justify-between',
  };

  const showChildren = size === 'lg' && stocks.length > 0;

  return (
    <div className={`rounded-lg border ${variantMap[trend]} ${sizeClasses[size]} flex flex-col transition-transform hover:scale-[1.01] cursor-pointer`}>
      <div className={`flex ${size === 'sm' ? 'items-center justify-between w-full' : 'justify-between mb-auto'}`}>
        <span className="font-ui text-[13px] font-semibold">{sector}</span>
        <span className="font-mono text-[13px] font-medium">{change}</span>
      </div>

      {showChildren && (
        <div className="mt-3 flex flex-col gap-1.5">
          {stocks.slice(0, 4).map((stock, idx) => (
            <div key={idx} className="flex justify-between items-center bg-surface/50 rounded px-1.5 py-1">
              <span className="font-mono text-[11px] font-medium truncate max-w-[60%] opacity-90">{stock.ticker}</span>
              <span className="font-mono text-[11px] font-medium opacity-90">{stock.change}</span>
            </div>
          ))}
          {stocks.length > 4 && (
            <div className="text-center font-ui text-[10px] opacity-70 mt-1">
              +{stocks.length - 4} more
            </div>
          )}
        </div>
      )}
    </div>
  );
};

SectorHeatmapTile.propTypes = {
  sector: PropTypes.string.isRequired,
  change: PropTypes.string.isRequired,
  stocks: PropTypes.arrayOf(
    PropTypes.shape({
      ticker: PropTypes.string.isRequired,
      change: PropTypes.string.isRequired,
    })
  ),
  size: PropTypes.oneOf(['lg', 'md', 'sm']),
  trend: PropTypes.oneOf(['gain', 'loss', 'flat']).isRequired,
};

export default SectorHeatmapTile;
