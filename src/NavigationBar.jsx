import {Link} from 'react-router-dom'

const NavigationBar = () => {
    const hasSearchBar = false;

    return(
        <nav className = "navigationBar">
            <Link to="/" id="storeName">
                Video Game Store
            </Link>
            {hasSearchBar && <div className="search-bar">            
            </div>
            }
            <div className="links">
                <Link to="/add-product" className="navbarButton">Add Products</Link>
                <Link to="/shopping-cart" className="navbarButton">Shopping Cart</Link>
                <Link to="/profile" className="navbarButton">Profile</Link>
            </div>
        </nav>
    );
}

export default NavigationBar;