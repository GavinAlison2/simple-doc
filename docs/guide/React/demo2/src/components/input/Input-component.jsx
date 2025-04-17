class Input extends React.Component {
    render() {
        return (
            <input type="search" name="search" id="search" onChange={this.props.onChangeHandler} />
        )
    }
}