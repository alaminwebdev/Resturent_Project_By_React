import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { authCheck } from '../redux/authActionCreators';

import Header from './header/Header';
import Home from './body/home/Home';

import Menu from './body/menu/Menu'
import DishDetail from './body/menu/DishDetail/DishDetail';
import Cart from './body/menu/Cart/Cart';
import Departure from './body/menu/Cart/Departure';

import BurgerBuilder from './body/BurgerBuilder/BurgerBuilder';
import CheckOut from './body/BurgerBuilder/CustomCheckOut/CheckOut';

import Orders from './body/Orders/Orders';

import Auth from './body/Auth/Auth';
import Logout from './body/Auth/Logout';

import Contact from './body/contact/Contact';

import Admin from '../admin/Admin';
import AddMenu from '../admin/AddMenu/AddMenu';
import ManageMenu from '../admin/ManageMenu/ManageMenu';
import ManageOrder from '../admin/ManageOrder/ManageOrder';


import { Route, Switch, Redirect } from 'react-router-dom';



const mapStateToProps = state => {
    return {
        token: state.authState.token,
        //cartItems: JSON.parse(localStorage.getItem("cartItems"))
    }
}


const mapDispatchToProps = dispatch => {
    return {
        authCheck: () => dispatch(authCheck())
    }
}





const MainComponent = (props) => {
    //const cartItems = JSON.parse(localStorage.getItem("cartItems"))
    //console.log(cartItems)
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        props.authCheck()
    });

    let routes = null;
    if (props.token === null) {
        routes = (
            <Switch>
                <Route path="/login" exact component={Auth} />
                <Route path="/admin" exact component={Admin} />
                <Route path="/addmenu" exact component={AddMenu} />
                <Route path="/managemenu" exact component={ManageMenu} />
                <Route path="/manageorder" exact component={ManageOrder} />
                <Redirect to="/login" />
            </Switch>
        )
    } else {
        routes = (
            <Switch>
                <Route path="/" exact render={() => <Home />} />

                <Route path="/menu" exact component={Menu} />
                <Route path="/dishdetail" exact component={DishDetail} />
                <Route path="/cart" exact component={Cart} />
                <Route path="/departure" exact component={Departure} />

                <Route path="/build" exact component={BurgerBuilder} />
                <Route path="/checkout" exact component={CheckOut} />
                <Route path="/orders" exact component={Orders} />

                <Route path="/contact" exact component={Contact} />

                <Route path="/logout" exact component={Logout} />

                <Redirect to="/" />
            </Switch>
        )

    }

    document.title = "Resturent"
    return (
        <>
            <Header />
            {routes}
        </>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);