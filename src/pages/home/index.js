import React, { Component } from 'react';

import Header from './../../components/header'

import config from './../../services/config'
import axios from 'axios';
import { Link } from "react-router-dom"
import YouTube from 'react-youtube';

import { Carousel, Col, Row } from 'antd';
import 'react-awesome-slider/dist/styles.css';


import './home.css';

// import { Container } from './styles';

const imgBase = "https://image.tmdb.org/t/p/original"

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      onTheatres: [],
      suggest: [],
      posterUrl: [],
      moviesNames: [],
      trailers: [],
      player: null,
    }
  }
  async componentDidMount() {
    await axios.get(`https://api.themoviedb.org/3/authentication/token/new?api_key=${config.API_KEY}&language=pt-BR`).then((res) => {
      // console.log(res);
    }).catch((err) => {
      console.log(err);
    });
    await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${config.API_KEY}&language=pt-BR`).then((res) => {
      //console.log(res);
      this.setState({ onTheatres: res.data.results.slice(0, 3) })
    }).catch((err) => {
      console.log(err);
    });
    await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${config.API_KEY}&language=pt-BR`).then((res) => {
      console.log(res);
      this.setState({ suggest: res.data.results.slice(0, 10) })
    }).catch((err) => {
      console.log(err);
    });
    var aux = [];
    this.state.onTheatres.map(async item => {
      await axios.get(`https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=${config.API_KEY}&language=pt-BR`).then((res) => {
        //console.log(res);
        aux.push(res.data.results[0].key)
        //console.log("trailers", this.state.trailers)
      }).catch((err) => {
        console.log(err);
      });
      this.setState({
        trailers: aux
      })
    })

  }
  renderMovieData() {
    return (
      this.state.onTheatres.map((item, index) => {
        //console.log(index)
        return (
          <div id={"divinterna"} style={{ position: 'relative' }} key={item.id} >
            <h3>
              {item.title}
            </h3>
            <img style={{ width: "20%", zIndex: '999999' }} className="imgTheatre" src={imgBase + item.poster_path} alt={"posters filmes no cinema"} />
            <YouTube
              videoId={this.state.trailers[index]}
            />
          </div>
        )
      })
    )
  }
  renderSuggest() {
    return (
      this.state.suggest.map((item) => {
        return (
          <div id={"divinterna"} style={{ position: 'relative' }} key={item.id} >
            <img style={{ width: "20%", zIndex: '999999' }} className="imgTheatre" src={imgBase + item.poster_path} alt={"posters filmes no cinema"} />
            <h3>
              <Link to={`/movie/${item.id}`}>
                {item.title}
              </Link>
            </h3>
            <h4>
              {item.overview}
            </h4>
          </div>
        )
      })
    )
  }

  render() {
    return (
      <div>
        <Header></Header>
        <div>
          <Carousel id={"carrossel"}
          >
            {this.renderMovieData()}
          </Carousel>
        </div>
        <div>
          <Row>
            <h2>Populares</h2>
          </Row>
          <Row>
            <Col>
              {this.renderSuggest()}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
