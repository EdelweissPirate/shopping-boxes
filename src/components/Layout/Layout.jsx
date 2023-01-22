import Scene from '../3d/Scene'
import Header from '../Header/Header'
import Routers from '../../routers/Routers'
import Footer from '../Footer/Footer'

function Layout() {
    return (
        <>
            <Scene />
            <Routers>
                <Header />
                {/* <Footer /> */}
            </Routers>
        </>
    )
}

export default Layout