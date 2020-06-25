import React from 'react';
import './static/common.css'
import './assets/font-awesome.css';

import {LeInput,Le_react_Button,Le_react_checkbox} from "./out";

export class UsePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            //inputde
            textVal : '222',
            disabled: false,

            //button的
            value1:"新建按钮",
            cls1:'search',
            iconName1:"fa fa-plus-square",
            disabled1:false,


            value2:"修改按钮",
            cls2:'modify',
            iconName2:"fa fa-pencil",
            disabled2:true,

            //checkbox的
            label:"职业：",
            disabled:false,
            displayName:'name',
            displayValue:'code'
        }
    }

    

    render(){
        return (
            <div>
                {/* ...........input组件的使用................. */}
                <button onClick={this.setval.bind(this)}>设置子组件的值</button>
                <LeInput 
                        ref = "inputs"
                        value={this.state.textVal} 
                        placeholderText="" 
                        changeName={this.changeName.bind(this)} 
                        change={(event)=>{this.changetext.bind(this)}}
                        disabled = {this.state.disabled}
                        tips="提示：请输入文字"
                        type="text"
                        enterAlert={this.alertName}
                ></LeInput>
                <p>父组件中的值是：{this.state.textVal}</p>

                {/* 。。。。。。。button组件的使用。。。。。。。。。。。。。 */}
                <Le_react_Button 
                    ref = "btn1"
                    value={this.state.value1} 
                    cls={this.state.cls1} 
                    iconName={this.state.iconName1} 
                    disabled={this.state.disabled1}
                    click={this.reSetBtnDisabled.bind(this)}
                ></Le_react_Button>
                <Le_react_Button 
                    ref = "btn2"
                    value={this.state.value2} 
                    cls={this.state.cls2} 
                    iconName={this.state.iconName2}
                    disabled={this.state.disabled2}
                    submit={this.onSubmitFun.bind(this)}
                ></Le_react_Button>


                {/* 。。。。。。。checkbox的使用。。。。。。。。。。。。。。。。。。。 */}
                <button onClick={this.setCheckboxVal.bind(this)}>设置chaeckbox的值</button>
                <Le_react_checkbox 
                    ref = 'Le_react_checkbox'
                    label={this.state.label}
                    displayName={this.state.displayName}
                    displayValue={this.state.displayValue}
                    change={this.getSelectitem}
                ></Le_react_checkbox>
            </div>
        )
    }
}