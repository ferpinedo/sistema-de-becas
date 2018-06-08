import React from "react";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../App.css'
import {apiURLs} from '../utils/Properties';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Button } from 'reactstrap';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import Checkbox from "react-bootstrap/es/Checkbox";
import Radio from "react-bootstrap/es/Radio";
import FormGroup from "react-bootstrap/es/FormGroup";
import FieldGroup from "react-bootstrap/es/InputGroup"
import ControlLabel from "react-bootstrap/es/ControlLabel";
import FormControl from "react-bootstrap/es/FormControl";

var self;
class BecasEjemplo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            startDate: moment(),
            endDate: null,

        };
        self = this;
        this.setState = this.setState.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);
    }

    componentDidMount()
    {
        self = this;
        fetch(apiURLs.BECAS)
            .then(results => {
                console.log("Results: " + results);
                console.log(JSON.stringify(results));
                results.json().then((json)=>{
                    self.setState({
                        becasData: json
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
        });
    }

    handleChangeStart(date) {
        this.setState({
            startDate: date
        });
    }

    handleChangeEnd(date) {
        this.setState({
            endDate: date
        });
    }

    render(){
        return(
            <div className="Becas" >
                <div className="table">
                    <BootstrapTable data={this.state.becasData} striped hover>
                        <TableHeaderColumn isKey dataField='_id'>Clave</TableHeaderColumn>
                        <TableHeaderColumn dataField='numControl'>Núm. de Control</TableHeaderColumn>
                        <TableHeaderColumn dataField='fechaInicio'>Fecha Inicio</TableHeaderColumn>
                        <TableHeaderColumn dataField='fechaVencimiento'>Fecha Final</TableHeaderColumn>
                        <TableHeaderColumn dataField='estatus'>Estatus</TableHeaderColumn>
                    </BootstrapTable>
                </div>
                <div>
                    <Button color="primary" onClick={this.handleAdd}>Agregar</Button>
                    {this.state.addingBeca && <Child/>}
                </div>
            </div>
        )
    }

}

{/*<div className="col-md-6">*/}
{/*<h4 className="title">DateRange Picker</h4>*/}
{/*<div className="form-group">*/}

// var handleDateSelect = ({ type, value }) => {
//     const key = type === SelectTypes.START ? 'startDate' : 'endDate';
//     this.setState({ [key]: value });
// };

{/*<DatePicker*/}
{/*range = {true}*/}
{/*months = {2}*/}
{/*startDate={self.state.startDate}*/}
{/*endDate={self.state.startDate}*/}
{/*onDateSelect={handleDateSelect}*/}
{/*/>*/}



let Child = () => (
        <div className="Becas">
            <form>
                <FieldGroup
                    id="formControlsText"
                    type="text"
                    label="Text"
                    placeholder="Enter text"
                />
                <FieldGroup
                    id="formControlsEmail"
                    type="email"
                    label="Email address"
                    placeholder="Enter email"
                />
                <FieldGroup id="formControlsPassword" label="Password" type="password" />
                <FieldGroup
                    id="formControlsFile"
                    type="file"
                    label="File"
                    help="Example block-level help text here."
                />

                <Checkbox checked readOnly>
                    Checkbox
                </Checkbox>
                <Radio checked readOnly>
                    Radio
                </Radio>

                <FormGroup>
                    <Checkbox inline>1</Checkbox> <Checkbox inline>2</Checkbox>{' '}
                    <Checkbox inline>3</Checkbox>
                </FormGroup>
                <FormGroup>
                    <Radio name="radioGroup" inline>
                        1
                    </Radio>{' '}
                    <Radio name="radioGroup" inline>
                        2
                    </Radio>{' '}
                    <Radio name="radioGroup" inline>
                        3
                    </Radio>
                </FormGroup>

                <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Select</ControlLabel>
                    <FormControl componentClass="select" placeholder="select">
                        <option value="select">select</option>
                        <option value="other">...</option>
                    </FormControl>
                </FormGroup>

                <FormGroup controlId="formControlsSelectMultiple">
                    <ControlLabel>Multiple select</ControlLabel>
                    <FormControl componentClass="select" multiple>
                        <option value="select">select (multiple)</option>
                        <option value="other">...</option>
                    </FormControl>
                </FormGroup>

                <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>Textarea</ControlLabel>
                    <FormControl componentClass="textarea" placeholder="textarea" />
                </FormGroup>

                <FormGroup>
                    <ControlLabel>Static text</ControlLabel>
                    <FormControl.Static>email@example.com</FormControl.Static>
                </FormGroup>
                <DatePicker
                    selected={self.state.startDate}
                    selectsStart
                    startDate={self.state.startDate}
                    endDate={self.state.endDate}
                    onChange={self.handleChangeStart}
                />

                <DatePicker
                    selected={self.state.endDate}
                    selectsEnd
                    startDate={self.state.startDate}
                    endDate={self.state.endDate}
                    onChange={self.handleChangeEnd}
                />


                <Button color="primary" type="submit">Submit</Button>
            </form>
        </div>
);



export default BecasEjemplo;