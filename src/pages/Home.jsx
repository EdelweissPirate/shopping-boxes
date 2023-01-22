import Helmet from '../components/Helmet/Helmet'
import Title from '../components/Title'

import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import { switchClass } from '../utils'

function Home() {
    const navigate = useNavigate()

    useEffect(() => {
        switchClass(document.getElementById('home'))
    }, [])

    const handleClick = () => {
        switchClass(
            document.getElementById('home'), 
            'fade-out', 
            navigate, 
            '/categories'
        )
    }

    return (
        <>
        <Helmet title={'Home'} />
        <section id='home'>
            <Title />

            <div className='fill click-z absolute center-absolute flex flex-center col'>
                <button onClick={() => {handleClick()}} className='floatIn-up btn-round hover-button'>
                    Shop
                </button>
            </div>
            <div className='fill click-z absolute flex col' style={{top: '65%'}}>
                <div className='w-100 txt-center floatIn-up px-4'>
                    <h2>Home to SUPERAMAZINGMART! <br></br> A new web based shopping experience!</h2>
                </div>
            </div>
        </section>
        </>
    )
}

export default Home