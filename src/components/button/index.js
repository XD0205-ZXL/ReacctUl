import React from 'react';
import "./index.scss";
import PropTypes from 'prop-types';
import ClsEnum from './enum.js';

class Le_react_Button extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            value : this.props.value,
            disabled:this.props.disabled?this.props.disabled:false,
            iconName:""
        }
    }
    componentDidMount(){
        this.refs.button.addEventListener('click',function(e){
            let x = e.offsetX;
            let y = e.offsetY;
            let ripples = document.createElement("span");
            ripples.classList.add("_ripples")
            ripples.style.left = x + "px";
            ripples.style.top = y + "px";
            e.target.appendChild(ripples);
            setTimeout(() => {
                ripples.remove();
            }, 1000);
        })
    }

    resetDisabled(val){
        this.setState({"disabled":val})
    }

    onClickhandler(){
        if(this.props.onClick){
            this.props.onClick();
        }else{
            this.onSubmitHandler(this.props.submit)
            
        }
    }

    runAsync2(){
        let Pro2 = new Promise(function(resolve,reject){
            setTimeout(function(){
                var num = Math.ceil(Math.random()*20); //生成1-10的随机数
                console.log('runAsync2的值：',num)
                if(num < 10 ){
                    resolve({msg:'runAsync2 成功了', num});
                }else{
                    reject({msg:'runAsync2 失败了' , num})
                }
            }, 2000);
        });
        return Pro2
    }

    onSubmitHandler(fn){
        this.resetDisabled(true);
        fn().then(data => {
            console.log(data.msg + data.num);
            this.resetDisabled(false);
            this.runAsync2().then(data2 => {
                console.log(".........................")
                console.log(data2.msg + num)
            }).catch(error =>{
                console.log(error.msg + error.num)
            })
        }).catch( error => {
            console.log(error.msg + error.num);
            this.resetDisabled(false);
            this.runAsync2().then(data2 => {
                console.log(".........................")
                console.log(data2.msg + data2.num)
            }).catch(error =>{
                console.log(error.msg + error.num)
            })
        });
    }

    render(){
        return (
            <div className= { `Le_react_Button`} 
                onClick={this.onClickhandler.bind(this)}
            >

                <i className={`icon ${this.props.iconName}`}></i>

                <button ref="button" 
                    className={`btn ${this.props.cls}  ${this.state.disabled?"disabled":""}`}
                    disabled={this.state.disabled}
                >{this.state.value}</button>

            </div>
        )
    }



}

export default Le_react_Button


Le_react_Button.defaultProps = {
    type:"",
    disabled:false,
    iconName:"",
    cls:'',
}

Le_react_Button.propTypes = {
    type:PropTypes.string,
    iconName:PropTypes.string,
    disabled: PropTypes.bool,
    cls:PropTypes.string,
}

