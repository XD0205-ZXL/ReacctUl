import React from 'react';
import "./index.scss";


class Le_react_Button extends React.Component{
    constructor(props){
        super(props)
        this.value = this.props.value
    }
    componentDidMount(){
        this.refs.button.addEventListener('click',function(e){
            let x = e.offsetX;
            let y = e.offsetY;
            let ripples = document.createElement("span");
            ripples.classList.add("_ripples")
            ripples.style.left = x + "px";
            ripples.style.top = y + "px";
            e.target.appendChild(ripples);
            setTimeout(() => {
                ripples.remove();
            }, 1000);
        })
    }
    render(){
        return (<button ref="button" className="btn">{this.state.value}</button>)
    }
}

export default Le_react_Button

