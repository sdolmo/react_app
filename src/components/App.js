import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
  constructor() {
    super(); // Must initialize super function to use 'this'
    // get the initial state
    this.state = {
      fishes: {},
      order: {}
    };

    // binding methods
    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
  }

  componentWillMount() {
    // this runs right before the app is rendered
    this.ref = base.syncState(`${this.props.location.pathname}/fishes`
      , {
        context: this,
        state: 'fishes'
      });

      // check if there is any order in localStorage
      const localStorageRef = localStorage.getItem(`order-${this.props.match.params.storeId}`);

      if(localStorageRef) {
        // update App component's order state
        this.setState({
          order: JSON.parse(localStorageRef)
        })
      }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.match.params.storeId}`,
      JSON.stringify(nextState.order));
  }

  

  addFish(fish) {
    // update our state
    // make a copy of existing state
    const fishes = {...this.state.fishes}
    // add in our new fish
    const timestamp = Date.now(); // unique id
    fishes[`fish-${timestamp}`] = fish
    // set state
    this.setState({ fishes }) // ES6 way
  }

  loadSamples() {
    this.setState({
      fishes : sampleFishes
    })
  }

  addToOrder(key) {
    // copy of order store
    const order = {...this.state.order};
    // update or add the new number of fish order
    order[key] = order[key] + 1 || 1;
    // update state
    this.setState({ order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {/* we can't map over the fish object so... */}
            {
              Object
                .keys(this.state.fishes) // ...use keys method to get an array of keys
                // map over them and set each list values key to the object key and send the details of a specific fish to the Fish component
                .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)
            }
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} params={this.props.match.params}/>
        <Inventory addFish={this.addFish}  loadSamples={this.loadSamples} />
      </div>
    )
  }
}

export default App;
