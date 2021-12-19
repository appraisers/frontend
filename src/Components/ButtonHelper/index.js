import './ButtonHelper.css';

const ButtonHelper = ({ onClick, disabled, children }) => {
  return (
    <button
      className="main-button-helper"
      variant="outlined"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ButtonHelper;
