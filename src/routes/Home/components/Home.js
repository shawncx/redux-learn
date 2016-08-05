import React from 'react';
import classes from './Home.scss';
import DuckImage from '../assets/Duck.jpg'

class Home extends React.Component {

  render() {
    return (
      <div>
        <h4>Welcome!</h4>
        <img
          alt='This is a duck, because Redux!'
          className={classes.duck}
          src={DuckImage}/>
      </div>
    )
  }

}

export default Home
