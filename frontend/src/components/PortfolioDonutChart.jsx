import PropTypes from 'prop-types';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const PortfolioDonutChart = ({ data, totalLabel, totalValue }) => {
  return (
    <div className="bg-surface border border-default rounded-lg p-card-padding flex flex-col items-center">
      <div className="relative w-48 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={70}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {/* Center Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="font-ui text-[10px] font-semibold tracking-[0.05em] uppercase text-muted mb-1">
            {totalLabel}
          </span>
          <span className="font-mono text-[20px] font-medium leading-[24px] text-primary">
            {totalValue}
          </span>
        </div>
      </div>
      
      {/* Legend */}
      <div className="w-full mt-6 flex flex-col gap-2">
        {data.map((entry, index) => {
          // Assuming values are already percentages for display, or we calculate it. 
          // If value is raw, we might need a pct prop, but let's assume entry.pct exists or we just show value.
          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="font-ui text-[13px] text-secondary">{entry.name}</span>
              </div>
              <span className="font-mono text-[13px] font-medium text-primary">
                {entry.value}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

PortfolioDonutChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
  totalLabel: PropTypes.string.isRequired,
  totalValue: PropTypes.string.isRequired,
};

export default PortfolioDonutChart;
