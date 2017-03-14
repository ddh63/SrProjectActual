import React, { Component } from 'react';
// import Movies from './Movies';
import Nav from './Nav';
import HomeLanding from './HomeLanding';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

  render() {
    return (
      <div>
      	<Nav />
      	<HomeLanding />
      </div>
    );
  }
}

export default App;
