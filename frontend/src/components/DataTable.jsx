import { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown } from 'lucide-react';
import TickerBadge from './TickerBadge';
import Checkbox from './Checkbox';
import SkeletonRow from './SkeletonRow';

const PAGE_SIZE = 20;

const DataTable = ({ columns, rows, loading, selectable, onRowClick, footer }) => {
  const [page, setPage] = useState(0);

  if (loading) {
    return (
      <div className="w-full bg-surface border border-default rounded-lg overflow-hidden">
        <div className="h-10 border-b border-subtle bg-page flex items-center px-4">
          <div className="h-3 bg-canvas rounded w-[10%]"></div>
        </div>
        {[...Array(5)].map((_, i) => <SkeletonRow key={i} />)}
      </div>
    );
  }

  const renderCell = (col, row) => {
    const val = row[col.key];

    switch (col.type) {
      case 'ticker':
        return <TickerBadge ticker={val} />;
      case 'number':
        return <span className="font-mono">{val}</span>;
      case 'change': {
        const isGain = parseFloat(val) >= 0;
        return (
          <span className={`font-mono ${isGain ? 'text-gain' : 'text-loss'}`}>
            {val}
          </span>
        );
      }
      case 'badge':
        return col.renderBadge ? col.renderBadge(row) : val;
      case 'sparkline':
        // Placeholder for a small chart
        return <div className="w-16 h-4 bg-canvas rounded-full"></div>;
      default:
        return <span className="font-ui text-primary">{val}</span>;
    }
  };

  return (
    <div className="w-full bg-surface border border-default rounded-lg overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-surface z-10">
            <tr>
              {selectable && (
                <th className="px-4 py-3 border-b border-subtle w-10">
                  <Checkbox checked={false} onChange={() => {}} />
                </th>
              )}
              {columns.map((col) => (
                <th 
                  key={col.key}
                  className={`px-4 py-3 border-b border-subtle font-ui text-[10px] font-semibold tracking-[0.05em] uppercase text-muted whitespace-nowrap group
                    ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'}
                    ${col.sortable ? 'cursor-pointer select-none' : ''}
                  `}
                >
                  <div className={`flex items-center gap-1 ${col.align === 'right' ? 'justify-end' : col.align === 'center' ? 'justify-center' : 'justify-start'}`}>
                    {col.label}
                    {col.sortable && (
                      <ChevronDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-muted" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE).map((row, idx) => (
              <tr
                key={idx}
                onClick={() => onRowClick && onRowClick(row)}
                className={`border-b border-subtle hover:bg-page transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
              >
                {selectable && (
                  <td className="px-4 py-3 w-10">
                    <Checkbox checked={false} onChange={() => {}} />
                  </td>
                )}
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-3 text-[13px] whitespace-nowrap
                      ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'}
                    `}
                  >
                    {renderCell(col, row)}
                  </td>
                ))}
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-4 py-8 text-center font-ui text-[13px] text-muted">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {footer ? footer : (() => {
        const totalPages = Math.ceil(rows.length / PAGE_SIZE);
        return (
          <div className="px-4 py-3 border-t border-subtle bg-surface flex items-center justify-between font-ui text-[11px] text-muted">
            <span>Showing {Math.min(rows.length, (page + 1) * PAGE_SIZE)} of {rows.length} results</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
                className="px-2 py-1 border border-default rounded hover:bg-canvas transition-colors disabled:opacity-50"
              >Prev</button>
              <span>{page + 1} / {totalPages || 1}</span>
              <button
                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="px-2 py-1 border border-default rounded hover:bg-canvas transition-colors disabled:opacity-50"
              >Next</button>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['text', 'ticker', 'number', 'change', 'badge', 'sparkline']),
      align: PropTypes.oneOf(['left', 'center', 'right']),
      renderBadge: PropTypes.func,
    })
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool,
  selectable: PropTypes.bool,
  onRowClick: PropTypes.func,
  footer: PropTypes.node,
};

export default DataTable;
