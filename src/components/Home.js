import React, { Component } from 'react';
import Nav from './Nav';
import HomeLanding from './HomeLanding';

class Home extends Component {
	constructor(props) {
		super(props);
    	document.title = "Streaming Site";
		this.state = {
			user: ''
		}
	}

	componentDidMount() {
		fetch('/api/isLoggedIn')
			.then((response) => response.json())
			.then((result) => this.setState({ user: result }));
		console.log(this.state.user);
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
