import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Orders extends Component {

    componentDidMount() {
        this.props.fetchOrders();
    }

    render() {

        let ordersList = <Spinner />;
        if (!this.props.loading) ordersList = this.props.orders.map(order => <Order key={order.id} ingredients={order.ingredients} price={order.price} />);
        return (
            <div>
                {ordersList}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: () => dispatch(actions.fetchOrders())
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));