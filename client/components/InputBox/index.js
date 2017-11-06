import React, {Component} from 'react'


export default class InputBox extends Component {
  render() {
    return (
      <form
        onSubmit={e => {
          this.props.handleSubmit({title: this.state.title})
          this.setState({title: ''})
          e.preventDefault()
        }}
      >
        <input
          type="text"
          required
          maxLength={255}
          value={this.state ? this.state.title : ''}
          onChange={e => {
            this.setState({title: e.target.value})
          }}
        />
        <input type="submit"/>
      </form>
    )
  }
}
