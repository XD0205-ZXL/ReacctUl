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
        this.state = {
            data : null,
            disabled:false,
            showBottom:false,
            topItems:[],
        }
    }

    //返回 要在top上展示的 选中的label标签
    getSelectItemDom(){
        let domArr = [];
        if(this.state.topItems && this.state.topItems.length > 0){
            this.state.topItems.map((item,index)=>{
                domArr.push(
                    <li key={index}
                        onClick={()=> this.clearTopItem(item)}
                    >
                        {item[this.props.displayName]}</li>
                )
            })
        }
        return domArr;
    }

    clearTopItem(item){
        this.state.topItems.map((obj)=>{
            if(item._tmpId == obj._tmpId){
                obj._ck = false;
            }
        })
        let arr = this.refs.Le_react_localselect_bottom.getCheckedItems();
        this.setState({topItems:arr})
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
                    <div className="Le_react_localselect_top">
                        {/* 这个是用来展示选择的item选项 */}
                        <ul className="selectItems clearfix">
                            {this.getSelectItemDom()}
                        </ul>
                        <input onFocus={this.showBottom.bind(this)} 
                            type="text" 
                            className="Le_react_localselect_input"/>
                    </div>
                    <div className="Le_react_localselect_bottom">

                        <Le_react_localselect_bottom
                            ref="Le_react_localselect_bottom"
                            displayName={this.props.displayName}
                            showBottom={this.state.showBottom}
                            multiple={this.props.multiple}
                            click={this.getCheckedeItems.bind(this)}
                        ></Le_react_localselect_bottom>
                    </div>

                </div>
            </div>
        )
    }

    getCheckedeItems(arr){
        this.setState({
            topItems : arr
        })
        return this.state.topItems;
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
            this.setState({topItems:topArr})
            this.setState({data:this.state.data})
            this.refs.Le_react_localselect_bottom.init(this.state.data);
        }
    }
    
    init(data){
        this._data = data;
        let cloneData = CommonUtil.comp.cloneObj(data);
        let newArr = CommonUtil.comp.addPrimaryAndCk(cloneData);
        this.setState({
            data:newArr
        })
        this.refs.Le_react_localselect_bottom.init(data);
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
