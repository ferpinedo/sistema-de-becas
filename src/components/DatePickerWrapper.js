import React from 'react';

import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

import moment from 'moment';

export class DatePickerWrapper extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            fechaInicio: moment(),
        };
        console.log("name: " + this.props.name)

        this.handleStartDateChange = this.handleStartDateChange.bind(this);
    }

    handleStartDateChange(date) {
        this.setState({
            fechaInicio: date
        });
    }


    render() {
        return(
            <div className={(this.props.validation[this.props.name].isInvalid && 'has-error').toString()}>
                <label htmlFor = {this.props.name} >{this.props.label}</label>
                <DatePicker
                    className='date-input'
                    selected={this.state.fechaInicio}
                    onChange={this.handleStartDateChange}
                />
                <span className="help-block">{this.props.validation[this.props.name].message}</span>
            </div>
        );
    }
}