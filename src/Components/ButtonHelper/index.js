import './ButtonHelper.css';

const ButtonHelper = ({ className, onClick, disabled, children }) => {
  return (
    <button
      className={className || "main-button-helper"}
      variant="outlined"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ButtonHelper;
