import React, { Component } from 'react';

import Header from './../../components/header'

import config from './../../services/config'
import axios from 'axios';
import { Link } from "react-router-dom"
import YouTube from 'react-youtube';

import { Carousel, Col, Row, Rate } from 'antd';
import 'react-awesome-slider/dist/styles.css';


import './home.css';

// import { Container } from './styles';

const imgBase = "https://image.tmdb.org/t/p/original"

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      onTheatres: [],
      popular: [],
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
      this.setState({ popular: res.data.results.slice(0, 10) })
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
            <Row>
              <h3>
                <b>
                  <Link to={`/movie/${item.id}`} style={{color:"white"}}>
                    {item.title}
                  </Link>
                </b>
              </h3>
            </Row>
            <Row justify="start">
              <Col span={8}>
                <Link to={`/movie/${item.id}`}>
                  <img style={{ width: "75%", margin: "0 0 0 auto" }} className="imgTheatre" src={imgBase + item.poster_path} alt={"posters filmes no cinema"} />
                </Link>
              </Col>
              <Col span={16}>
                <YouTube
                  videoId={this.state.trailers[index]}
                  style={{ width: "100%", margin: "0 0 0 0", }}
                />
              </Col>
            </Row>
          </div>
        )
      })
    )
  }
  renderPopular() {
    return (
      this.state.popular.map((item) => {
        return (
          <div style={{ position: 'relative' }} key={item.id} style={{ backgroundColor: "#101010", marginBottom: "10px", marginRight: "50px", marginLeft: "50px" }} >
            <Row>
              <Col span={8}>
                <Link to={`/movie/${item.id}`}>
                  <img style={{ width: "50%", borderRadius:"3px", border: "#01d277", borderStyle: "solid", borderWidth: "20%", borderRadius:"10px" }} className="imgTheatre" src={imgBase + item.poster_path} alt={"posters filmes no cinema"} />
                </Link>
              </Col>
              <Col span={10} style={{ margin: "auto" }}>
                <h3>
                  <Link to={`/movie/${item.id}`}>
                    {item.title}
                  </Link>
                </h3>
                <h4 style={{ color: "white" }}>
                  {item.overview}
                </h4>
              </Col>
            </Row>
          </div>
        )
      })
    )
  }

  render() {
    return (
      <div className={"background"}>
        <Header></Header>
        <div style={{ padding: "auto" }}>
          <Carousel id={"carrossel"}
          >
            {this.renderMovieData()}
          </Carousel>
        </div>
        <div>
          <Row>
            <div style={{width:"100%", margin: "20px 100px 20px 100px"}}>
            <h2 style={{ color: "white", fontSize: "25px",  }}>
              <b>
                Populares
              </b>
            </h2>
            </div>
          </Row>
          <Row>
            <Col>
              {this.renderPopular()}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
