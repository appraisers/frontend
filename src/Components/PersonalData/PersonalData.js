import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { TextField } from "@material-ui/core";
import personalIcon from '../../assets/icons/personal-img.png';
import PasswordInput from '../PasswordTextField/PasswordTextField';
import './PersonalData.css';

const PersonalData = ({active, setActive, setError, setErrorText, setAlert}) => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [patr, setPatr] = useState("");
    const [univer, setUniver] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const cancelFunction = () => {
        setActive(false);
        setPassword("");
        setName("");
        setSurname("");
        setPatr("");
        setUniver("");
        setEmail("");
    }
    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.email) {
            setPassword("qwerty");
            setName(user?.firstName);
            setSurname(user?.secondName);
            setPatr(user?.patronymic);
            setUniver(user?.university);
            setEmail(user?.email);
        }
    }, [])

    const onFinish = async() => {
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_SERVER_ENDPOINT}/change-user-information`,
                {
                  email: localStorage.getItem('email'),
                  new_email: email,
                  new_password: password,
                  new_name: name,
                  new_surname: surname,
                  new_patronymic: patr,
                  new_university: univer
                }
            );
            if (res && res.data && res.data.statusCode && res.data.statusCode === '200') {
                localStorage.clear();
                setAlert("success");
                setErrorText("Данные пользователя успешно обновлены!");
                setError(true);
                localStorage.setItem("user", JSON.stringify(res.data.data));
                localStorage.setItem("email", res.data.data?.email);
                cancelFunction();
            } else {
                setAlert("Error");
                setErrorText("Данные не были обновлены!");
                setError(true);
            }
        } catch {
            setAlert("Error");
            setErrorText("Данные не были обновлены!");
            setError(true);
        }
        
    }

    const onLogOut = () => {
        localStorage.clear();
        cancelFunction();
        history.push('/login')
    }

    return (
        <div
            className={active ? "wrapper-personal active" : "wrapper-personal"}
            onClick={() => setActive(false)}>
            <div
                className={active ? "personal-content active" : "personal-content"}
                onClick={e => e.stopPropagation()}>

                <div>
                    <span>
                        Личные данные
                    </span>
                </div>

                <div>
                    <img
                        src={personalIcon}
                        alt='logOutIcon'
                        onClick={onLogOut}
                    />
                </div>

                <div>
                    <TextField
                        label="Имя"
                        className="personal-input"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <TextField
                        label="Фамилия"
                        className="personal-input"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                </div>

                <div className="span-col-2">
                    <TextField
                        label="Отчество(необязательно)"
                        className="personal-input"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={patr}
                        onChange={(e) => setPatr(e.target.value)}
                    />
                </div>

                <div className="span-col-2">
                    <TextField
                        label="ВУЗ"
                        className="personal-input"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={univer}
                        onChange={(e) => setUniver(e.target.value)}
                    />
                </div>

                <div className="span-col-2">
                    <TextField
                        label="Почта"
                        className="personal-input"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="span-col-2">
                    <PasswordInput
                        value={password}
                        setValue={setPassword}
                    />
                </div>

                <div />

                <div className='personal-butt'>
                    <button className='button-cancel' onClick={cancelFunction}>
                        Отменить
                    </button>

                    <button className='button-save' onClick={onFinish}>
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    )
}


export default PersonalData;