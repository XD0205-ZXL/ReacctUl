import React from 'react';
import './static/common.css'
import './assets/font-awesome.css';

import {LeInput,Le_react_Button,Le_react_checkbox,
        Le_react_localselect,Le_react_autoComplate,Le_react_table
    } from "./out";

export class UsePage extends React.Component{
    constructor(props){
        super(props);
        this.field = "",
        this.autoSelectItems=[],
        this.tableMap = [
            {key:'name',value:'名称'},
            {key:'code',value:'编码'},
            {key:'descriptions',value:'介绍'},
        ],
        this.tableAciton = [
            {
                key:"update",
                val:"编辑",
                action:this.tableEdit
            },
            {
                key:"remove",
                val:"删除",
                action:this.tableRemoveItem
            },
            {
                key:"info",
                val:"详情",
                action:this.tableInfo
            },
        ]
        this.state = {
            
        }
    }
    tableEdit(){}

    tableRemoveItem(){}
    
    tableInfo(){}

    getItems(){
        let arr = this.refs.Le_react_localselect.getSelectitems();
        console.log(arr)
    }

    setItems(){
        this.refs.Le_react_localselect.setCheckedeItems("2001,2004");
    }

    getAutoSelectLi(){
        let arr = [];
        this.autoSelectItems.forEach(item=>{
            arr.push(
                <li onClick={(e)=>this.removeAutoSelect(item,e)} key={item._tmpId}>{item.word}</li>
            )
        })
        return arr
    }

    render(){
        return (
            <div>
                <button onClick={this.getItems.bind(this)}>获取选中的值:</button>
                <button onClick={this.setItems.bind(this)}>设置选中某项:</button>
                {/* select */}
                <Le_react_localselect
                    ref="Le_react_localselect"
                    label='请选择区域'
                    displayName='areaName'
                    displayValue='areaCode'
                    change={(d)=>{console.log(d)}}
                >
                </Le_react_localselect>
                
                <hr/>

                {/*  autoComplate */}
                <Le_react_autoComplate
                    ref="Le_react_outComplate"
                    label='可搜索的下拉'
                    displayName='word'
                    displayValue='areaCode'
                    change={this.getCurSelectOpt.bind(this)}
                    url="/suggest?keyword="
                    analysis={this.analysisFun}
                    field={this.field}
                >
                </Le_react_autoComplate>
                <p>我选择的是:{this.field}</p>
                <ul>
                    {this.getAutoSelectLi()}
                </ul>
                <hr/>

                {/* table */}
                <Le_react_table tableTitle="测试列表"
                    url="/site/resource/selectResource?name=&code="
                    map={this.tableMap}
                    showSelect={true}
                    singleSelect={false}
                    indexKey='curPage'
                    sizeKey='pageSize'
                    actions={this.tableAciton}
                    analysis={this.analysisTableData}
                ></Le_react_table>
            </div>
        )
    }

    //获取到用户选择的那条数据
    getCurSelectOpt(item){
        this.field = item[item.length-1].word;
        this.setState({fidle:item[0].word});
        // this.autoSelectItems = item;
        this.setState({autoSelectItems:item})
    }

    analysisTableData(data){
        return data.dataList
    }

    componentDidMount(){
        let data =[
            {areaName:'山西',areaCode:'2001'},
            {areaName:'北京',areaCode:'2002'},
            {areaName:'上海',areaCode:'2003'},
            {areaName:'重庆',areaCode:'2004'},
        ]
        this.refs.Le_react_localselect.init(data);
    }

    analysisFun(data){
        return data
    }
}

export default UsePage