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
        if(this.props.data && this.props.data.length == 0){
            return
        }
        this.props.data && this.props.data.forEach((item,index) => {
            arr.push(
                <li 
                    className={item._ck?"checked":""}
                    key={item._tmpId} tmpid={item._tmpId}
                    onClick={()=>{this.selecctItemHandler(item)}}
                >{item[this.props.displayName]}</li>
            )
        });
        return arr
    }

    selecctItemHandler(item){
        if(this.props.multiple !== undefined && this.props.multiple !== null && this.props.multiple !== false){
                item._ck = !item._ck;
        }else{
            this.state.data.map(obj=>{
                obj._ck = false;
            })
            item._ck = !item._ck;
        }
       
        // let selectedArr = this.getCheckedItems();
        this.props.click && this.props.click(item)
    }

    getCheckedItems(){
        let arr = [];
        this.state.data.map(obj=>{
            if(obj._ck){
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
    multiple:"",
    data:[]
}

Le_react_localselect_bottom.propTypes = {
    label: PropTypes.string,
    displayName:PropTypes.string,
    showBottom:PropTypes.bool,
    multiple:PropTypes.string,
    data:PropTypes.array
}
