import "./ModalPopUp.scss";

const ModalPopUp = (props) => {

  return (
    <>
      <div className="modal-child">
        <p className="modal-child-description">Ответьте на все вопросы, чтобы продолжить</p>
        <button className="modal-child-exit" onClick={props.removeModalHandler}>Назад</button>
      </div>
    </>
  );
};

export default ModalPopUp;
