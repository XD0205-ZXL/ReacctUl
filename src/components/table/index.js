import React, {Component} from 'react'
import CommonUtil from "@core/tool";
import PropTypes from 'prop-types';
import Ajax from "@core/fetch.js";
import Le_react_table_body from "./TBody";
import Le_react_table_paging from "./paging";

import './index.scss'

// select功能点：

class Le_react_table extends React.Component{
    constructor(props){
        super(props);
        this.tablekey = CommonUtil._idSeed.newId();
        this.pageSizeArr = [
            {name:"1",code:1},
            {name:"3",code:3},
            {name:"5",code:5},
            {name:"50",code:50},
            {name:"100",code:100},
        ]
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
            arr.push(<th key='10000'><input type="checkbox" className="checkAll"/></th>)
        }
        if(this.props.showSelect && this.props.singleSelect ){
            arr.push(<th key='10000'></th>)
        }
        if(this.props.actions && this.props.actions.length> 0){
            arr.push(<th key='10001'>操作</th>)
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
        let curIndex = pageIndex?pageIndex:this.state.pageIndex; //第几页
        let pageSize = this.props.size;   //每页多少条
        let url = this.props.url;
        if(!url){
            this.alert("请给table设置有效的url");
            return;
        };
        
        let symbol = url.indexOf('?') === -1?"?":"&";
        url = url + symbol + this.props.indexKey + "=" + curIndex + "&" +this.props.sizeKey + "=" + this.state.size;
        Ajax.getFetch(url).then(x=>{
            let totalPagee = 0; 
            if( parseInt( x.data.count % this.state.size== 0)  ){
                totalPagee = parseInt( x.data.count / this.state.size)
            }else{
                totalPagee = parseInt(parseInt(x.data.count / this.state.size)) + 1;
            }
           
            let tmp = this.props.analysis(x.data);
            if(!CommonUtil.comp.checkArrayNull(tmp)){
                tmp = CommonUtil.comp.addPrimaryAndCk(tmp);
                    this.setState({
                        data:tmp,
                        count:x.data.count,
                        total:totalPagee
                    })
            }else{
                this.setState({
                    data:[]
                })
            }
            console.log(this.state)
        })
    }

    render(){
        if(this.state.data.length == 0 ){
            return false
        }
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
                {/* 分页 */}
                <Le_react_table_paging
                    curPageIndex={this.state.pageIndex}
                    curPageSize={this.state.size}
                    totalPage={this.state.total}
                    countNum={this.state.count}
                    getPre={this.getPre.bind(this)}
                    getNext={this.getNext.bind(this)}
                    jumpToPages={this.jumpToPages.bind(this)}
                    pageSizeArr={this.pageSizeArr}
                    changePageSize={this.changePageSizes.bind(this)}
                >
                        
                </Le_react_table_paging>
                <div v-show='isLoading' className="tableMask">
                    <img className="tableLoadingImg" src="//p2-nec.static.pub/fes/cms/2020/04/19/t960paupk2x9wzsw1y79dcmpeho847108450.gif"/>
                </div>
            </div>
        )
    }

    getPre(){
        let prePage = 0;
        if(this.state.pageIndex > 1){
            prePage = this.state.pageIndex - 1
        }else{
            prePage = 1;
        }
        this.setState({pageIndex:prePage},function(){
            this.getDate();
        });
    }
    getNext(){
        let nextPage = 0;
        if(this.state.pageIndex < this.state.total ){
            nextPage = this.state.pageIndex + 1
        }else{
            nextPage = this.state.total;
        }
        this.setState({pageIndex:nextPage},function(){
            this.getDate()
        });
    }
    jumpToPages(pageIndex){
        this.setState({pageIndex:pageIndex},function(){
            this.getDate()
        });
    }
    changePageSizes(val){
        
        this.setState({
            pageIndex:1,
            size:val.code
        },function(){
            this.getDate()
        })
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
