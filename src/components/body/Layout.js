import '../../Assets/css/bootstrap.min.css'
import '../../Assets/css/owl.carousel.min.css'
import '../../Assets/css/style.css'
import '../../Assets/css/responsive.css'
import Header from '../header/header'
import Footer from '../footer/footer'
import {Router, Outlet} from 'react-router-dom' 
function Layout() {
    return (
        <div id="content">
            <Header/>
            <Outlet />
            <Footer/>
        </div>
    );
}

export default Layout;