import "../styles/componentStyles/Error.scss";
import { noSignal } from "../img/images";
import { IErrorMessage } from "../models/IErrorMessage";

interface IError {
  error: IErrorMessage;
}

export const ErrorMessage = ({ error }: IError) => {
  return (
    <div className="error">
      <img src={noSignal} alt="error-gif" className="error-img"></img>
      <h3 className="error-caption">Ошибка: {error.name}</h3>
      <p className="error-message">
        Произошла ошибка с кодом: {error.code}, сообщение: {error.message}
      </p>
    </div>
  );
};
