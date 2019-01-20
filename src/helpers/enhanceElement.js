import React from 'react'
export default function enhanceElement(Component) {
    
    return class BoostingElement extends Component{
        
        render(){
            return <Component {...this.props}></Component>
        }
    }
}