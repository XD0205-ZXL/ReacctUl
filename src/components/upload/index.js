import React, {Component} from 'react'
import CommonUtil from "@core/tool";
import PropTypes from 'prop-types';

import Ajax from "@core/fetch.js";


import './index.scss'

class Le_react_upload extends React.Component{
    constructor(props){
        super(props);
        this.uploadkey = CommonUtil._idSeed.newId();
        this.state = {
            imgList:[],
            onFocusFlag:false
        }
        this.fileList = []
    }

    render(){
        return (
            <div className="Le_react_upload clearfix">
                <div className={`uploadContent ${this.state.onFocusFlag?"onFocus":""} `}>
                    <input
                        onFocus={this.onFocusCls.bind(this)}
                        onBlur={this.onBlurCls.bind(this)}
                        onChange={this.uploadFiles.bind(this)} 
                        ref={this.uploadkey} 
                        type="file" 
                        className="uploadInput"
                        multiple={this.props.multiple} 
                        disabled={this.props.disabled}
                    />

                    { this.state.imgList && this.state.imgList.length > 0 && 
                        <div className="imgList">
                            {this.getImgList()}
                        </div>
                    }
                </div>  
                { this.props.label  && <label 
                    className={`label ${this.state.onFocusFlag?"onFocus":""}`}

                >{this.props.label}:</label>}

            </div>
        )
    }
  
    getImgList(){
        let imgList = [];
        if(this.state.imgList && this.state.imgList.length > 0 ){
            this.state.imgList.forEach((imgItem,idx)=>{
                imgList.push( 
                    <a key={idx} href={imgItem}>图片{idx}</a>
                )
            })
        }
        return imgList
    }

    onFocusCls(){
        // if(this.state.onFocusFlag){
        this.setState({onFocusFlag:true})
    }

    onBlurCls(){
        // if(this.state.onFocusFlag){
        this.setState({onFocusFlag:false})
    }

    uploadFiles(){  
        this.fileList = this.refs[this.uploadkey].files;
        if(!this.checkType()){
            alert("后缀名必须为"+this.props.type);
            this.reloadFileInput();
            return;
        };

        if(!this.checkSize()){
            alert("图片的大小不能超过"+this.props.size + "MB");
            this.reloadFileInput();
            return;
        };

        let formDate = new FormData();
        for(var i = 0 ; i < this.fileList.length ; i ++){
            formDate.append(this.props.name,this.fileList[i]);
        };

        Ajax.uploadFetch(this.props.url,formDate).then((data)=>{
            let res = '';
            if(this.props.analysis){
                res = this.props.analysis(data)
            }else{
                res = data.data;
            };
            // 如果上传成功的是图片的话就展示出来 ， 如果是文档的话就用a标签的形式展示
            if(res){
                this.setState({imgList:res.split(",")})
            }   
        }).catch(error=>{
            console.log(error)
        })
    }

    //检测当前文件的后缀名
    checkType(){
        if(!this.props.type){
            return true
        };
        let rightFile = 0;
        for(var i = 0 ; i < this.fileList.length ; i ++){
            let fileName = this.fileList[i].name;
            let suffix = fileName.substring(fileName.lastIndexOf('.')+1);
            if(this.props.type.indexOf(suffix) !== -1){
                rightFile ++;
            }
        };
        if(rightFile < this.fileList.length){
            return false;
        }else{
            return true
        }
    }

    //检查大小是否符合
    checkSize(){
        if(!this.props.size){
            return true
        };
        //记录如果上传了多个图片的话 每个图片的大小是否都符合条件
        let rightFile = 0;
        for(var i = 0 ; i < this.fileList.length ; i ++){
            let fileSize = this.fileList[i].size;
            if(fileSize < this.props.size * 1024 *1024){
                rightFile ++
            }
        }
        if(rightFile  !== this.fileList.length){
            return false
        }else{
            return true
        }
    }


    reloadFileInput(){
        this.refs[this.uploadkey].value = "";
    }
}

export default Le_react_upload

Le_react_upload.defaultProps = {   
    label:"",
    multiple:false,
    disabled:false,
    type:"",
    size:0,
    url:"",
    name:""
}

Le_react_upload.propTypes = {
    label:PropTypes.string,
    multiple:PropTypes.bool,
    disabled:PropTypes.bool,
    type:PropTypes.string,
    size:PropTypes.number,
    url:PropTypes.string,
    name:PropTypes.string,
}

