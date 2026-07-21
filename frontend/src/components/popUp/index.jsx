import "../../styles/popup.css";

const Popup = ({show,title,text,image,buttonText = "Continue",onAction}) => {
  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="inspect-screen">
        <p className="inspect-heading">
          YOU DISCOVERED
        </p>
        {image && (
          <img
            src={image}
            alt={title}
            className="inspect-image"
          />
        )}
        <h2 className="inspect-title">
          {title}
        </h2>
        <p className="inspect-text">
          {text}
        </p>

        <button
          className="inspect-btn"
          onClick={onAction}
        >
          {buttonText}
        </button>

      </div>

    </div>
  );
};

export default Popup;