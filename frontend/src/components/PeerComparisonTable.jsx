import PropTypes from 'prop-types';

const PeerComparisonTable = ({ peers, currentTicker }) => {
  return (
    <div className="w-full bg-surface border border-default rounded-lg overflow-x-auto flex flex-col">
      <table className="w-full text-left border-collapse">
        <thead className="bg-surface border-b border-subtle sticky top-0">
          <tr>
            <th className="px-4 py-3 font-ui text-[10px] font-semibold tracking-[0.05em] uppercase text-muted">Company</th>
            <th className="px-4 py-3 text-right font-ui text-[10px] font-semibold tracking-[0.05em] uppercase text-muted">P/E</th>
            <th className="px-4 py-3 text-right font-ui text-[10px] font-semibold tracking-[0.05em] uppercase text-muted">EV/EBITDA</th>
            <th className="px-4 py-3 text-right font-ui text-[10px] font-semibold tracking-[0.05em] uppercase text-muted">3Y Sales Gr.</th>
            <th className="px-4 py-3 text-right font-ui text-[10px] font-semibold tracking-[0.05em] uppercase text-muted">ROCE</th>
          </tr>
        </thead>
        <tbody>
          {peers.map((peer, idx) => {
            const isCurrent = peer.ticker === currentTicker;
            return (
              <tr key={idx} className={`border-b border-subtle hover:bg-page transition-colors ${isCurrent ? 'bg-bg-accent/50' : ''}`}>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className={`font-ui text-[13px] ${isCurrent ? 'font-semibold text-accent' : 'font-medium text-primary'}`}>
                    {peer.name}
                  </div>
                  <div className="font-mono text-[11px] text-muted">{peer.ticker}</div>
                </td>
                <td className="px-4 py-3 text-right font-mono text-[13px] text-primary">{peer.pe}</td>
                <td className="px-4 py-3 text-right font-mono text-[13px] text-primary">{peer.evEbitda}</td>
                <td className={`px-4 py-3 text-right font-mono text-[13px] ${parseFloat(peer.salesGrowth) >= 0 ? 'text-gain' : 'text-loss'}`}>
                  {peer.salesGrowth}%
                </td>
                <td className="px-4 py-3 text-right font-mono text-[13px] text-primary">{peer.roce}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

PeerComparisonTable.propTypes = {
  peers: PropTypes.arrayOf(
    PropTypes.shape({
      ticker: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      pe: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      evEbitda: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      salesGrowth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      roce: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
  currentTicker: PropTypes.string.isRequired,
};

export default PeerComparisonTable;
