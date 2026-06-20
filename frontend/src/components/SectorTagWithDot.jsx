import PropTypes from 'prop-types';
import SectorTag from './SectorTag';

export const sectorColors = {
  'Financials': '#10B981', 'IT Services': '#3B82F6', 'Consumer': '#F59E0B',
  'Automobile': '#8B5CF6', 'Pharma': '#EF4444', 'Energy': '#14B8A6',
  'Metals': '#64748B', 'Real Estate': '#F97316', 'Infra': '#0EA882',
  'FMCG': '#EAB308', 'Telecom': '#06B6D4', 'Power': '#6366F1', 'Others': '#A1A1AA'
};

const SectorTagWithDot = ({ sector }) => (
  <SectorTag>
    <div className="flex items-center gap-1.5">
      <div 
        className="w-2 h-2 rounded-full shrink-0" 
        style={{ backgroundColor: sectorColors[sector] || sectorColors['Others'] }}
      />
      {sector}
    </div>
  </SectorTag>
);

SectorTagWithDot.propTypes = {
  sector: PropTypes.string.isRequired,
};

export default SectorTagWithDot;
