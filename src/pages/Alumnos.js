import React from "react";
import '../App.css'
import {apiURLs} from '../utils/Properties';
import {getValidator} from '../utils/Validations'
import {push} from '../utils/MongoUploader'

import {TableWrapper} from '../components/TableWrapper'
import {StringInput} from '../components/StringInput'

// Bootstrap
import {Button} from 'reactstrap';
import "tabler-react/dist/Tabler.css";
import {Card} from "tabler-react";

const URL = apiURLs.ALUMNOS;
var alumnosThat = null;

class Alumnos extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            addingItem: false
        };
        alumnosThat = this;
        this.table = React.createRef();
        this.setState = this.setState.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    handleAdd()
    {
        this.setState({
            addingItem: !this.state.addingItem
        }, ()=>{
            window.scrollTo(0,document.body.scrollHeight);
        });
    }

    render(){
        let columnsData = {
            numControl:{
                name: "Núm. de control",
                filter: true
            },
            nombres:{
                name: "Nombres",
                filter: true
            },
            apellidoPaterno:{
                name: "1er Apellido",
                filter: true
            },
            apellidoMaterno:{
                name: "2do Apellido",
                filter: true
            },
            especialidad:{
                name: "Especialidad",
                filter: true
            },
            fechaNacimiento:{
                name: "Fecha de nacimiento",
                filter: false
            },
            correo:{
                name: "Correo",
                filter: true
            },
            telefono:{
                name: "Teléfono",
                filter: true
            },
            direccion:{
                name: "Dirección",
                filter: true
            },
            colonia:{
                name: "Colonia",
                filter: true
            },
            municipio:{
                name: "Ciudad",
                filter: true
            },
            estado:{
                name: "Estado",
                filter: true
            }
        };
        return(
            <div className="Becas" >
                <TableWrapper ref={this.table} url={URL} columnsData={columnsData} name="Alumnos"/>
                <div className="rightBtn">
                    <Button color="primary" className="button" onClick={this.handleAdd} size="100%" >Agregar</Button>
                </div>
                {this.state.addingItem && <Form/>}
            </div>
        );
    }
}


class Form extends React.Component{
    constructor() {
        super();
        let fields = {
            numControl: 0,
            nombres: '',
            apellidoPaterno: '',
            apellidoMaterno: '',
            especialidad: 0,
            fechaNacimiento: '',
            correo: '',
            telefono: '',
            direccion: '',
            colonia: '',
            municipio: '',
            estado: '',
        };
        this.validator = getValidator(fields);
        console.log("This.validator: " + JSON.stringify(this.validator));

        fields.validation = this.validator.valid();
        console.log("Fields: " + JSON.stringify(fields));

        this.state = fields;
        this.submittedOnce = false;
    }

    handleInputChange = event => {
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();

        const validation = this.validator.validate(this.state);
        this.setState({ validation });
        this.submitted = true;

        if (validation.isValid) {
            // handle actual form submission here
            console.log("Form: " + JSON.stringify(this.state));
            var objectToPush = this.state;
            delete objectToPush.validation;
            console.log("Pushing... objectToPush: " + JSON.stringify(objectToPush));
            console.log("This.state: " + JSON.stringify(this.state));
            push(URL, objectToPush, ()=> {
                console.log("Calbback, Table: " + alumnosThat.table.current);
                alumnosThat.table.current.refreshTable();
                window.scrollTo(0, 10);
                alumnosThat.setState({
                    addingItem: !alumnosThat.state.addingItem
                });
            });
        }
    };

    render(){

        console.log("Validation: " + this.state.validation)
        let validation = this.submittedOnce ? this.validator.validate(this.state) : this.state.validation;
        return(
            <div className="form">
                <Card>
                    <Card.Header>
                        <Card.Title>Añadir alumno</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <form className="demoForm">
                            <StringInput name={"numControl"} label={"Número de control"} validation={validation} onChange={this.handleInputChange}/>
                            <StringInput name={"nombres"} label={"Nombres"} validation={validation} onChange={this.handleInputChange}/>
                            <StringInput name={"apellidoPaterno"} label={"Apellido paterno"} validation={validation} onChange={this.handleInputChange}/>
                            <StringInput name={"apellidoMaterno"} label={"Apellido Materno"} validation={validation} onChange={this.handleInputChange}/>
                            <StringInput name={"especialidad"} label={"Especialidad"} validation={validation} onChange={this.handleInputChange}/>
                            <StringInput name={"fechaNacimiento"} label={"Fecha de Nacimiento"} validation={validation} onChange={this.handleInputChange}/>
                            <StringInput name={"correo"} label={"Correo"} validation={validation} onChange={this.handleInputChange}/>
                            <StringInput name={"telefono"} label={"Telefóno"} validation={validation} onChange={this.handleInputChange}/>
                            <StringInput name={"direccion"} label={"Dirección"} validation={validation} onChange={this.handleInputChange}/>
                            <StringInput name={"colonia"} label={"Colonia"} validation={validation} onChange={this.handleInputChange}/>
                            <StringInput name={"municipio"} label={"Municipio"} validation={validation} onChange={this.handleInputChange}/>
                            <StringInput name={"estado"} label={"Estado"} validation={validation} onChange={this.handleInputChange}/>

                            <Button color="dark" onClick={this.handleFormSubmit} className="button">
                                Finalizar
                            </Button>
                        </form>
                    </Card.Body>
                </Card>

            </div>
        );
    }
};

export default Alumnos;