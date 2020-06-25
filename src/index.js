import React from 'react';
import ReactDOM from 'react-dom';
import './static/common.css'
import './assets/font-awesome.css';

import Router from './router'
import {Usepage} from './out'

// import {Le_react_Button,Le_react_checkbox} from "./out";
import {Le_react_radio} from "./out";
// input的使用
class Input_parent extends React.Component{
        constructor(props) {
            super(props);
            this.state = {
                textVal : '222',
                disabled: false
            }
        }

        changeName(e,val){
            if(e){
                this.setState({textVal:event.target.value})
            }else{
                this.setState({textVal:val})
            }
        }
        alertName(){
            alert('我是enter事件')
        }

        setval(){
            debugger
            let val = this.refs.inputs.setValue("我是新设置的值");
            console.log(val)
        }

    render() {
        return (
            <div>
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

            </div>
        )
    }
}
// export default Input_parent
// ReactDOM.render(<Input_parent />, document.getElementById('app'));

//button的使用
class Le_react_Button_parent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value1:"新建按钮",
            cls1:'search',
            iconName1:"fa fa-plus-square",
            disabled1:false,


            value2:"修改按钮",
            cls2:'modify',
            iconName2:"fa fa-pencil",
            // disabled2:true,
        }
    }

    //这个是调用click事件，同时调用 按钮组件内部的resetDisabled方法
    reSetBtnDisabled(){
        this.refs.btn2.resetDisabled(true);
        console.log('也许我们都该好好想想自己想要的究竟是什么，而不是浑浑噩噩，漫无目的')
    }

    onSubmitFun(){
        console.log("点击submit按钮，这个ProMise方法被调用了");
        //传入一个 promise
        let promiseFun = new Promise(function(resolve,reject){
            //做一些异步操作
            setTimeout(function(){
                var num = Math.ceil(Math.random()*20); //生成1-10的随机数
                console.log('随机数生成的值：',num)
                if(num < 10 ){
                    resolve({msg:'成功了', num});
                }else{
                    reject({msg:'失败了' , num})
                }
            }, 2000);
        });
        return promiseFun
    }

    render(){
        return (
            <div>
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
            </div>
        )
    }
}

//button的使用
// export default Le_react_Button_parent
// ReactDOM.render(<Le_react_Button_parent />, document.getElementById('app'));

//checkbox的使用
class Le_react_checkbox_parent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            label:"职业：",
            disabled:false,
            displayName:'name',
            displayValue:'code'
        }
    }

    render(){
        return (
            <div>
                <button onClick={this.setCheckboxVal}>设置chaeckbox的值</button>
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

    componentDidMount(){
        let dataSource = [
            {name:'程序员',code:'1001'},
            {name:'老师',code:'1002'},
            {name:'医生',code:'1003'},
            {name:'警察',code:'1004'},
            {name:'主持人',code:'1005'},
        ]
        this.refs.Le_react_checkbox.init(dataSource);
        this.refs.Le_react_checkbox.setDisabled(this.state.disabled);
    }

    setCheckboxVal(){
        this.refs.Le_react_checkbox.setCheckedItems("1001,1005,1006");
    }

    getSelectitem(selectArr){
        console.log(selectArr)
    }


}
// export default Le_react_checkbox_parent
// ReactDOM.render(<Le_react_checkbox_parent />, document.getElementById('app'));


// export default Le_react_Button_parent
// ReactDOM.render(<Le_react_Button_parent />, document.getElementById('app'));

//radio的使用
class Le_react_radio_parent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            label:"职业：",
            disabled:false,
            displayName:'name',
            displayValue:'code'
        }
    }

    render(){
        return (
            <div>
                <button onClick={this.setCheckboxVal.bind(this)}>设置chaeckbox的值</button>
                <Le_react_radio
                    ref = 'Le_react_radio'
                    label={this.state.label}
                    displayName={this.state.displayName}
                    displayValue={this.state.displayValue}
                    change={this.getSelectitem.bind(this)}
                ></Le_react_radio>
            </div>
        )
    }

    componentDidMount(){
        let dataSource = [
            {name:'程序员',code:'1001'},
            {name:'老师',code:'1002'},
            {name:'医生',code:'1003'},
            {name:'警察',code:'1004'},
            {name:'主持人',code:'1005'},
        ]
        this.refs.Le_react_radio.init(dataSource);
        this.refs.Le_react_radio.setDisabled(this.state.disabled);
    }

    setCheckboxVal(){
        this.refs.Le_react_radio.setCheckedItems("1004");
    }

    getSelectitem(selectArr){
        //这个是组件里面 发生change的时候 抛出来的值
        console.log(selectArr)
        //这个是调用的子组件里面的getCheckedItems方法
        let arr = this.refs.Le_react_radio.getCheckedItems();
        console.log(arr)
    }


}
// export default Le_react_radio_parent
// ReactDOM.render(<Le_react_radio_parent />, document.getElementById('app'));


ReactDOM.render(<Usepage></Usepage>,document.getElementById('app'))

