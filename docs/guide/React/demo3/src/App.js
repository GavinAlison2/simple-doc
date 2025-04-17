const App = () => {
    console.log("App 渲染")
    const [items, setItems] = React.useState([]);
    console.log('items');
    console.log(items);
    const [filteredItems, setFilteredItems] = React.useState([]);
    React.useEffect(() => {
        console.log('App 组件已挂载')
        // fetch('https://jsonplaceholder.typicode.com/users')
        fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
            .then(response => response.json())
            .then(data => {
                data.results.map((item, index) => {
                    item.id = index + 1;
                })
                setItems(data.results);// 改写items 的值
                setFilteredItems(data.results);
            })
    }, []);// 什么时候执行一次，空数组表示只在组件挂载的时候执行一次

    const onChangeHandler = (event) => {
        const _filteredItems = this.state.items.filter(item => item.name.includes(event.target.value))
        this.setState(
            () => {
                return { filteredItems: _filteredItems }
            },
            () => {
                console.log(this.state.filteredItems);
            }
        );
    }
    return (
        <div>
            <h1>react demo</h1>
            <Input onChangeHandler={onChangeHandler} />
            <Lists itemList={filteredItems} />
        </div>
    );
}

// class App extends React.Component {
//     constructor(props) {
//         console.log("App 构造函数")
//         super(props);
//         this.state = {
//             // items: ['Alice', 'Bob', 'Charlie', 'David'],
//             items: [],
//             egg: 'tee',
//             searchText: '',
//             filteredItems: [],// 过滤之后的数组
//         };
//     }
//     componentDidMount() {
//         console.log('App 组件已挂载')
//         // fetch('https://jsonplaceholder.typicode.com/users')
//         fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
//             .then(response => response.json())
//             .then(data => {
//                 data.results.map((item, index) => {
//                     item.id = index + 1;
//                 })

//                 console.log('App data.results: ' + JSON.stringify(data.results));//[{},{}]
//                 this.setState({
//                     items: data.results,
//                     filteredItems: data.results,
//                     searchText: '',
//                 });
//                 console.log('App this.state.items: ' + JSON.stringify(this.state.items));//[] 延迟 无法获取到对应的值，此时不更新
//             });
//     }
//     onChangeHandler = (event) => {
//         // console.log(e.target.value);
//         this.setState(
//             () => {
//                 return { filteredItems: this.state.items.filter(item => item.name.includes(event.target.value)) }
//             },
//             () => {
//                 console.log(this.state.filteredItems);
//             }
//         );
//     }
//     render() {
//         console.log("App 渲染")
//         return (
//             <div>
//                 <h1>react demo</h1>
//                 <Input onChangeHandler={this.onChangeHandler} />
//                 <Lists itemList={this.state.filteredItems} />
//             </div>
//         )
//     }
// }