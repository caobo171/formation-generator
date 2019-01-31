import {Container } from 'unstated-x'
import React from 'react'

class WorkSpaceContainer extends Container {

    
    state={
        selected:'',
        region:REGIONS[0],
        stage:'' ,
    }



}


export const REGIONS = [ 'us-west-2', 'ap-northeast-1']

const workSpaceContainer = new WorkSpaceContainer()
export let refSVG = React.createRef()
export default workSpaceContainer 