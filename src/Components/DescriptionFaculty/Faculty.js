import { useState } from 'react'
import { CircularProgress } from '@material-ui/core';
import icon1 from '../../assets/icons/Icon1.png'
import icon2 from '../../assets/icons/Icon2.png';
import icon3 from '../../assets/icons/Icon3.png';
import icon4 from '../../assets/icons/Icon4.png';
import './Faculty.css';

const Faculty = ({ data }) => {
    const [offers, setOffers] = useState([]);
    const [textTable, setTextTable] = useState([]);

    const photo = [icon1, icon2, icon3];

    if (!offers.length && data.offers) {
        setOffers(JSON.parse(data.offers))
    }

    if (!textTable.length && data.textTable) {
        setTextTable(JSON.parse(data.textTable))
    }

    function checkCount(count) {
        if (count % 2 === 0) {
            return 'discipline-fac-1';
        } else {
            return 'discipline-fac';
        }
    }

    return (
        <div className='main-div-faculty'>
        {data && data.id 
        ?<>
                <div className='photo-faculty'>
                    <img
                        alt='logo'
                        src={icon4}
                    />
                </div>

                <div className='wrapper-faculty'>
                    <div className='top-faculty'>
                        <div className='name-faculty'>
                            <div className='name'>
                                <p> НАПРАВЛЕНИЕ </p>
                            </div>

                            <span>
                                <a target="_blank" href={data.link}>
                                    {data.name}
                                </a>
                            </span>

                            <div>
                                <hr/>
                            </div>
                        </div>

                        <div className='box-faculty'>
                            {offers.map((item, index) => (
                                <div key={`offer-${item.id}`}>
                                    <img
                                        alt='logo'
                                        src={photo[index]}
                                    />

                                    <span> {item.name} </span>

                                    <p> {item.description} </p>
                                </div>
                            ))
                            }
                        </div>
                    </div>

                    <div className='bottom-faculty'>
                        <div className='name-bottom'>
                            <div>
                                <p> ИНФОРМАЦИЯ </p>
                            </div>

                            <span>
                            Специальные дисциплины программы
                        </span>

                            <hr/>
                        </div>

                        <div className='disciplines-faculty'>
                            {textTable.map((text, index) =>
                                <div className={checkCount(index)} key={`textTabel-${index}`}>
                                    <p> {text} </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </>
        : <div className="circular">
            <CircularProgress />
        </div>
        }
        </div>
    );
}


export default Faculty;