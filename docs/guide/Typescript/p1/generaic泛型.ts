interface ISwap {
    <T, K>(tuple: [T, K]): [K, T];
}
let swap: ISwap = (tuple) => {
    // 交换元组的两个元素
    return [tuple[1], tuple[0]];
}
let r2 = swap(["abc", 123]);
console.log(r2)

type ICallBack = <T>(value: T, index: number, array: T[]) => void;
type IForEach = <T>(arr: T[], callback: ICallBack) => void;
const forEach: IForEach = (arr, callback) => {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i], i, arr);
    }
}

forEach([1, 2, 3], (value, index, array) => {
    console.log(value, index, array);
})



export { };