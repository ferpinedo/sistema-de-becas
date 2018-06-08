import React from 'react';

import ReactTable from "react-table";
import 'react-table/react-table.css'
import matchSorter from 'match-sorter'
import {Button} from "reactstrap";
import {drop} from '../utils/MongoDeleter'

export class TableWrapper extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            tableData: {},
            dataLoaded: false
        };
        this.setState = this.setState.bind(this);
        this.refreshTable = this.refreshTable.bind(this);

    }

    componentDidMount() {
       this.refreshTable();
    }

    refreshTable() {
        console.log("Pulling data from: " + this.props.url);
        let self = this;
        fetch(self.props.url)
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

    generateColumns() {
        let self = this;
        let columns = [];

        if (self.state.tableData[0] === undefined){
            console.log("Is undefined")
            return;
        }

        Object.keys(self.state.tableData[0]).forEach(key => {
            console.log("KEY: "+ key);
            if (self.props.columnsData[key] === undefined){
                console.log("Is undefined")
                return;
            }

                columns.push({
                    Header: self.props.columnsData[key].name,
                    accessor: key,
                    width:self.props.columnsData[key].width,
                    filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: [key] }),
                    filterAll: true
                })

        });

        columns.push({
            header: '',
            id: 'click-me-button',
            width: 80,
            alignContent: "center",
            Cell:({ row }) => (<Button color="warning" onClick={() => this.handleButtonClick(row)}>Delete</Button>)
        })

        return columns;
    }

    handleButtonClick(row)
    {
        console.log("clicked!: " + row)
        drop(this.props.url, row)
    }

    render(){
        if (this.state.dataLoaded)
        {
            let columnsData = this.generateColumns();
            console.log("Here")
            return(
                    <div className="table">
                        <h2>{this.props.name}</h2>
                        <ReactTable
                            data={this.state.tableData}
                            filterable
                            defaultFilterMethod={(filter, row) =>
                                String(row[filter.id]) === filter.value}
                            columns={[
                                {
                                    Header: "",
                                    columns: columnsData
                                }
                            ]}
                            defaultPageSize={5}
                            className="-striped -highlight"
                        />
                    </div>
            );
        }
        else {

            return(
                <div className="table">
                    <h5>.</h5>
                </div>
            );
        }
    }
}


/*  Ejemplo: <TableWrapper columnsData={numControl:{name: "Número de Control", filter: true}/>  */
