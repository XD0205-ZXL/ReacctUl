import CommonUtil from "@core/tool";
import './index.scss'
import '../../assets/base.scss'
import {Le_react_Button} from "../../out"
import $ from "jquery"
let  Le_react_Alert = {
    showAlert(type,msg,iconName){
        let classArr = {
            "success":{cls:"success",iCls:"fa fa-check-circle"},
            "warning":{cls:"warning",iCls:"fa fa-exclamation-circle"},
            "info":{cls:"info",iCls:"fa fa-info-circle"},
            "error":{cls:"error",iCls:"fa fa-times-circle"},
            "default":{cls:"default",iCls:"fa fa-check-circle"}
        };
        let zIndex = CommonUtil._idSeed.newId();
        let styleObj = {};
        type ? styleObj = classArr[type] : styleObj = classArr["default"];
        msg ? msg = msg : msg ="默认显示文字";
        iconName ? iconName = iconName : iconName = styleObj.iCls;
        let dom = `<div id="Le_react_alert`+zIndex+`" class="Le_react_alert clearfix `+ styleObj.cls +`" style="z-index:`+ zIndex +`">
                        <i class="fl alertIcon fa ` + iconName + `"></i>
                        <p class="fl msg">`+ msg + `</p>
                   </div>`

        $("body").append(dom);

        let domId = "#Le_react_alert"+zIndex; 
        $(domId).animate({top:'40px'},500,()=>{
            setTimeout(() => {
                debugger
                $(domId).animate({top:'0'},500,()=>{
                    $(domId).remove(); 
                });
            }, 1000);
        })   
    },
    showConfirm(title,msg,cb){
        title?title = title : title = "提示";
        msg ? msg = msg : msg = "";
        let z_index = CommonUtil._idSeed.newId();
        let dom = `
                <div class="Le_react_Confirm" style="z-index:`+ z_index +`">
                    <div class="Le_react_Confirm_content">
                        <p class="title">`+ title +`</p>
                        <div class="msg">`+ msg +`</div>
                        <div class="btnGroup">
                            <Le_react_Button class="asbtn sure">确定</Le_react_Button>
                            <Le_react_Button class="asbtn cancle">取消</Le_react_Button>
                        </div>
                    </div>
                </div>
            `;

        $("body").append($(dom));
        
    }
}

export default Le_react_Alert