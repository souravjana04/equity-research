import { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronRight } from 'lucide-react';

const formatValue = (val) => {
  if (val === null || val === undefined) return '-';
  if (typeof val === 'number') {
    if (val < 0) {
      return `(${Math.abs(val).toLocaleString()})`;
    }
    return val.toLocaleString();
  }
  return val;
};

const Row = ({ row, periods, level = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = row.children && row.children.length > 0;

  return (
    <>
      <tr className="border-b border-subtle hover:bg-page group transition-colors cursor-pointer" onClick={() => hasChildren && setIsExpanded(!isExpanded)}>
        <td className="px-4 py-2 font-ui text-[13px] text-primary whitespace-nowrap flex items-center" style={{ paddingLeft: `${16 + level * 16}px` }}>
          {hasChildren ? (
            <ChevronRight className={`w-3.5 h-3.5 mr-1.5 text-muted transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
          ) : (
            <span className="w-5" /> // Spacer for alignment
          )}
          <span className={level === 0 ? 'font-medium' : ''}>{row.label}</span>
        </td>
        {periods.map((_, idx) => (
          <td key={idx} className="px-4 py-2 text-right font-mono text-[13px] text-primary">
            {formatValue(row.values[idx])}
          </td>
        ))}
        {row.yoy !== undefined && (
          <td className={`px-4 py-2 text-right font-mono text-[13px] ${parseFloat(row.yoy) >= 0 ? 'text-gain' : 'text-loss'}`}>
            {row.yoy}%
          </td>
        )}
      </tr>
      {isExpanded && hasChildren && row.children.map((child, idx) => (
        <Row key={idx} row={child} periods={periods} level={level + 1} />
      ))}
    </>
  );
};

Row.propTypes = {
  row: PropTypes.object.isRequired,
  periods: PropTypes.array.isRequired,
  level: PropTypes.number,
};

const ExpandableFinancialsTable = ({ rows, periods }) => {
  return (
    <div className="w-full bg-surface border border-default rounded-lg overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-surface border-b border-subtle">
          <tr>
            <th className="px-4 py-3 font-ui text-[10px] font-semibold tracking-[0.05em] uppercase text-muted">
              Metric
            </th>
            {periods.map((period, idx) => (
              <th key={idx} className="px-4 py-3 text-right font-ui text-[10px] font-semibold tracking-[0.05em] uppercase text-muted">
                {period}
              </th>
            ))}
            <th className="px-4 py-3 text-right font-ui text-[10px] font-semibold tracking-[0.05em] uppercase text-muted">
              YoY %
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <Row key={idx} row={row} periods={periods} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

ExpandableFinancialsTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  periods: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ExpandableFinancialsTable;
