import React, {Component} from 'react'
import CommonUtil from "@core/tool";
import PropTypes from 'prop-types';
import './index.scss'

class Le_react_localselect_bottom extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data :[],
        }
    }

    render(){
        return (
            <ul className="options">
                {this.getOptions()}
            </ul>
        )
    }

    getOptions(){
        let arr = [];
        if(this.props.dataSource && this.props.dataSource.length == 0){
            return
        }
        
        if(this.props.showBottom){
            this.props.dataSource.forEach(element => {
                arr.push(
                    <li 
                        key={element._tmpId}
                        onClick={this.clickOption.bind(this,[element])}
                        className={element._ck ? "active":""}
                    >
                        {element[this.props.displayName]}
                    </li>
                )
            });
        }
        return arr;
    }


    clickOption(item,e){
        this.props.dataSource.forEach(item=>{
            item._ck = false;
        })
        item[0]._ck = true;
        this.props.click && this.props.click(item)
    }
}

export default Le_react_localselect_bottom


Le_react_localselect_bottom.defaultProps = {   
    dataSource:[],
    displayName:'',
    click:()=>{},
    showBottom:false
}

Le_react_localselect_bottom.propTypes = {
    dataSource: PropTypes.array,
    displayName:PropTypes.string,
    click:PropTypes.func,
    showBottom:PropTypes.bool
}