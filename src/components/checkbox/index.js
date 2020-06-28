
import React, {Component} from 'react'
import CommonUtil from "@core/tool";
import PropTypes from 'prop-types';
import './index.scss'

// checkbox功能点：
// 			属性：
// 				data:   []挂载在state上    。。。。
// 				disabled                  。。。。
// 				label:非必填               。。。。
// 				displayName               。。。。
// 				displayValue              。。。。
// 			事件：
// 				click                     。。。。
// 			方法：
// 				init()                    。。。。
// 				getCheckedItems()         。。。。
// 				setCheckedItems()         。。。。
// 				getItemByField()

class Le_react_checkbox extends React.Component{
    constructor(props){
        super(props);
        this._id = CommonUtil._idSeed.newId();
        this._data = null;
        this.state ={
            data:[],
            disabled:false,
        }
    }

    render(){
        // debugger
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

    //循环数据源 然后生成 CheckBox的每一个选项
    getCheckboxItems(){
        let arr = [];
        this.state.data.map(item => 
            arr.push(
                <li key={item._tmpId} tmpid={item._tmpId}
                    className={this.state.disabled?"readonlyItem":""}
                    // onClick={this.clickItem.bind(this,item)}
                >
                    <input type="checkbox" 
                        checked={item._ck}
                        disabled={this.state.disabled}
                        onChange={()=>this.changeItemCk(item)}
                    />
                    <span>{item[this.props.displayName]}</span>
                </li>
            )
        )
        return arr;
    }

    setDisabled(val){
        this.setState({disabled:val})
    }

    clickItem(curItem,e){
        // this.state.data.map((item)=>{
        //     if(curItem._tmpId == item._tmpId){
        //         curItem._ck = !curItem._ck
        //     }
        // })
        curItem._ck = !curItem._ck;
        this.setState({data:this.state.data})
        let arr = this.getCheckedItems()
        this.props.change && this.props.change(arr);
    }

    changeItemCk(item){
        this.clickItem(item);   
    }

    getCheckedItems(){
        let arr = [];
        this.state.data.map((item)=>{
            if(item._ck){
                arr.push(item);
            }
        })
        if(arr.length == 1){
            return arr[0]
        }else{
            return arr;
        }
    }

    setCheckedItems(val){
        this.state.data.forEach(item=>{
            item._ck = false;
            let itemVal = item[this.props.displayValue];
            val && val.split(",").forEach(obj=>{
                if(obj == itemVal){
                    item._ck = true; 
                }
            })
        });
        this.setState({state:this.state.data})
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
    displayValue:PropTypes.string,
}

