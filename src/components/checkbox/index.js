
import React, {Component} from 'react'
import CommonUtil from "@core/tool";
import PropTypes from 'prop-types';
import './index.scss'

// checkbox功能点：
// 			属性：
// 				data:   []挂载在state上
// 				disabled
// 				label:非必填
// 				displayName
// 				displayValue
// 			事件：
// 				click
// 			方法：
// 				init()
// 				getCheckedItems()
// 				setCheckedItems()
// 				getItemByField()

class Le_react_checkbox extends React.Component{
    constructor(props){
        super(props);

        this._id = CommonUtil._idSeed.newId();
        this._data = null;
        this.state ={
            data:[]
        }
    }

    getCheckboxItems(){
        let arr = [];
        this.state.data.map(item => 
            arr.push(
                <li key={item.__tmpId}>
                    <input type="checkbox"/>
                    <span>{item.name}</span>
                </li>
            )
        )
        return arr;
    }

    render(){
        debugger
        if(this.state.data.length == 0){
            return null;
        }
        return (
            <div className="Le_react_checkbox">
                <p className="Le_react_checkbox_label">{this.props.label}</p>
                <div className="Le_react_checkbox_options">
                    <ul>
                        {this.getCheckboxItems()}
                    </ul>
                </div>
            </div>
        )
    }

    init(data){
        this._data = data;
        let cloneData = CommonUtil.object.cloneObj(data);
        let tmp = CommonUtil.comp.addPrimaryAndCk(cloneData);
        this.setState({data:tmp});
    }

    componentDidMount(){
        
    }

}
export default Le_react_checkbox;

Le_react_checkbox.defaultProps = {
    label:"",
    displayName:"",
    displayValue:"",
}

Le_react_checkbox.propTypes = {
    label:PropTypes.string,
    displayName:PropTypes.string,
    displayValue:PropTypes.string
}

