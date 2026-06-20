import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const SectorHeatmapTile = ({ sector, changeValue }) => {
  const navigate = useNavigate();
  
  const isStrong = changeValue > 2 || changeValue < -2;
  const isModerate = (changeValue > 1 && changeValue <= 2) || (changeValue < -1 && changeValue >= -2);
  
  let bgClass = 'bg-surface';
  let textClass = 'text-primary';
  
  if (changeValue > 0) {
    if (isStrong) { bgClass = 'bg-gain'; textClass = 'text-white'; }
    else if (isModerate) { bgClass = 'bg-gain/60'; textClass = 'text-white'; }
    else { bgClass = 'bg-gain/20'; textClass = 'text-gain'; }
  } else if (changeValue < 0) {
    if (isStrong) { bgClass = 'bg-loss'; textClass = 'text-white'; }
    else if (isModerate) { bgClass = 'bg-loss/60'; textClass = 'text-white'; }
    else { bgClass = 'bg-loss/20'; textClass = 'text-loss'; }
  }
  
  let trendLabel = "→ Flat";
  if (changeValue > 1) trendLabel = "▲ Leading today";
  else if (changeValue < -1) trendLabel = "▼ Lagging today";

  return (
    <div 
      className={`rounded-lg min-h-[120px] p-4 flex flex-col justify-between transition-transform hover:scale-[1.02] cursor-pointer shadow-sm border border-border/50 ${bgClass} ${textClass}`}
      onClick={() => navigate(`/screener?sector=${sector}`)}
    >
      <div>
        <h3 className={`text-sm font-medium ${textClass === 'text-white' ? 'opacity-90' : ''}`}>
          {sector}
        </h3>
        <div className="mt-2 text-center">
          <span className="text-2xl font-mono font-bold">
            {changeValue > 0 ? '+' : ''}{changeValue.toFixed(1)}%
          </span>
          <div className={`text-xs mt-0.5 ${textClass === 'text-white' ? 'opacity-80' : 'opacity-70'}`}>
            {trendLabel}
          </div>
        </div>
      </div>
      <div className={`text-xs mt-3 text-center font-medium ${textClass} ${textClass === 'text-white' ? 'opacity-90' : 'opacity-80 hover:text-accent'}`}>
        Screen stocks →
      </div>
    </div>
  );
};

SectorHeatmapTile.propTypes = {
  sector: PropTypes.string.isRequired,
  changeValue: PropTypes.number.isRequired,
};

export default SectorHeatmapTile;
