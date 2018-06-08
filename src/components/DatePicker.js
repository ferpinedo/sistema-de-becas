import React from 'react';

import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

export class DatePicker extends React.Component{
    constructor(props) {
        super(props);


        this.state = {
            fechaInicio: moment(),
        };
        this.setState = this.setState.bind(this);

        console.log("name: " + this.props.name)

    }

    handleStartDateChange(date) {
        this.setState({
            fechaInicio: date
        });
    }


    render()
    {

        return(
            <div>
            <DatePicker
        className='date-input'
        selected={this.state.fechaInicio}
        onChange={this.handleStartDateChange}
        />
                </div>);

            {/*<div className={(this.props.validation[this.props.name].isInvalid && 'has-error').toString()}>*/}
                {/*<label htmlFor = {this.props.name} >{this.props.label}</label>*/}
                {/*<DatePicker*/}
                    {/*className='date-input'*/}
                    {/*selected={this.state.fechaInicio}*/}
                    {/*onChange={this.handleStartDateChange}*/}
                {/*/>*/}
                {/*<span className="help-block">{this.props.validation[this.props.name].message}</span>*/}
            {/*</div>*/}


    }
}