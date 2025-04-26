import FooComponent from './components/Foo.vue'
import BarComponent from './components/Bar.vue'
import BazComponent from './components/Baz.vue'
import NamedView from './components/NamedView.vue';


const multi_routes = [
    {
        path: '/namedview',
        name: 'namedview',
        component: NamedView,
        children: [
            {
                path: '',
                components: { // dynamic components
                    default: FooComponent,
                    bar: BarComponent,
                    baz: BazComponent,
                }
            }
        ]
    },
    {
        path: '/foo',
        name: 'foo',
        component: FooComponent,
        children: [
            {
                path: '',
                components: {
                    bar: BarComponent,
                    baz: BazComponent,
                }

            }
        ]
    },
]

export default multi_routes;