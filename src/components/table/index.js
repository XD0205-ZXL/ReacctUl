import React, {Component} from 'react'
import CommonUtil from "@core/tool";
import PropTypes from 'prop-types';
import './index.scss'

// select功能点：

class Le_react_table extends React.Component{
    constructor(props){
        super(props);
        
    }

    //渲染table的头部
    getTeadTh(){
        this.props.map && this.props.map.forEach((item)=>{

        })
    }

    render(){
        return (
            <div className="Le_react_table">
                { 
                    this.props.tableTitle &&  <div className="title">{this.props.tableTitle}</div>
                }
                <table className="tableContent">
                    <thead>
                        <tr>
                            {this.getTeadTh()}
                        </tr>
                    </thead>
                </table>
            </div>
        )
    }

    componentDidMount(){
        console.log(this.props.url);
        let cloneData = Co
    }
}
export default Le_react_table

Le_react_table.defaultProps = {   
    tableTitle:"",
    url:"",
    map:[],
    // displayName:"",
    // displayValue:"",
    // multiple:""
}

Le_react_table.propTypes = {
    tableTitle: PropTypes.string,
    url:PropTypes.string,
    map:PropTypes.array
    // displayName:PropTypes.string,
    // displayValue:PropTypes.string,
    // multiple:PropTypes.string
}
