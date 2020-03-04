import React, { Component } from 'react';
import './header.css'
import Search from './../../components/search'
// import { Container } from './styles';


export default class header extends Component {
    render() {
        return (
            <div className ="header">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <img alt={"logo do site"} width={50} src={"green_logo.svg"}/>
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
