import React from 'react';
import { useEffect } from 'react';



const AppEffect = () => {
    const [count, setCount] = React.useState(0);
    const [text, setText] = React.useState('');
    let immutableText = text;

    useEffect(() => {
        console.log('useEffect');
    }, [count]);

    // useEffect(() => {
    //     // 执行一些副作用操作
    //     return () => {
    //       // 清理操作
    //     };
    //   }, [依赖项]);
    // 默认执行一次，之后再依赖项变化时再次执行

    // 默认执行一次，之后再依赖项变化时再次执行
    // useEffect(() => {
    //     console.log('useEffect default trigger');
    // }, []);

    //  默认两次执行
    useEffect(() => {
        // 避免直接变更依赖项
        console.log('useEffect default trigger');
        setText("hello world");//会触发变更, 导致无限循环

    }, [immutableText]);

    return (
        <div>
            <div>
                <button onClick={() => setCount(count + 1)}>count:{count}</button>
            </div>
        </div>
    )
}

export default AppEffect;