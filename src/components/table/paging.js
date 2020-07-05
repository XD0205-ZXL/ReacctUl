import React, {Component} from 'react'
import CommonUtil from "@core/tool";
import PropTypes from 'prop-types';
import Ajax from "@core/fetch.js";

import {Le_react_Button,Le_react_localselect} from "../../out";
import './index.scss'

class Le_react_table_paging extends React.Component{
    constructor(props){
        super(props),
        this.state = {
            jumpPageNum : 0
        }
    }

    getPageSizeDom(){
        let arr = [];
        if(this.props.pageSizeArr && this.props.pageSizeArr.length > 0){
             this.props.pageSizeArr.forEach(item=>{
                arr.push( <li onClick={this.changePageSize.bind(this,item)} key={item.code}>{item.name}</li>)
            })
        }
        return  arr
    }

    render(){
        return (
            <div className="clearfix">
                <ul>
                    {this.getPageSizeDom()}
                </ul>
                {/* <Le_react_localselect
                    ref="Le_react_localselect"
                    label='选择条数'
                    displayName='name'
                    displayValue='code'
                    change={(d)=>this.changePageSize}
                ></Le_react_localselect> */}
                <ul className="clearfix pagings">
                    <li>total:{this.props.countNum}</li>
                    <li className="btn" onClick={this.getPreData.bind(this)}>上一页</li>
                    <li className="btn" onClick={this.getNextData.bind(this)}>下一页</li>
                    <li>Current:{this.props.curPageIndex}/{this.props.totalPage}</li>
                    <li>跳转到:<input onChange={this.changeInputVal.bind(this)} defaultValue={this.state.jumpPageNum}/>页 ： 
                        <Le_react_Button value="确定" onClick={this.jumpToPage.bind(this)}></Le_react_Button>
                    </li>
                </ul>
            </div>
        )
    }

    getPreData(){
        this.props.getPre();
    }
    getNextData(){
        this.props.getNext()
    }
    changeInputVal(event){
        // this.jumpPageNum = event.target.value
        this.setState({
            jumpPageNum: event.target.value
        })
    }
    jumpToPage(){
        this.props.jumpToPages(this.state.jumpPageNum)
    }
    changePageSize(data){
        this.props.changePageSize(data)        
    }

    componentDidMount(){
        this.setState({
            curPageIndex : this.props.curPageIndex?this.props.curPageIndex : 1,
            curPageSize : this.props.curPageSize?this.props.curPageSize:10,
            total : this.props.totalPage?this.props.totalPage:0,
            count:this.props.countNum?this.props.countNum : 0
        })
        // this.refs.Le_react_localselect.init(this.props.pageSizeArr);
    }
}

export default Le_react_table_paging


Le_react_table_paging.defaultProps = {
    total:0,//总页数
    count:0,// 总条数
    curPageIndex:0,
    curPageSize:0,
    getPre:()=>{},
    getNext:()=>{},
    jumpToPages:()=>{},
    pageSizeArr:[],
    changePageSize:()=>{}
}

Le_react_table_paging.propTypes = { 
    total : PropTypes.number,
    count:PropTypes.number,
    curPageIndex:PropTypes.number,
    curPageSize:PropTypes.number,
    getPre:PropTypes.func,
    getNext:PropTypes.func,
    jumpToPages:PropTypes.func,
    pageSizeArr:PropTypes.array,
    changePageSize:PropTypes.func
}
