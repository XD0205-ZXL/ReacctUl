import React, {Component} from 'react'
import CommonUtil from "@core/tool";
import Ajax from "@core/fetch.js";
import PropTypes from 'prop-types';
import './index.scss'

import Le_react_outComplate_bottom from "./bottom.js";
class Le_react_outComplate extends React.Component{
    constructor(props){
        super(props)
        this._topData = [];
        this._text = "";
        this.flags = -1;
        this.state = {
            data :[],
            showBottom:false
        }
    }

    getSelectTips(){
        if(this._topData.length > 0){
            return <span className="tips">{this._topData[0][this.props.displayName]}</span>
        }else{
            return <p></p>
        }
    }

    render(){
        return (
            <div className="Le_react_outComplate" onClick={this.getFocus.bind(this)}>
                <span className="label">{this.props.label}</span>
                <div className="topContent">
                    {/* {this.getSelectTips()} */}
                    <input ref="input" type="text" onChange={(e)=>this.seedAjaxGetdata(e)}/>
                </div>
                {this.flags > 0 &&
                    <p>我是if渲染的</p>}
                {
                    this.flags < 0 && <p>我是else渲染的</p>
                }
                <Le_react_outComplate_bottom
                    ref="Le_react_outComplate_bottom"
                    dataSource={this.state.data}
                    displayName={this.props.displayName}
                    click={this.getSelectItem.bind(this)}
                    showBottom={this.state.showBottom}
                ></Le_react_outComplate_bottom>
            </div>
        )
    }

    getFocus(){
        this.refs.input.focus();
        if(this.state.data.length > 0 ){
            this.state.showBottom = true;
        }else{
            this.state.showBottom = false;
        }
        this.setState({data:this.state.data})
        
    }

    //发送ajax
    seedAjaxGetdata(e){
        this._text = e.target.value;
        if(!this.props.url){
            alert("请配置ajax的url");
            return
        }
        Ajax.getFetch(this.props.url + this._text).then(x=>{
            debugger
            let tmp = this.props.analysis(x.data);
            if(!CommonUtil.comp.checkArrayNull(tmp)){
                tmp = CommonUtil.comp.addPrimaryAndCk(tmp);
                this.setState((prevState)=>{
                    return {
                        data:tmp,
                        showBottom:true
                    }
                })
                this._activeIndex = -1;
            }
        })
    }

    //监听bottom的点击事件 获取到当前用户点击的数据
    getSelectItem(item){
        debugger
        this._topData=item;
        this.props.change && this.props.change(item);
        this.setState({data:this.state.data,showBottom:false})
    }
}

export default Le_react_outComplate


Le_react_outComplate.defaultProps = {   
    label:"",
    displayName:"",
    displayValue:"",
    multiple:"",
    url:"",
    analysis:()=>{},
    change:()=>{}
}

Le_react_outComplate.propTypes = {
    label: PropTypes.string,
    displayName:PropTypes.string,
    displayValue:PropTypes.string,
    multiple:PropTypes.string,
    url:PropTypes.string,
    analysis:PropTypes.func,
    change:PropTypes.func
}