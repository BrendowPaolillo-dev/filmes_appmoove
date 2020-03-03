import React, { Component } from 'react';

import './search.css'

import axios from 'axios'
import config from './../../services/config'
// import { Container } from './styles';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            result: []
        }
    }
    async handleString(event){
        await this.setState({query: event.target.value})
        this.searchString()
    }
    async searchString() {
        await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${config.API_KEY}&query=${this.state.query}`).then((res) => {
            this.setState({result: res.data.results})
        }).catch((err) => {
            console.log(err);
        });
        console.log(this.state.result)
    }   
    render() {
        return (
            <input className="search" type="text" value={this.state.query} onChange={(event)=>this.handleString(event)}></input>
        );
    }
}
