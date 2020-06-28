import React, {Component} from 'react'
import CommonUtil from "@core/tool";
import PropTypes from 'prop-types';
import './index.scss'

// select功能点：
// 			属性：
// 				1.displayName 2.displayValue 3.placeholder 4.label 5.mutiple
// 			事件：
// 				1.change 2.clear
// 			方法：
// 				1.init() 2.setDisabled(flag){} 3.setValue() 4.getValue() 5.clear()

import Le_react_localselect_bottom from "./bottom.js";
class Le_react_localselect extends React.Component{
    constructor(props){
        super(props);
        this._id=CommonUtil._idSeed.newId();
        this._data = null;
        this._topData = [];
        this._bottomData = [];
        this._text = "";
        this.state = {
            data : [],
            disabled:false,
            showBottom:false,
        }
    }

    //返回 要在top上展示的 选中的label标签
    getSelectItemDom(){
        let domArr = [];
        if(this._topData && this._topData.length > 0){
            this._topData.map((item,index)=>{
                domArr.push(
                    <li key={index}
                        onClick={()=> this.removeCurItem(item)}
                    >
                        {item[this.props.displayName]}</li>
                )
            })
        }
        return domArr;
    }

    removeCurItem(item){
        item._ck = false;
        this.setState({topItems:this.state.data})
    }

    //是否展示下拉
    showBottom(){
        this.showOrHideBottom(true);
    };

    hideBottom(){
        this.showOrHideBottom(false);
    };

    showOrHideBottom(tag){
        this.setState({
            showBottom:tag
        })
    };

    render(){
        return (
            <div className="Le_react_localselect">
                <span className="label">{this.props.label}</span>
                <div className="Le_react_localselect_content">
                    <div className="Le_react_localselect_top"
                        onClick={this.showBottom.bind(this)}>
                        {/* 这个是用来展示选择的item选项 */}
                        <ul className="selectItems clearfix">
                            {this.getSelectItemDom()}
                        </ul>
                        <input onFocus={this.showBottom.bind(this)} 
                            type="text" 
                            className="Le_react_localselect_input"
                            onChange={this.filterResult}
                        />
                    </div>
                    <div className="Le_react_localselect_bottom">

                        <Le_react_localselect_bottom
                            ref="Le_react_localselect_bottom"
                            displayName={this.props.displayName}
                            showBottom={this.state.showBottom}
                            multiple={this.props.multiple}
                            data={this._bottomData}
                            click={this.getBottomSelectArr.bind(this)}
                        ></Le_react_localselect_bottom>
                    </div>

                </div>
            </div>
        )
    }

    setCheckedeItems(vals){
        let topArr = [];
        if(vals !== undefined && vals !== "" && vals !== null){
            vals.split(",").forEach((val)=>{
                this.state.data.forEach(obj=>{
                    if(val == obj[this.props.displayValue] ){
                        obj._ck = true;
                        topArr.push(obj)
                    }
                })
            })
            this.setState({data:this.state.data});
            this._topData = this.getSelectitems()
        }
    }
    
    init(data){
        this._data = data;
        let cloneData = CommonUtil.comp.cloneObj(data);
        let newArr = CommonUtil.comp.addPrimaryAndCk(cloneData);
        this.setState({
            data:newArr
        })
    }

    getSelectitems(){
        let arr = [];
        this.state.data.forEach(item => {
            if(item._ck){
                arr.push(item)
            }
        });
        return arr;
    }
    //点击上面的时候给bottom初始赋值
    showBottom(){
        this._topData = this.getSelectitems();
        this._bottomData = this.state.data;
        this.setState({showBottom:true})
    }

    //bottom发生点击事件的时候调用这个方法
    getBottomSelectArr(item){
        this.setState({data:this.state.data});
        //bottom发生变化  就通知top也变化
        let arr = this.getSelectitems();
        this._topData = arr;
    }

    filterResult=(e)=>{
        let arr = [];
        this._text = e.target.value;
        this.state.data.forEach((item)=>{
            if(item[this.props.displayValue].indexOf(this._text) != -1){
                arr.push(item);
            }
        })
        this._topData = this.getSelectitems();
        this._bottomData = arr;
        this.setState({
            data:this.state.data
        })

        this.props.change && this.props.change(this._text)
    }

}
export default Le_react_localselect

Le_react_localselect.defaultProps = {   
    label:"",
    displayName:"",
    displayValue:"",
    multiple:""
}

Le_react_localselect.propTypes = {
    label: PropTypes.string,
    displayName:PropTypes.string,
    displayValue:PropTypes.string,
    multiple:PropTypes.string
}
