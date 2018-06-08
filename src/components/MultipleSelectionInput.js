import React from 'react';
import {FormGroup} from "reactstrap";
import ControlLabel from "react-bootstrap/es/ControlLabel";
import FormControl from "react-bootstrap/es/FormControl";

export class MultipleSelectionInput extends React.Component{
    constructor(){
        super();
        this.state = {
            dataLoaded: false,
            optionsPulled: [],
            firstOption:'',
            options:[]
        }
        this.setState = this.setState.bind(this);
    }
    pullOptions() {
        console.log("Pulling data from: " + this.props.url);
        let self = this;
        fetch(self.props.url)
            .then(results => {
                console.log("Results: " + results);
                console.log(JSON.stringify(results));
                results.json().then((json)=>{
                    console.log("Options pulled: " + JSON.stringify(json));

                    self.setState({
                        optionsPulled: json
                    }, ()=>{
                        console.log("This.state: " + JSON.stringify(self.state));
                        self.setState({
                            dataLoaded: true
                        });
                    });

                });
                return results;
            });
    }
    
    generateOptions()
    {
        let options = [];
        if (this.state.optionsPulled[0] === undefined){
            console.log("Is undefined");
            return;
        }

        let firstOption = true;

        this.state.optionsPulled.forEach(currentOption => {
            console.log("Current Option: "+ JSON.stringify(currentOption));
            options.push(
                <option value={currentOption[this.props.value]}>{this.props.names}</option>
            );

            if (firstOption){
                this.setState({firstOption: currentOption[this.props.value]});
                firstOption = false;
            }
        }, ()=> this.setState({optionsData: options}));

    }
    did = 5;
    count = 0;
    render()
    {
        if (this.state.dataLoaded) {
            if (this.count < this.did){
                this.did = false;
                console.log("Data loaded");
                this.generateOptions();
                console.log("options !!!" + JSON.stringify(this.state.optionsData))
                this.count++;
            }
            return (
                <div>
                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>{this.props.label}</ControlLabel>
                        <FormControl componentClass="select" placeholder={this.state.firstElement}>
                            {this.state.optionsData}
                        </FormControl>
                    </FormGroup>
                </div>
            );
        }else{
            this.pullOptions();
            return(
                <div>
                    <label htmlFor = {this.props.name} >{this.props.label}</label>
                    <input type = {this.props.name} className="form-control"name = {this.props.name} placeholder = ""/>
                </div>
            );
        }
    }
}


