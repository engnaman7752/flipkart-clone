const PageContainer = ({ children, className = '' }) => (
  <div className={`fk-container py-4 sm:py-6 ${className}`}>{children}</div>
);

export default PageContainer;
