import React, { Component } from 'react';

export class UserClass extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userInfo: {
                name: 'Dummy Name',
                location: 'Default',
                avatar_url: 'dummy-url'
            }
        }

        console.log('Constuctor loaded.')
    }


    async componentDidMount(){
        console.log('componentDidMount loaded');
        const response = await fetch('https://api.github.com/users/ritish2503');
        const result = await response.json();

        console.log(result);

        this.setState({
            userInfo: result
        })
    }

    componentDidUpdate(){
        console.log('Updated with API data.')
    }

    componentWillUnmount(){
        console.log('Component is unmounted.')
    }
  render() {
    console.log('Render loaded.');
    const {name, location, avatar_url} = this.state.userInfo;
    return (
        <div className='user-card'>
            <img src={avatar_url} alt="" />
            <h2>Name : {name}</h2>
            <h3>Location : {location}</h3>
        </div>
    )
  }
}

export default UserClass;