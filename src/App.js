import React, { Component } from 'react';
import './App.css';

// reactstrap
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

// Views
import Becas from "./pages/Becas";
import Alumnos from "./pages/Alumnos";
import Estados from "./pages/Estados";
import TipoBecas from "./pages/TiposBecas";
import Especialidades from "./pages/Especialidades";
import Instituciones from "./pages/Instituciones";

    let views = {"becas": Becas, "alumnos": Alumnos, "estados": Estados, "tiposBecas":TipoBecas, "especialidades": Especialidades, "instituciones": Instituciones};

export class App extends Component {
    constructor() {
        super();
        let position = window.location.href.indexOf("#");
        let viewString = position === -1 ? "becas" : window.location.href.substr(position+1, window.location.href.length);
        console.log("Current view: " + viewString);
        this.state = {
            currentView : views[viewString],
            isOpen: false
        };
        this.setState = this.setState.bind(this);
    }

    changeView(view)
    {
        this.setState({
            currentView: view
        });
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand href="/"><h1>Sistema de becas</h1></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink  href="#becas" onClick={()=> this.changeView(Becas)}> Becas </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink  href="#alumnos"onClick={()=> this.changeView(Alumnos)} > Alumnos </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink  href="#tiposBecas" onClick={()=> this.changeView(TipoBecas)}> Tipos de becas </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink  href="#especialidades" onClick={()=> this.changeView(Especialidades)}> Especialidades </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink  href="#instituciones" onClick={()=> this.changeView(Instituciones)}> Instituciones </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink  href="#estados" onClick={()=> this.changeView(Estados)}> Estados </NavLink>
                            </NavItem>

                        </Nav>
                        <Nav>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Cuenta
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>Ajustes</DropdownItem>
                                    <DropdownItem>Más información</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>Cerrar sesión</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>

                <this.state.currentView/>

            </div>
        );
    }
}

/*


 */
