import React from 'react';
import { formatPrice } from '../helpers';

class Order extends React.Component {
  constructor() {
    super();

    // bind methods
    this.renderOrder = this.renderOrder.bind(this);
  }

  renderOrder(key) {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];

    if (!fish || fish.status === 'unavailable') {
      return <li key="key">Sorry, {fish ? fish.name : 'fish'} is no longer available!</li>
    }

    return (
      <li key={key}>
        <span>{count}lbs {fish.name}</span>
        <span className="price">{formatPrice(count * fish.price)}</span>
      </li>
    )
  }


  render() {
    // grab the key of the orders
    const orderIds = Object.keys(this.props.order);
    // get the total price of the orders (initialize prevTotal = 0)
    const total = orderIds.reduce((prevTotal, key) => {
      // get the fish from the fishes state using the key from orderIds
      const fish = this.props.fishes[key];
      // get the number of fish ordered using the key from orderIds as well
      const count = this.props.order[key];
      // if you find the fish in the fishes state and the status is available
      const isAvailable = fish && fish.status === 'available';
      if(isAvailable) {
        // increment prevTotal by the number of fish ordered multiplied by the price of a paticular fish
        return prevTotal + (count * fish.price || 0)
      }
      return prevTotal; // lastly return the total of allthe fish ordered
    }, 0);
    return (
      <div className="order-wrap">
        <h2>Your Order</h2>
        <ul className="order">
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total:</strong>
            {formatPrice(total)}
          </li>
        </ul>
      </div>
    )
  }
}

export default Order;
