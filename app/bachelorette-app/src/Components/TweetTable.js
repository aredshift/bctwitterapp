import React, {Component} from 'react'
import ReactTable from 'react-table'
import "react-table/react-table.css"
import "./TweetTable.css"

class TweetTable extends Component{

    columns = [
        {
            Header : "Tweet",
            accessor : "text",
            style:{ 'whiteSpace': 'unset'}
        },
        {
            Header : "Account",
            accessor : "account",
            width: 150
        },
        {
            Header : "Time",
            accessor : "time",
            width: 200
        }
    ];

    render() {
        return(
            <ReactTable 
                className='tweettable'
                columns={this.columns}
                data={this.props.data}
                showPaginationTop={true}
                showPaginationBottom={true}
                defaultPageSize={10}
                noDataText={"No tweets found, try searching again!"}
            />
        )
    }
}

export default TweetTable