import React from 'react';
import ReactDOM from 'react-dom';
import './static/common.css'
import Router from './router'

import {LeInput} from "./out";
  
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

export default Input_parent



ReactDOM.render(<Input_parent />, document.getElementById('app'));
