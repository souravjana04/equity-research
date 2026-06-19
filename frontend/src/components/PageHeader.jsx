import PropTypes from 'prop-types';

const PageHeader = ({ title, subtitle, action }) => {
  return (
    <div className="flex items-center justify-between mb-section-gap">
      <div>
        <h1 className="font-ui text-[22px] font-semibold leading-[32px] tracking-[-0.4px] text-primary">
          {title}
        </h1>
        {subtitle && (
          <p className="font-ui text-[13px] leading-[18px] text-secondary mt-1">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

PageHeader.propTypes = {
  title: PropTypes.node.isRequired,
  subtitle: PropTypes.node,
  action: PropTypes.node,
};

export default PageHeader;
