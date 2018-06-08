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

const URL = apiURLs.ESPECIALIDADES;
var especialidadesThat = null;

class Especialidades extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            addingItem: false
        };
        especialidadesThat = this;
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
            clave:{
                name: "Clave",
                filter: true
            },
            nombre:{
                name: "Nombre",
                filter: false
            }
        };
        return(
            <div className="Becas" >
                <TableWrapper ref={this.table} url={URL} columnsData={columnsData} name="Especialidades"/>
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
            clave: 0,
            nombre: ''
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
                console.log("Calbback, Table: " + especialidadesThat.table.current);
                especialidadesThat.table.current.refreshTable();
                window.scrollTo(0, 10);
                especialidadesThat.setState({
                    addingItem: !especialidadesThat.state.addingItem
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
                        <Card.Title>Añadir especialidad</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <form className="demoForm">
                            <StringInput name={"clave"} label={"Clave"} validation={validation} onChange={this.handleInputChange}/>
                            <StringInput name={"nombre"} label={"Nombre"} validation={validation} onChange={this.handleInputChange}/>

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

export default Especialidades;