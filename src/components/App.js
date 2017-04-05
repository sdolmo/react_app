import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';

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

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
        </div>
        <Order />
        <Inventory addFish={this.addFish}  loadSamples={this.loadSamples} />
      </div>
    )
  }
}

export default App;
