
const Lists = (props) => {
    console.log("Lists 组件渲染")
    const { itemList } = props
    console.log('Lists this.props: ' + JSON.stringify(props))
    const imgCSS = {
        border: '4px solid #ddd',
        borderRadius: '10px',
    }
    return (
        <ul className="ul-container">
            {
                itemList.map(item => {
                    return (
                        <div key={item.url}>
                            <li key={item.id}>{item.name}</li>
                            <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`} alt=""
                                style={imgCSS}
                            />
                        </div>
                    )
                })
            }
        </ul>
    )
}
// class Lists extends React.Component {
//     render() {
//         console.log("Lists 组件渲染")
//         const { itemList } = this.props
//         console.log('Lists this.props: ' + JSON.stringify(this.props))
//         const imgCSS = {
//             border: '4px solid #ddd',
//             borderRadius: '10px',
//         }
//         return (
//             <ul className="ul-container">
//                 {
//                     itemList.map(item => {
//                         return (
//                             <div key={item.url}>
//                                 <li key={item.id}>{item.name}</li>
//                                 <img
//                                     src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`} alt=""
//                                     style={imgCSS}
//                                 />
//                             </div>
//                         )
//                     })
//                 }
//             </ul>
//         )
//     }
// }
