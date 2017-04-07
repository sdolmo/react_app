import React from 'react';
import AddFishForm from './AddFishForm';
import base from '../base';

class Inventory extends React.Component {
  constructor() {
    super();

    // bind methods...
    this.renderInventory = this.renderInventory.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      uid: null,
      owner: null
    }
  }

  componentDidMount() {
    // .onAuth() = .on('auth', callback);
    // Here we are authenticating the user when the page loads again
    base.onAuth((user) => {
      if (user) {
        // the authHandler function is executed when the user first log in
        // and everytime the page is reloaded it's called again to handle and check whether current user owns the inventory
        this.authHandler(null, {user});
      }
    })
  }

  handleChange(e, key) {
    const fish = this.props.fishes[key];
    // take a copy of that fish and update it with the new data
    const updatedFish = {
      ...fish,
      [e.target.name]: e.target.value,
      [e.target.price]: e.target.value,
      [e.target.status]: e.target.value,
      [e.target.desc]: e.target.value,
      [e.target.image]: e.target.value
    }
    this.props.updateFish(key, updatedFish);
  }

  authenticate(provider) {
    console.log(`Trying to log in with ${provider}`);
    base.authWithOAuthPopup(provider, this.authHandler);
  }

  logout() {
    // .unAuth() logs current user out and cuts ties with firebase
    base.unauth();
    // set the state of the current user to null
    this.setState({ uid: null })
  }

  authHandler(err, authData) {
    console.log(authData);
    if (err) {
      console.log(err);
      return;
    }
    // grab the store info
    const storeRef = base.database().ref(this.props.storeId);

    // query farebase once for the store data
    storeRef.once('value', (snapshot) =>{
      const data = snapshot.val() || {};

      // claim it as own if there is no owner already
      if (!data.owner) {
        storeRef.set({
          owner: authData.user.uid
        });
      }

      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      });
    });
  }

  renderLogin() {
    return (
      <nav className="login">
        <p>Sign in to manage your store's inventory</p>
        <button className="github" onClick={() => this.authenticate('github')}>Log in with Github</button>
        <button className="facebook" onClick={() => this.authenticate('facebook')}>Log in with Google</button>
        <button className="twitter" onClick={() => this.authenticate('twitter')}>Log in with Twitter</button>
      </nav>
    )
  }

  renderInventory(key) {
    const fish = this.props.fishes[key];
    return (
      <div className="fish-edit" key={key}>
        <input type="text" name="name" value={fish.name} placeholder="Fish Name" onChange={(e) => this.handleChange(e, key)} />
        <input type="text" name="price" value={fish.price} placeholder="Fish Price" onChange={(e) => this.handleChange(e, key)} />
        <select type="text" name="status" value={fish.status} placeholder="Fish Status" onChange={(e) => this.handleChange(e, key)}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea type="text" name="desc" value={fish.desc} placeholder="Fish Desc" onChange={(e) => this.handleChange(e, key)} />
        <input type="text" name="image" value={fish.image} placeholder="Fish Image" onChange={(e) => this.handleChange(e, key)} />
        <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
      </div>
    )
  }

  render() {
    const logout = <button onClick={this.logout}>Log out</button>;

    // check if they are not logged in at all
    if(!this.state.uid) {
      return <div>{this.renderLogin()}</div>
    }

    // Check if they are the owner of the urrent store
    if(this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you are not the owner of this store</p>
          {logout}
        </div>
      )
    }

    return (
      <div>
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    )
  }

  // Bring the proptypes into the component with the keyword 'static' to prevent inventory from
  // creating new proptypes everytime the component is created
  Inventory.propTypes = {
    addFish: React.PropTypes.func.isRequired,
    fishes: React.PropTypes.object.isRequired,
    loadSamples: React.PropTypes.func.isRequired,
    removeFish: React.PropTypes.func.isRequired,
    storeId: React.PropTypes.string.isRequired,
    updateFish: React.PropTypes.func.isRequired
  }
}


export default Inventory;
