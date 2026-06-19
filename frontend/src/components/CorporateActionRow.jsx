import PropTypes from 'prop-types';

const CorporateActionRow = ({ title, subtitle, badge }) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-subtle last:border-b-0 group hover:bg-page px-2 -mx-2 rounded transition-colors cursor-default">
      <div className="flex flex-col gap-0.5">
        <span className="font-ui text-[13px] font-medium text-primary group-hover:text-accent transition-colors">
          {title}
        </span>
        <span className="font-ui text-[11px] text-muted">
          {subtitle}
        </span>
      </div>
      {badge && (
        <div className="shrink-0 ml-4">
          {badge}
        </div>
      )}
    </div>
  );
};

CorporateActionRow.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  badge: PropTypes.node,
};

export default CorporateActionRow;
