import React from 'react'
import PageEditor from './PageEditor/PageEditor'
import Sidebar from './Sidebar/Sidebar'
import Menubar from './PageEditor/Menubar'
import templateContainer, { TemplateContainer } from '../containers/TemplateContainer'
import Inspector from './Inspector'
import workspaceContainer from '../containers/WorkspaceContainer'
import { readJsonFileAsText } from '../helpers/utils'
import axios from 'axios'
import { Env } from '../env'


class Main extends React.Component {

    state = {
        isToggled: false
    }

    componentDidMount(){
        const {stackname} = this.props.match.params
        //const stackName = urlParams.get('stackname')
        console.log('check stack name',stackname)
        if(stackname){
            workspaceContainer.setState({
                stack: stackname,
                mode: 'manage'
            },async ()=> {
                console.log('check after',workspaceContainer.state)
                templateContainer.setState({stackName:stackname})
                const res = await axios.get(`${Env.URL}/gettemplate?stackName=${workspaceContainer.state.stack}`)
                const template = JSON.parse(`${res.data.TemplateBody}`)
                window.template1 = template
                TemplateContainer.importTemplate(template)
            })
    
        }else {
            console.log('check delete ')
            TemplateContainer.clear()
            TemplateContainer.reset()
        }
       
    }
    
    handleImportUpload = (e) => {
		const file = e.target.files[0]
		readJsonFileAsText(file).then(result => {
            console.log('check ',result)
            window.template = result
            //console.log(JSON.parse(result))
            if(result){
                TemplateContainer.importTemplate(result)
            }
		})
	}




    render() {
        return (
            <div className="container-fluid" onMouseDown={(e) => {
                window.e = e
                if (e.target.tagName === 'svg' || e.target.parentElement.parentElement.tagName === 'svg') {

                    this.setState({ isToggled: false })
                }
            }}>
                <div className="row">

                    <Sidebar></Sidebar>
                    <main role="main" className="col-md-8">
                        <Menubar></Menubar>

                        <PageEditor className="my-4 w-100" id="myChart" width="100%" height="500"></PageEditor>


                    </main>
                    <Inspector />
                </div>
            </div>

        )
    }
}

export default Main;