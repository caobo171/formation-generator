import {Container } from 'unstated-x'
import React from 'react'
class WorkSpaceContainer extends Container {

    state={
        selected:''
    }



}

const workSpaceContainer = new WorkSpaceContainer()

export let refSVG = React.createRef()

export default workSpaceContainer 