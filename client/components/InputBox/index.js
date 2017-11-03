import React, {Component} from 'react'


export default class InputBox extends Component {
  render() {
    return (
      <form
        onSubmit={e => {
          this.props.handleSubmit({title: this.state.title})
          e.preventDefault()
        }}
      >
        <input
          onChange={e => {
            this.setState({title: e.target.value})
          }}
          required
          maxLength={255}
        />
        <input type="submit"/>
      </form>
    )
  }
}
