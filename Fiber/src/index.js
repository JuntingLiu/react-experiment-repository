import React, { render, Component } from './react'

const root = document.getElementById('root');

const jsx = (
  <div>
    <p>Hello React Fiber</p>
    <p>Hello React Fiber2</p>
  </div>
)

// render(jsx, root)

// setTimeout(() => {
//   render((
//     <div>
//       {/* <div>React Fiber</div> */}
//       <p>React Fiber !</p>
//     </div>
//   ), root)
// }, 2000);

class Greating extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '张三'
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({
      name: '李四'
    })
  }

  render () {
    return (
      <div>
        React Class Component - {this.props.title}
        <p>Name: {this.state.name}</p>
        <button onClick={this.handleClick}>Change</button>
      </div>
    )
  }
}

function FnComponent (props) {
  return <div>FnComponent - {this.props.title}</div>
}

render(<Greating title="Fiber! " />, root)