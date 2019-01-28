import React from 'react';

class CustomElement extends React.Component {
    state = {
        isOpened :false
    }
    render() {
        return (
            <div>
                <button onClick={()=> this.setState({isOpened:!this.state.isOpened})}>{
                    this.state.isOpened? 'hide':'show'
                }</button>

                <div className="ml-2">
                  {
                      this.state.isOpened && (
                          <CustomElement></CustomElement>
                      )
                  }
                </div>
            </div>
        )
    }
}

export default CustomElement