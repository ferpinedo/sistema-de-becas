import React from "react";
import '../App.css'
import {apiURLs} from '../utils/Properties';
import {getValidator} from '../utils/Validations'
import {push} from '../utils/MongoUploader'

import {TableWrapper} from '../components/TableWrapper'

// Daate picker
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

// Bootstrap
import {Button} from 'reactstrap';
import "tabler-react/dist/Tabler.css";
import {Card} from "tabler-react";

// Data Picker
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
// import Button from "bootstrap/js/src/button";

const URL = apiURLs.BECAS;
var becasThat = null;

class Becas extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            addingItem: false
        };
        becasThat = this;
        this.setState = this.setState.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.refreshTable = this.refreshTable.bind(this);
    }

    componentDidMount()
    {
        this.refreshTable();
    }

    refreshTable() {
        console.log("Pulling data from: " + URL);
        let self = this;
        fetch(URL)
            .then(results => {
                console.log("Results: " + results);
                console.log(JSON.stringify(results));
                results.json().then((json)=>{
                    self.setState({
                        tableData: json,
                        dataLoaded: true
                    });
                    console.log("State: " + JSON.stringify(self.state))
                });
                return results;
            });
    }

    handleAdd()
    {
        this.setState({
            addingBeca: !this.state.addingBeca
        }, ()=>{
            window.scrollTo(0,document.body.scrollHeight);
        });
    }

    render(){
        let columnsData = {
            claveBeca: {
                name: "Clave becaria",
                filter: true
            },
            numControl: {
                name: "Núm. de control",
                filter: true
            },
            fechaInicio: {
                name: "Fecha de inicio",
                filter: true
            },
            fechaVencimiento: {
                name: "Fecha de vencimiento",
                filter: true
            },
            estatus: {
                name: "Estatus",
                filter: true
            }
        };
        return(
            <div className="Becas" >
                <TableWrapper ref={this.table} url={URL} columnsData={columnsData} name="Becas"/>
                <div className="rightBtn">
                    <Button color="primary" className="button" onClick={this.handleAdd} size="100%" >Agregar</Button>
                </div>
                    {this.state.addingBeca && <Form/>}
            </div>
        );
    }
}


class Form extends React.Component{
    constructor() {
       super();
       let fields = {
           numControl: '',
           claveBeca: '',
           fechaInicio: moment(),
           fechaVencimiento: moment(),
           estatus: 0
       };
       this.validator = getValidator(fields);
       console.log("This.validator: " + JSON.stringify(this.validator));

       fields.validation = this.validator.valid();
       console.log("Fields: " + JSON.stringify(fields));

       this.state = fields;
       this.submittedOnce = false;
       this.handleEndDateChange = this.handleEndDateChange.bind(this);
       this.handleStartDateChange = this.handleStartDateChange.bind(this);

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
            console.log("Form: " + JSON.stringify(this.state))
            var objectToPush = this.state;
            delete objectToPush.validation;
            console.log("Pushing... objectToPush: " + JSON.stringify(objectToPush));
            console.log("This.state: " + JSON.stringify(this.state));
            push(URL, objectToPush, ()=> {
                becasThat.refreshTable();
                window.scrollTo(0, 10);
            });
        }
    };
    handleStartDateChange(date) {
        this.setState({
            fechaInicio: date
        });
    }

    handleEndDateChange(date) {
        this.setState({
            fechaVencimiento: date
        });
    }

    render(){

        console.log("Validation: " + this.state.validation);
        let validation = this.submittedOnce ? this.validator.validate(this.state) : this.state.validation;
        return(
            <div className="form">
                <Card>
                    <Card.Header>
                        <Card.Title>Becar alumno</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <form className="demoForm">
                            <div className={validation.numControl.isInvalid && 'has-error'}>
                                <label htmlFor="numControl">Número de Control</label>
                                <input type="numControl" className="form-control"
                                       name="numControl"
                                       placeholder=""
                                       onChange={this.handleInputChange}
                                />
                                <span className="help-block">{validation.numControl.message}</span>
                            </div>

                            {/*TODO: hacer selectable list*/}
                            <div className={validation.claveBeca.isInvalid && 'has-error'}>
                                <label htmlFor="claveBeca">Clave de beca a asignar</label>
                                <input type="claveBeca" className="form-control"
                                       name="claveBeca"
                                       placeholder=""
                                       onChange={this.handleInputChange}
                                />
                                <span className="help-block">{validation.claveBeca.message}</span>
                            </div>


                            <div className="columns">
                                <div className="column">
                                        <label htmlFor = "fechaInicio" >Fecha de Inicio</label>
                                        <DatePicker
                                            className='date-input'
                                            selected={this.state.fechaInicio}
                                            onChange={this.handleStartDateChange}
                                        />
                                </div>

                            </div>
                            <div>
                                    <label htmlFor="fechaVencimiento">Fecha de Vencimiento</label>
                                    <input type="fechaVencimiento" className="form-control"
                                           name="fechaVencimiento"
                                           placeholder=""
                                           onChange={this.handleInputChange}
                                    />
                            </div>


                            <div className={validation.estatus.isInvalid && 'has-error'}>
                                <label htmlFor="estatus">Estatus</label>
                                <input type="estatus" className="form-control"
                                       name="estatus"
                                       placeholder=""
                                       onChange={this.handleInputChange}
                                />
                                <span className="help-block">{validation.estatus.message}</span>
                            </div>
                            <Button color="dark" onClick={this.handleFormSubmit} className="button">
                                Becar
                            </Button>
                        </form>
                    </Card.Body>
                </Card>

            </div>

        );
    }
};

export default Becas;