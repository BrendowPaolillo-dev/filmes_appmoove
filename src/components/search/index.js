import React, { Component } from 'react';

import './search.css'

import axios from 'axios'
import config from './../../services/config'
import { Input, Menu, Dropdown, Col, Row, Rate } from 'antd'
import { SearchOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
// import { Container } from './styles';
const imgBase = "https://image.tmdb.org/t/p/original"
const suffix = <SearchOutlined style={{ color: "#000" }} />;
export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            result: []
        }
    }
    async handleString(event) {
        await this.setState({ query: event.target.value })
        this.searchString()
    }
    async searchString() {
        await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${config.API_KEY}&query=${this.state.query}`).then((res) => {
            this.setState({ result: res.data.results.slice(0, 5) })
        }).catch((err) => {
            console.log(err);
        });
        console.log(this.state.result)
    }
    renderMenu() {
        return (
            <Menu style={{ position: "absolute" }}>
                {this.state.result.map((item, index) => {
                    console.log(item)
                    return (
                        <Menu.Item key={index}>
                            <Link to={`/movie/${item.id}`}>
                                <Row>
                                    <Col span={10}>

                                        <img style={{ width: "20%", position:"center" }} src={imgBase + item.poster_path} />

                                    </Col>
                                    <Col span={14} style={{ margin: "auto" }}>
                                        <h3>
                                            {item.title}
                                        </h3>
                                        <h4>
                                            Nota média:
                                        <Rate allowHalf defaultValue={item.vote_average} count={10} disabled /> {item.vote_average}
                                        </h4>
                                    </Col>
                                </Row>
                            </Link>
                        </Menu.Item>
                    )
                })}
            </Menu>
        );
    }
    render() {
        return (
            <div>
                <Dropdown overlay={this.renderMenu()}>
                    <Input className="search" type="text" value={this.state.query} onChange={(event) => this.handleString(event)} suffix={suffix} />
                </Dropdown>
            </div>
        );
    }
}
