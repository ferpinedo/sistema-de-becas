import React from 'react';

export class StringInput extends React.Component{
    render()
    {
        return(
            <div className={(this.props.validation[this.props.name].isInvalid && 'has-error').toString()}>
                <label htmlFor = {this.props.name} >{this.props.label}</label>
                <input type = {this.props.name} className="form-control"
                       name = {this.props.name}
                       placeholder = ""
                       onChange = {this.props.onChange}
                />
                <span className="help-block">{this.props.validation[this.props.name].message}</span>
            </div>
        );
    }
}

/*   Ejemplo:   <FormInput validation={validation} onChange={this.handleInputChange} name={"clave"} label={"Clave}/>   */