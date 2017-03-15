import React, { Component } from 'react';
import Nav from './Nav';
import HomeLanding from './HomeLanding';

class Home extends Component {
	constructor(props) {
		super(props);
    document.title = "Streaming Site";
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

export default Home;
