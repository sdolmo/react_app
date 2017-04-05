import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  // 1 - ES6 classes of React don't implicitly bind the methods to this class...
  // 4 - to combat this we can can use a constructor, which is the code that runs when the code is created
  // constructor() {
  //   super(); // run super to create the component first before adding the functionality defined in this class
  //   // it also allows us to write
  //   this.goToStore = this.goToStore.bind(this);
  //     // the first 'this' refers to the goToStore method and it is setting it equal to itself
  //     // while binding the last 'this', which in the constructor is equal to the store picker component
  //     // this can be inefficient as each class may comtain more than one method
  // }
  goToStore(e) {
    e.preventDefault();
    // first grab the text from the form
    const storeId = this.storeInput.value;
    console.log(`Going to ${storeId}`);
    // second we're going to transition from / to /store/:storeId
    this.context.router.history.push(`/store/${storeId}`);
  }


  render() {
    return (
      // 2 - ...so in order to retreive the values from the form
      // 3 - create a value called 'storeInput' and attach it to the StorePicker class
      //     as opposed to using state to manage input values
      // 5 - instead of using the constructor you can also bind this component to the goToStore method
      //     as we did with the constructor
      <form className="store-selector" onClick={this.goToStore.bind(this)}>
        <h2>Please Enter A Store</h2>
        <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => {this.storeInput = input}}/>
        <button type="submit">Visit Store</button>
      </form>
    )
  }
}

// This tells react router that this class (StorePicker) expects an element called 'router'
StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;
