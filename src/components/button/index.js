import React from 'react';
import "./index.scss";
import PropTypes from 'prop-types';



class Le_react_Button extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            value : this.props.value,
            disabled:false,
        }
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
        return (
            <div className="Le_react_Button">
                <i className={`icon ${this.props.iconName}`}></i>
                <button ref="button" className="btn">{this.state.value}</button>
            </div>
        )
    }
}

export default Le_react_Button


Le_react_Button.defaultProps = {
    type:"",
    disabled:false,
    iconName:""
}

Le_react_Button.propTypes = {
    type:PropTypes.string,
    iconName:PropTypes.string,
    disabled: PropTypes.bool,
}

