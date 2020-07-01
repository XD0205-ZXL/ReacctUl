import React, {Component} from 'react'
import CommonUtil from "@core/tool";
import PropTypes from 'prop-types';
import Ajax from "@core/fetch.js";
import Le_react_table_body from "./TBody";
import './index.scss'

// select功能点：

class Le_react_table extends React.Component{
    constructor(props){
        super(props);
        this.tablekey = CommonUtil._idSeed.newId()
        this.state = {
            data:[],
            pageIndex:this.props.index?this.props.index:1,
            size:this.props.size?this.props.size:10,
            count:0,
            total:0
        }
    }

    //渲染table的头部
    getTeadTh(){
        let arr = [];
        if(this.props.showSelect && !this.props.singleSelect ){
            arr.push(<th key='10000'> <input type="checkbox" className="checkAll"/> </th>)
        }
        if(this.props.showSelect && this.props.singleSelect ){
            arr.push(<th key='10000'></th>)
        }
        this.props.map && this.props.map.forEach((item,idx)=>{
            arr.push(
                <th key={idx}>
                    {item.key}
                </th>
            )
        })
        return arr;
    }

    //获取数据
    getDate(pageIndex){
        let curIndex = pageIndex?pageIndex:1; //第几页
        let pageSize = this.props.size;   //每页多少条
        let url = this.props.url;
        if(!url){
            this.alert("请给table设置有效的url");
            return;
        };
        
        let symbol = url.indexOf('?') === -1?"?":"&";
        url = url + symbol + this.props.indexKey + "=" + curIndex + "&" +this.props.sizeKey + "=" + this.state.size;
        Ajax.getFetch(url).then(x=>{
            let tmp = this.props.analysis(x.data);
            if(!CommonUtil.comp.checkArrayNull(tmp)){
                tmp = CommonUtil.comp.addPrimaryAndCk(tmp);
                this.setState({
                    data:tmp
                })
            }else{
                this.setState({
                    data:[]
                })
            }
        })
    }

    render(){
        return (
            <div className="Le_react_table" id={this.tablekey}>
                { 
                    this.props.tableTitle &&  <div className="title">{this.props.tableTitle}</div>
                }
                <table className="tableContent">
                    {/* 头部 */}
                    <thead>
                        <tr>
                            {this.getTeadTh()}
                        </tr>
                    </thead>
                    {/* 尾部 */}
                    <Le_react_table_body 
                        map={this.props.map}
                        data={this.state.data}
                        showSelect={this.props.showSelect}
                        singleSelect={this.props.singleSelect}
                        actions={this.props.actions}
                    ></Le_react_table_body>
                </table>
                <div v-show='isLoading' className="tableMask">
                    <img className="tableLoadingImg" src="//p2-nec.static.pub/fes/cms/2020/04/19/t960paupk2x9wzsw1y79dcmpeho847108450.gif"/>
                </div>
            </div>
        )
    }

    componentDidMount(){
        console.log(this.props.url);
        // let cloneData = Co
        this.getDate()
    }
}
export default Le_react_table

Le_react_table.defaultProps = {   
    tableTitle:"",
    url:"",
    map:[],
    showSelect:false,
    singleSelect:false,
    indexKey:"",
    sizeKey:"",
    actions:[]
}

Le_react_table.propTypes = {
    tableTitle: PropTypes.string,
    url:PropTypes.string,
    map:PropTypes.array,
    showSelect:PropTypes.bool,
    singleSelect:PropTypes.bool,
    indexKey:PropTypes.string,
    sizeKey:PropTypes.string,
    actions:PropTypes.array
}
