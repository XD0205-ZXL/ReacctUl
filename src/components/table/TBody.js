import React, {Component} from 'react'
import CommonUtil from "@core/tool";
import PropTypes from 'prop-types';
import Ajax from "@core/fetch.js";

import {Le_react_Button} from "../../out";

import './index.scss'


class Le_react_table_body extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:[],
            radioKey:CommonUtil._idSeed.newId()
        }
    }

    getActionsBtn(){
        let btnsArr = [];
        this.props.actions.forEach(item=>{
            btnsArr.push(
                <Le_react_Button cls={item.key} 
                key={item.key} value={item.val}
                iconName="fa-camera-retro"
            ></Le_react_Button>
            )
        })
        return btnsArr
    }

    getTd(element){
        let tdArr = []
        if(this.props.showSelect){
            tdArr.push(<td key={1000001}>
                <input defaultChecked={element._ck} name={this.state.radioKey} 
                type={this.props.singleSelect?"radio":"checkbox"}/></td>)
        }
       
        if(this.props.actions && this.props.actions.length > 0){
            tdArr.push(
               <td key={1000002}>  
                    { 
                        this.getActionsBtn()
                    } 
                </td>
            )
        }
        
        this.props.map && this.props.map.length > 0 && this.props.map.forEach((item,index)=>{
            tdArr.push(<td key={index}>{element[item.key]}</td>)
        })   
        return tdArr;   
    }
    getTr(){
        let trArr = [];
        if(this.props.data.length > 0 ){
            this.props.data.forEach((item,idx)=>{
                trArr.push(<tr key={item._tmpId}>{this.getTd(item)}</tr>)
            })
        }
        return trArr
    }

    //渲染body
    getColSpanNum(){
        let maplength = 0; 
        if(!this.props.singleSelect && this.props.showSelect){
            maplength ++;
        }
        if(this.props.actions){
            maplength ++;
        }
        if(this.props.map && this.props.map.length > 0 ){
            maplength = maplength + this.props.length
        }
        return maplength
    }

    render(){
        return (
            <tbody>
                {
                    this.props.data && this.props.data.length && this.getTr()
                }
                {
                this.props.data.length == 0 &&   
                    <tr key='1'>
                        <th>暂无数据</th>
                    </tr>
                }
            </tbody>
        )
    }

    componentDidMount(){
    }
}
export default Le_react_table_body

Le_react_table_body.defaultProps = {   
    data:[],
    map:[],
    singleSelect:false,
    showSelect:false,
    actions:[]
}

Le_react_table_body.propTypes = {
    data:PropTypes.array,
    map:PropTypes.array,
    singleSelect:PropTypes.bool,
    showSelect:PropTypes.bool,
    actions:PropTypes.array
}
