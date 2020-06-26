import React, {Component} from 'react'
import CommonUtil from "@core/tool";
import PropTypes from 'prop-types';
import "../../assets/base.scss";
import './index.scss';


class Le_react_localselect_bottom extends React.Component{
    constructor(props){
        super(props);
    
        this._data = null;
        this.state = {
            data : null,
            disabled:false
        }
    }

    //返回 要在Bottom上展示的 option选项
    getBottomOptionsDom(){
        let arr = [];
        if(this.state.data && this.state.data.length == 0){
            return
        }
        this.state.data && this.state.data.forEach((item,index) => {
            arr.push(
                <li 
                    className={item.__ck?"checked":""}
                    key={item.__tmpId} tmpid={item.__tmpId}
                    onClick={()=>{this.selecctItemHandler(item)}}
                >{item[this.props.displayName]}</li>
            )
        });
        return arr
    }

    selecctItemHandler(item){
        if(this.props.multiple !== undefined && this.props.multiple !== null && this.props.multiple !== false){
                item.__ck = !item.__ck;
        }else{
            this.state.data.map(obj=>{
                obj.__ck = false;
            })
            item.__ck = !item.__ck;
        }
        this.setState({
            data:this.state.data
        });
        let selectedArr = this.getCheckedItems();
        this.props.click && this.props.click(selectedArr)
    }

    getCheckedItems(){
        let arr = [];
        this.state.data.map(obj=>{
            if(obj.__ck){
                arr.push(obj)
            }
        });
        return arr;
    }

    render(){
        if(this.props.showBottom){
            return (
                <ul className="options">
                    {this.getBottomOptionsDom()}
                </ul>
            )
        }else{
            return (
                <div></div>
            )
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

    componentDidMount(){
        console.log(this.props.bottomData)
    }
}
    
export default Le_react_localselect_bottom

Le_react_localselect_bottom.defaultProps = {   
    label:"",
    displayName:'',
    showBottom:false,
    multiple:""
}

Le_react_localselect_bottom.propTypes = {
    label: PropTypes.string,
    displayName:PropTypes.string,
    showBottom:PropTypes.bool,
    multiple:PropTypes.string
}
