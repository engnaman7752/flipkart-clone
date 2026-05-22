const SectionCard = ({ title, headerClassName = '', children, className = '' }) => (
  <div className={`${className}`}>
    {title && (
      <div className={`p-3 sm:p-4 rounded-t-sm shadow-sm border-l border-r border-t ${headerClassName}`}>
        <h2 className="fk-section-header">{title}</h2>
      </div>
    )}
    <div className={`fk-card ${title ? 'rounded-t-none border-t-0' : ''} p-3 sm:p-4`}>
      {children}
    </div>
  </div>
);

export default SectionCard;
