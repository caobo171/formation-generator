import {Container } from 'unstated-x'
import ElementContainer,{ PathContainer } from './ElementContainer'

class TemplateContainer extends Container {

    static template = {}


    constructor(){
        super()
        this.state = {
            resources: Array.from(ElementContainer.instances),
            paths:Array.from(PathContainer.instances)
        }
    }
   
    static exportTemplate = ()=> {

        const resources = Array.from(ElementContainer.instances).map(e=>e[1])

        let template = {
            "AWSTemplateFormatVersion" : "2010-09-09",
            "Description" : "AWS CloudFormation Sample Template",
            "Resources" : {
            }

        }

        resources.forEach(e=>{
            template.Resources[e.state.id] = e.state.data.state
        })

        console.log('check ',template)

    }
    
}

const templateContainer = new TemplateContainer()
export default templateContainer
