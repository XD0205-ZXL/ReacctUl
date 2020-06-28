import React from 'react';
import './static/common.css'
import './assets/font-awesome.css';

import {LeInput,Le_react_Button,Le_react_checkbox,
        Le_react_localselect,Le_react_outComplate
    } from "./out";

export class UsePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            Le_react_outComplateOptions:{
                getUrl:function(){
                    return '/newsbk/brand/audilist'
                },
                params:{
                    title: '',
                    pubStatus: '',
                    type: 61,
                    codeLike: '',
                    childType: '',
                    curPage: 1,
                    pageSize: 10
                },
                analysis:function(data){
                    console.log(this.data)
                    if(data){
                        return data
                    }
                }
                
            }
        }
    }

    getItems(){
        let arr = this.refs.Le_react_localselect.getSelectitems();
        console.log(arr)
    }

    setItems(){
        this.refs.Le_react_localselect.setCheckedeItems("2001,2004");
    }

    render(){
        return (
            <div>
                <button onClick={this.getItems.bind(this)}>获取选中的值:</button>
                <button onClick={this.setItems.bind(this)}>设置选中某项:</button>
                <Le_react_localselect
                    ref="Le_react_localselect"
                    label='请选择区域'
                    displayName='areaName'
                    displayValue='areaCode'
                    change={(d)=>{console.log(d)}}
                >
                </Le_react_localselect>

                {/*  可搜索的下拉 */}
                <Le_react_outComplate
                    ref="Le_react_outComplate"
                    label='可搜索的下拉'
                    displayName='word'
                    displayValue='areaCode'
                    options={this.state.Le_react_outComplateOptions}
                    change={this.getCurSelectOpt}
                    url="/suggest?keyword="
                    analysis={this.analysisFun}
                >
                </Le_react_outComplate>
            </div>
        )
    }

    //获取到用户选择的那条数据
    getCurSelectOpt(item){
        console.log("我选择的数据是")
        console.log(item)
        console.log("我选择的数据是")
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
        debugger
        console.log(data)
        return data
    }
}

export default UsePage