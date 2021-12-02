import './Popup.css';

interface propType {
  handleClose: () => void;
  content: object;
}

const Popup = (props: propType) => {
  return (
    <div className="popup-box">
      <div className="box rounded-2xl">
        <span className="close-icon" onClick={props.handleClose}>
          x
        </span>
        {props.content}
      </div>
    </div>
  );
};

export default Popup;
