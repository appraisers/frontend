import aboutPagePicture from '../../assets/illustrations/aboutPagePicture.png';
import Header from "../../Components/Header/Header";
import AuthorizedHeader from '../../Components/AuthorizedHeader/AuthorizedHeader';
import './AboutPage.css';

const AboutPage = () => {
    return (
        <>
            {localStorage.getItem('user')?<AuthorizedHeader /> :<Header />}
            <div className='wrapper-description'>
                <div class="img-description">
                    <img
                        alt='logo'
                        src={aboutPagePicture}
                    />
                </div>
                

                <div className='box-description'>
                    <h2>
                        О проекте
                    </h2>

                    <p>
                        Данная экспертная система была создана для упрощения подбора направления для поступающих на магистратуру
                    </p>
                    <p>
                        Для тестового режима мы внесли в базу данных 12 направлений магистратуры и вопросы, выявляющие интерес к данным сферам обучения 
                    </p>
                </div>
            </div>
        </>
    );
}


export default AboutPage;
