import React, { Component } from 'react';
import './header.css'
import Search from './../../components/search'
import { Link } from 'react-router-dom'
// import { Container } from './styles';
import logo from './../../images/green_logo.svg'

export default class header extends Component {
    render() {
        return (
            <div className="header">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <Link to={"/"}>
                                    <img alt={"logo do site"} width={50} src={logo} />
                                </Link>
                            </td>
                            <td>
                                Brendow Paolillo
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Search className="search"></Search>
            </div>
        );
    }
}
