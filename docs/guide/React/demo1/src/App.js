class App extends React.Component {
    constructor(props) {
        console.log("构造函数")
        super(props);
        this.state = {
            // items: ['Alice', 'Bob', 'Charlie', 'David'],
            items: [],
            egg: 'tee',
            searchText: '',
            // filteredItems: [],// 过滤之后的数组
        };
    }
    componentDidMount() {
        console.log('组件已挂载')
        // fetch('https://jsonplaceholder.typicode.com/users')
        fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
            .then(response => response.json())
            .then(data => {
                // this.setState({
                //     names: data.map(item => item.name),
                // });
                // this.setState(
                //     () => {
                //         return { names: data.map(item => item.name) }
                //     },
                //     () => {
                //         console.log(this.state.names);
                //     }
                // )
                // this.state.names = data.map(item => item.name);// 无效, 无法触发更新
                // this.forceUpdate();// 强制更新

                console.log(data.results);//[{},{}]
                this.setState({
                    items: data.results,
                    searchText: '',
                });
                console.log(this.state.items);//[]
            });
    }
    onChangeHandler = (event) => {
        const filteredItems = this.state.items.filter(item => item.name.includes(event.target.value));
        // console.log(e.target.value);
        this.setState(
            () => {
                return { items: filteredItems }
            },
            () => {
                console.log(this.state.items);
            }
        );
    }
    render() {
        console.log("渲染")
        return (
            <div>
                <h1>react demo</h1>
                <input type="search" name="search" id="search" onChange={this.onChangeHandler}
                />
                <ul>
                    {
                        this.state.items.map((item, index) => (
                            <li key={item.url} >{item.name}</li>
                        ))
                    }
                </ul>
            </div >
        )
    }
}