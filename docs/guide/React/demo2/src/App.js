class App extends React.Component {
    constructor(props) {
        console.log("App 构造函数")
        super(props);
        this.state = {
            // items: ['Alice', 'Bob', 'Charlie', 'David'],
            items: [],
            egg: 'tee',
            searchText: '',
            filteredItems: [],// 过滤之后的数组
        };
    }
    componentDidMount() {
        console.log('App 组件已挂载')
        // fetch('https://jsonplaceholder.typicode.com/users')
        fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
            .then(response => response.json())
            .then(data => {
                data.results.map((item, index) => {
                    item.id = index + 1;
                })

                console.log('App data.results: ' + JSON.stringify(data.results));//[{},{}]
                this.setState({
                    items: data.results,
                    filteredItems: data.results,
                    searchText: '',
                });
                console.log('App this.state.items: ' + JSON.stringify(this.state.items));//[] 延迟 无法获取到对应的值，此时不更新
            });
    }
    onChangeHandler = (event) => {
        // console.log(e.target.value);
        this.setState(
            () => {
                return { filteredItems: this.state.items.filter(item => item.name.includes(event.target.value)) }
            },
            () => {
                console.log(this.state.filteredItems);
            }
        );
    }
    render() {
        console.log("App 渲染")
        return (
            <div>
                <h1>react demo</h1>
                <Input onChangeHandler={this.onChangeHandler} />
                <Lists itemList={this.state.filteredItems} />
            </div>
        )
    }
}