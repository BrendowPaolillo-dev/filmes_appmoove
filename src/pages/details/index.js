import React, { Component } from 'react';

import Requisitions from './../../services/requisitions';

// import { Container } from './styles';

const imgBase = "https://image.tmdb.org/t/p/original"

export default class Details extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movie: null,
      isLoad: false
    }
  }
  async componentDidMount() {
    const userId = this.props.match.params.id;
    console.log(userId);
    var aux = await Requisitions.getMovieById(userId)
    this.setState({
      movie: aux,
      isLoad: true
    })
    console.log(this.state.movie)
    
  }
  renderMovie(){
    return (
      <div >
        <div>
          <img style={{ width: "50%" }} src={imgBase + this.state.movie.poster_path} alt={"`Poster de ${this.state.movie.title}`"} />
          <h2>
            {this.state.movie.title}
          </h2>
          <h3>
            {this.state.movie.overview}
          </h3>
        </div>
      </div>
    );
  }
  render() {
    return(
      <div>
        {this.state.isLoad == true ? this.renderMovie() : <span></span>}
      </div>
      );
  }
}
