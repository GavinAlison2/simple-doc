import React, { useCallback } from 'react';
import { useState, useMemo, memo } from 'react';


const Button = memo(({ onClick }) => {
    console.log('Button组件渲染了...')
    return <button onClick={onClick}>点击更新</button>;
});
const Info = memo(({ value }) => {
    // console.log('Info组件渲染了...')
    // let result = value * 2;
    //useMemo缓存结果，只有依赖项变化时才重新计算结果。

    console.log('Info组件渲染了...')
    const memoizedValue = useMemo(() => {
        return value * 2;
    }, [value]); // 依赖项数组，当 a 或 b 变化时，才会重新计算 memoizedValue

    return (
        <div>
            <p>input value: {value}</p>
            <p>result: {memoizedValue}</p>
        </div>
    );
});


const AppMemo = () => {
    const [count, setCount] = useState(0);
    const [inputValue, setInputValue] = useState(5);

    // 使用 useCallback 优化事件处理函数
    const handleUpdate = useCallback(() => {
        setCount(count + 1);
    }, [count]);

    const handleButtonClick = useCallback(() => {
        console.log('Button被点击了...')
    }, [])

    return (
        <div>
            <p>count的值: {count}</p>
            <button onClick={handleUpdate}>点击更新</button>
            <br />
            <input type="number" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <br />
            <Info value={inputValue} />
            <Button onClick={handleButtonClick} />
        </div>
    )
};
export default AppMemo;