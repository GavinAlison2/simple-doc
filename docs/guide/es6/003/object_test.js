// type objType = {
//     // HelloWorld: {
//     //     name: string;
//     //     props: {};
//     //     staticRenderFns: null[];
//     //     _compiled: boolean;
//     //     _scopeId: string;
//     //     beforeCreate: null[];
//     //     beforeDestroy: null[];
//     //     __file: string;
//     // };
//     "elementui-basic/Layout2View": {
//         name: string;
//         staticRenderFns: never[];
//         _compiled: boolean;
//         beforeCreate: null[];
//         beforeDestroy: null[];
//         __file: string;
//     };
//     "elementui-basic/LayoutView": {
//         name: string;
//         staticRenderFns: never[];
//         _compiled: boolean;
//         beforeCreate: null[];
//         beforeDestroy: null[];
//         __file: string;
//     };
// }
const obj = {
    // HelloWorld: {
    //     name: "HelloWorld",
    //     props: {},
    //     staticRenderFns: [null, null, null, null],
    //     _compiled: true,
    //     _scopeId: "data-v-469af010",
    //     beforeCreate: [null],
    //     beforeDestroy: [null],
    //     __file: "src/components/HelloWorld.vue",
    // },
    "elementui-basic/Layout2View": {
        name: "Layout2View",
        staticRenderFns: [],
        _compiled: true,
        beforeCreate: [null],
        beforeDestroy: [null],
        __file: "src/components/elementui-basic/Layout2View.vue",
    },
    "elementui-basic/LayoutView": {
        name: "LayoutView",
        staticRenderFns: [],
        _compiled: true,
        beforeCreate: [null],
        beforeDestroy: [null],
        __file: "src/components/elementui-basic/LayoutView.vue",
    },
};


// console.log(obj)
console.log(typeof obj)
console.log(Object.keys(obj))
console.log(Object.values(obj))
// console.log(obj.keys())