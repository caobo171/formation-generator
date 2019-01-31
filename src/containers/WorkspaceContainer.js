import {Container } from 'unstated-x'
import React from 'react'
<<<<<<< HEAD
=======

>>>>>>> de99e599ccf629fc0f24aac17d2b2f1785fcfaee
class WorkSpaceContainer extends Container {

    
    state={
        selected:'',
        region:REGIONS[0],
        stage:'' ,
        mode : 'design'
    }



}


<<<<<<< HEAD
export let refSVG = React.createRef()

export default workSpaceContainer 
=======
export const REGIONS = [ 'us-west-2', 'ap-northeast-1']

const workSpaceContainer = new WorkSpaceContainer()
export let refSVG = React.createRef()
export default workSpaceContainer 
window.ws = workSpaceContainer
>>>>>>> de99e599ccf629fc0f24aac17d2b2f1785fcfaee
