import React from 'react';

class CustomElement extends React.Component {
    state = {
        isOpened: false,
        field: '',
        value: '',
        children: [],
        parent: ''
    }

    onChangeHandle = (type) => {
        const children = this.state.children
        children.push({
            type
        })
        this.setState({children})
    }

  
    generateType = (type) => {
        switch (type) {
            case "String":
                return (
                    <React.Fragment>
                        <input onChange={this.props.onResetHandle} placeholder="...field"></input>
                        <input onChange={this.props.onResetHandle} placeholder="...value"></input>
                    </React.Fragment>
                )
            default :
                return
        }
    }
    render() {
        return (
            <div>
                <button onClick={() => this.setState({ isOpened: !this.state.isOpened })}>{
                    this.state.isOpened ? 'hide' : 'show'
                }</button>
                <select onChange={(e) => { this.props.onChangeHandle(e.target.value) }} defaultValue=''>

                    <option value="Array">Array</option>
                    <option value="String">String</option>
                    <option value="Object">Object</option>
                </select>
                <React.Fragment>
                    {this.generateType(this.props.type)}
                </React.Fragment>


                <div className="ml-2">
                    {
                        this.state.isOpened && (
                            this.state.children.map(e => (
                                <CustomElement 
                                type={e.type}></CustomElement>
                            ))
                        )
                    }
                </div>
            </div>
        )
    }
}

export default CustomElement