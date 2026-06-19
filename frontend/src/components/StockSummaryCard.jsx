import PropTypes from 'prop-types';
import TickerBadge from './TickerBadge';
import SectorTag from './SectorTag';
import StatusBadge from './StatusBadge';

const StockSummaryCard = ({ ticker, name, sector, ltp, changePct, pe, roce, thesis, thesisStatus }) => {
  const isGain = parseFloat(changePct) >= 0;

  return (
    <div className="bg-surface border border-default rounded-lg p-card-padding flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div>
          <TickerBadge ticker={ticker} variant={isGain ? 'gain' : 'loss'} />
          <div className="mt-3 flex items-center gap-2">
            <h2 className="font-ui text-[15px] font-medium text-primary">{name}</h2>
            <SectorTag>{sector}</SectorTag>
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono text-[20px] font-medium leading-[24px] text-primary">{ltp}</div>
          <div className={`font-mono text-[13px] ${isGain ? 'text-gain' : 'text-loss'}`}>
            {changePct}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 mb-5">
        <div className="flex flex-col">
          <span className="font-ui text-[10px] font-semibold tracking-[0.05em] uppercase text-muted">P/E</span>
          <span className="font-mono text-[13px] font-medium text-primary">{pe}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-ui text-[10px] font-semibold tracking-[0.05em] uppercase text-muted">ROCE</span>
          <span className="font-mono text-[13px] font-medium text-primary">{roce}%</span>
        </div>
      </div>

      <div className="w-full h-px bg-border-subtle my-2" />

      <div className="mt-3">
        <div className="flex items-center justify-between mb-2">
          <span className="font-ui text-[10px] font-semibold tracking-[0.05em] uppercase text-muted">Thesis</span>
          {thesisStatus && <StatusBadge status={thesisStatus} />}
        </div>
        <p className="font-ui text-[13px] leading-[18px] text-secondary line-clamp-2">
          {thesis}
        </p>
      </div>
    </div>
  );
};

StockSummaryCard.propTypes = {
  ticker: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  sector: PropTypes.string.isRequired,
  ltp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  changePct: PropTypes.string.isRequired,
  pe: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  roce: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  thesis: PropTypes.string.isRequired,
  thesisStatus: PropTypes.string,
};

export default StockSummaryCard;
