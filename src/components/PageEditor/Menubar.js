import React from 'react'
import templateContainer, { TemplateContainer } from '../../containers/TemplateContainer'
import workspaceContainer, { REGIONS } from '../../containers/WorkspaceContainer'
import { readJsonFileAsText } from '../../helpers/utils'
import { SubscribeOne } from 'unstated-x'


class Menubar extends React.Component {

    state = {
        isToggled: false
    }

    handleImportUpload = (e) => {
        const file = e.target.files[0]
        readJsonFileAsText(file).then(result => {
            console.log('check ', result)
            window.template = result
            //console.log(JSON.parse(result))
            if (result) {
                TemplateContainer.importTemplate(result)
            }
        })
    }




    render() {
        return (
            <SubscribeOne to={workspaceContainer} bind={['stack', 'mode']}>
                {
                    ws => {
                        console.log('check ws', ws.state)
                        return (
                            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                <div className="btn-toolbar mb-2 mb-md-0">

                                    <div className="btn-group mr-2">
                                        <select onChange={(e) => workspaceContainer.setState({ region: e.target.value })}
                                            value={workspaceContainer.state.region}>
                                            {
                                                REGIONS.map(e => (
                                                    <option key={e} value={e}>{e}</option>

                                                ))
                                            }
                                        </select>
                                        {
                                            ws.state.mode === 'manage' ? '' : (
                                                <SubscribeOne to={templateContainer} bind={['stackName']}>
                                                    {
                                                        tplContainer => (
                                                            <React.Fragment>
                                                                <input type="text" className="mr-4" placeholder=". . . Stack Name"
                                                                    value={tplContainer.state.stackName}
                                                                    onChange={(e) => {
                                                                        tplContainer.setState({ stackName: e.target.value })
                                                                    }}></input>

                                                                <input
                                                                    type={'file'}
                                                                    accept=".json"
                                                                    onChange={this.handleImportUpload} />
                                                            </React.Fragment>
                                                        )
                                                    }
                                                </SubscribeOne>

                                            )
                                        }
                                        <button type="button" className="btn btn-sm btn-outline-secondary"
                                            onClick={() => { TemplateContainer.exportAndRun() }}
                                        >Export && Run</button>
                                        <button type="button" className="btn btn-sm btn-outline-secondary"
                                            onClick={() => { TemplateContainer.exportTemplate() }}
                                        >Export</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                }
            </SubscribeOne>

        )
    }
}

export default Menubar;