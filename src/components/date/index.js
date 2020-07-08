import React, {Component} from 'react'
import CommonUtil from "@core/tool";
import PropTypes from 'prop-types';
import './index.scss'
import {Le_react_Button} from "../../out"

class Le_react_Date extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            Days : 0,      //当前月份多少 天
            Weeks : 0,      //当前月份有几周
            Mouths : 12 ,   //当前年份有几个月
            Year : 0 ,       //当前是几几年

            curDays : 0,      // 今天几号
            curWeeks : 0,     // 今天是星期几
            Mouths : 12 ,     // 当前是有几月份
            curYear : 0       //当前是几几年
        }
    }

    render(){
        return (
            <div className="Le_react_Date">
                <div className="picker__title">
                    <div className="title__year">2020</div>
                    <div className="title__date active">Wed, Jul 8</div>
                </div>
                <div className="picker__body">
                    <div className="date-picker-header">
                        <Le_react_Button value="<"></Le_react_Button>
                        <div className="header_value">July 2020</div>
                        <Le_react_Button value=">"></Le_react_Button>
                    </div>
                    <div className="picker-table">
                        <table>
                            <thead>
                                <tr>
                                    {this.getWeekHead()}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><span className="accent">1</span></td>
                                    <td><span>2</span></td>
                                    <td><span>3</span></td>
                                    <td><span>4</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        )
    }

    //星期1-7
    getWeekHead(){
        let weekDomArr = [];
        let weekHead = [ "日" , "一" , "二" , "三" , "四" , "五" , "六" ];
        weekHead.forEach((item,idx) => {
            weekDomArr.push(
                <th key={idx}>{item}</th>
            )
        });
        return weekDomArr;
    }

    //获取当前日期
    getCurdate(){
        // Days : 0,      //当前月份多少 天    
        // Weeks : 0,      //当前月份有几周
        // Mouths : 12 ,   //当前年份有几个月
        // Year : 0 ,       //当前是几几年

        // curDays : 0,      // 今天几号
        // curWeeks : 0,     // 今天是星期几
        // Mouths : 12 ,     // 当前是有几月份
        // curYear : 0 
        

        let myDate = new Date;
        let year = myDate.getFullYear(); //获取当前年   2020年
        let mon = myDate.getMonth() + 1; //获取当前月   7月
        let date = myDate.getDate();     //当前几号     8号
        let curWeeks = myDate.getDay();  //当前星期几   星期三
        let Days = new Date(year , mon , 0).getDate()  //31天
        debugger

        let Weeks = Days % 7 == 0 ? Days / 7 : Math.ceil( Days / 7 );//当前月份有几周
        let specialDate = year+'-'+mon+'-1';
        let specialWeek = new Date(specialDate).getDay(); //求指定的几号是星期几

        console.log(year,mon,date,Days,curWeeks,specialWeek,Weeks);        
    }

    componentWillMount(){
        this.getCurdate();
    }

    


}

export default Le_react_Date;

Le_react_Date.defaultProps = {

};

Le_react_Date.propTypes = {

}