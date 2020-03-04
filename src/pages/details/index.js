import React, { Component } from 'react';
import { Col, Row, Rate } from 'antd'

import Requisitions from './../../services/requisitions';
import './details.css'
import Header from "./../../components/header"

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
  renderMovie() {
    return (
      <div >
        <Row>
          <Col span={8}>
            <img style={{ width: "70%" }} src={imgBase + this.state.movie.poster_path} alt={`Poster de ${this.state.movie.title}`} />
          </Col>
          <Col span={10} style={{ margin: "auto" }}>
            <h2 style={{ color: "white" }}>
              {this.state.movie.title}
            </h2>
            <h3 style={{ color: "white" }}>
              {this.state.movie.overview}
            </h3>
            <h2 style={{ color: "white" }}>
              Nota média: <Rate allowHalf defaultValue={this.state.movie.vote_average} count ={10} disabled /> {this.state.movie.vote_average}
            </h2>
          </Col>
        </Row>
      </div>
    );
  }
  render() {
    return (
      <div className="background" style={{ width: "100%", height: "100%", backgroundSize: "cover", backgroundRepeat:"repeat"}}>
        <Header></Header>
        {this.state.isLoad === true ? this.renderMovie() : <span></span>}
      </div>
    );
  }
}
