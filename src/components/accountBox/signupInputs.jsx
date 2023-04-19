import { Input } from "./common";
import { ErrorMessage } from "./common";

const FormInput = (props) => {
    const { errMsg, onChange, id, ...inputProps } = props;

    return (
        <div className="form-group">
            <Input {...inputProps}
              onChange={onChange}/>
            <ErrorMessage>{errMsg}</ErrorMessage>
        </div>
    );
};

export default FormInput;