import PropTypes from 'prop-types';

const MomentumBar = ({ score }) => {
  let colorClass = 'bg-loss';
  if (score > 65) colorClass = 'bg-gain';
  else if (score >= 40) colorClass = 'bg-warning';

  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-sm text-primary w-6 text-right">{score}</span>
      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className={`h-full ${colorClass} rounded-full transition-all duration-500`}
          style={{ width: `${Math.min(Math.max(score, 0), 100)}%` }}
        />
      </div>
    </div>
  );
};

MomentumBar.propTypes = {
  score: PropTypes.number.isRequired,
};

export default MomentumBar;
