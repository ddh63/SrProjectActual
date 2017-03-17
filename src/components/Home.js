import React, { Component } from 'react';
import Nav from './Nav';
import HomeLanding from './HomeLanding';
import Loading from './Loading';

class Home extends Component {
	constructor(props) {
		super(props);
    	document.title = "Streaming Site";
		this.state = {
			user: null,
			loaded: false
		}

		fetch('/api/isLoggedIn')
			.then((response) => response.json())
			.then((result) => this.setState({ user: result.user, loaded: true }));
	}

  render() {
  	if (!this.state.loaded) return <Loading />;
    return (
      <div>
      	<Nav user={this.state.user} />
      	<HomeLanding user={this.state.user} />
      </div>
    );
  }
}

export default Home;
