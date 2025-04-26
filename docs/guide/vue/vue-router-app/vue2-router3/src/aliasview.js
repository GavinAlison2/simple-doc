import { HomeView as Home } from './components/HomeView.vue'
import { AboutView as About } from './components/AboutView.vue'
import { FooComponent as Foo } from './components/Foo.vue'
import { BarComponent as Bar } from './components/Bar.vue'
import { BazComponent as Baz } from './components/Baz.vue'

const aliasRouters = [
    { path: '/root', component: About, alias: '/root-alias' },// 访问 /root-alias 也会渲染 About 组件
    {
        path: '/home', component: Home,
        children: [
            // absolute alias
            { path: 'foo', component: Foo, alias: '/foo' },
            // relative alias (alias to /home/bar-alias)
            { path: 'bar', component: Bar, alias: 'bar-alias' },
            // multiple aliases
            { path: 'baz', component: Baz, alias: ['/baz', 'baz-alias'] },
            // default child route with empty string as alias.
            { path: 'default', component: Default, alias: '' },
            // nested alias
            {
                path: 'nested', component: Nested, alias: 'nested-alias',
                children: [
                    { path: 'foo', component: NestedFoo }
                ]
            }
        ]
    }
]

export default aliasRouters;