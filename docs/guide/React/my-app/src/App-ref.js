import React, { useImperativeHandle } from 'react';
import { useRef, useState, forwardRef } from 'react';


const Child = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        childFn() {
            console.log('childFn called')
        }
    }));

    return (
        <div ref={ref}>
            {props.children}
        </div>
    )
})

const AppRef = () => {
    const [count, setCount] = useState(0);

    const inputEl = useRef(null);
    const preCount = useRef(count);

    const onButtonClick = () => {
        preCount.current = count;
        inputEl.current.focus();
        setCount(count + 1);
    }

    const childRef = useRef();
    return (
        <>
            <Child ref={childRef} />
            <button onClick={() => childRef.current.childFn()}>Focus the input</button>
            <br />
            <h1></h1>
            <input type="text" ref={inputEl} />
            <br />
            <p>new count: {count}</p>
            <p>Pre Count: {preCount.current}</p>
            <button onClick={onButtonClick}>Focus the input and increment 1</button>
        </>
    )
};
export default AppRef;