import React, { Component } from 'react';

import Header from './../../components/header'
import Search from './../../components/search'

import config from './../../services/config'
import axios from 'axios';

import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

// import { Container } from './styles';

const imgBase = "https://image.tmdb.org/t/p/w185"

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      onTheatres: [],
      posterUrl:""
    }
  }
  async componentDidMount() {
    await axios.get(`https://api.themoviedb.org/3/authentication/token/new?api_key=${config.API_KEY}`).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
    await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${config.API_KEY}`).then((res) => {
      console.log(res);
      this.setState({ onTheatres: res.data.results.slice(0, 3) })
    }).catch((err) => {
      console.log(err);
    });
    this.setState({
      posterUrl: imgBase + this.state.onTheatres[0].poster_path
    })
    console.log(this.state.posterUrl)
  }
  render() {
    return (
      <div>
        <Header></Header>
        <Search></Search>
        <div>
          <AwesomeSlider>
            <div data-src = {this.state.posterUrl}>

            </div>
            <div>

            </div>
            <div>

            </div>
          </AwesomeSlider>
        </div>
      </div>
    );
  }
}
