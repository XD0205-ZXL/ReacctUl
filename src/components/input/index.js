//props:   disabled 验证(先不做) tips errorMsg placeholder label width value type
//event:   change enter blur click
//methods: clear focus setValue getValue

// input功能点：
// 属性： 1.disabled 2.validate(先不做) 3.tips 4.errorMsg 5.placeholder 6.label 7.value 8.type
// 事件： 1.change 2.enter 3.blur 4.click
// 方法：1.clear() 2.set() 3.get() 4.focus()


import React, {Component} from 'react'
import CommonUtil from "@core/tool";
import PropTypes from 'prop-types';
import './index.scss'

class Le_react_input extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            value:"",
            focus:true,
            placeholderText:"",
            _id:CommonUtil._idSeed.newId()
        };
    }

    change(event,val){
        if(event){
            this.setState({value: event.target.value});
            if(event.target.value.length == 0 ){
                if(this.state.placeholderText !== undefined && this.state.placeholderText !== null){
                    this.setState({focus:true});
                }else{
                    this.setState({focus:false});
                }
            }
            this.props.changeName(event)
        }else{
            this.props.changeName(null,val)
        }
        
    }

    setValue(val){
        //这个主要是改变了父组件传给子组件的值，才变的
        this.change(null,val);
    }

    getValue(){

        return this.state.value;
    }

    focusHandler(){
        this.setState({
            focus:true
        })
    }
    blurHandler(){
        if(this.state.value !== "" || this.state.placeholderText !==""){
            this.setState({
                focus : true
            })
        }else{
            this.setState({
                focus : false
            })
        }
    }

    clearVal(event){
        this.setState({
            value:""
        },function(){
            this.blurHandler();
        })
        this.props.changeName(event);
    }

    clickhandler(e){
        debugger
        if(e.nativeEvent.keyCode === 13){
            this.props.enterAlert();
        }else{
            alert("我只是普通的click事件")
        }
    }

    render(){
        const {value,placeholderText,_id,changeName,clearVal,disabled,enterAlert} = this.props;
        // this.setState({value: this.props.value});
        return (
            <div className={`input_group ${this.state.focus?"focus":""}`}>
                <div className="input_control">
                    <div className="input_slot">
                        <div className="text_field">
                            <label>Main input</label>
                            <input 
                                value={this.props.value}
                                disabled={this.props.disabled}
                                className={this.props.disabled?'disabled':''}
                                type={this.props.type}
                                placeholder={this.props.placeholderText} 
                                onChange={this.change.bind(this)} 
                                onFocus={this.focusHandler.bind(this)} 
                                onBlur={this.blurHandler.bind(this)}
                                onKeyPress={this.clickhandler.bind(this)}
                            />

                            <span className="input_ClearBtn" onClick={this.clearVal.bind(this)}></span>
                        </div>
                    </div>
                    <div className="input_detail">
                        <p>{this.props.tips}</p>
                    </div>
                </div>
                <button onClick={this.props['changeName']}>我是一个按钮</button>
                {/* <button onClick={this.setValue.bind(this)}>改变自己的值</button> */}
            </div>
        )
    }

    componentWillReceiveProps(nextProps){
        console.log(2222)
        // this.setState({
        //     value:nextProps.
        // })
    }
}

export default Le_react_input;

Le_react_input.defaultProps = {
    disabled: false,
    tips:"",
    errorMessage:"",
    placeholder:"",
    label:"",
    value:"",
    reg:"",
}

Le_react_input.propTypes = {
    disabled: PropTypes.bool,
    tips:PropTypes.string,
    errorMessage:PropTypes.string,
    placeholder:PropTypes.string,
    label:PropTypes.string,
    value:PropTypes.string,
    reg:PropTypes.string
}
