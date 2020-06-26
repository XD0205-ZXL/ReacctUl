import React from 'react';
import './static/common.css'
import './assets/font-awesome.css';

import {LeInput,Le_react_Button,Le_react_checkbox,Le_react_localselect} from "./out";

export class UsePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            Le_react_localselect : {
                label:'请选择区域:',
                displayName:"areaName",
                displayValue:'areaCode'
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
                    label={this.state.Le_react_localselect.label}
                    displayName={this.state.Le_react_localselect.displayName}
                    displayValue={this.state.Le_react_localselect.displayValue}
                    change={(d)=>{console.log(d)}}
                >

                </Le_react_localselect>
            </div>
        )
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
}

export default UsePage