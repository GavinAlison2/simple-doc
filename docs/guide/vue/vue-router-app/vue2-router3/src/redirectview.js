import FooComponent from './components/Foo.vue';
import BarComponent from './components/Bar.vue';
import BazComponent from './components/Baz.vue';
// redirect routes

const redirectRoutes = [
    { path: 'foo', component: FooComponent },
    { path: 'bar', component: BarComponent },
    { path: 'baz', name: 'baz', component: BazComponent },
    { path: '/about-redirect', redirect: '/about' },
    { path: '/about-redirect2', redirect: 'about' },
    { path: '/about-redirect3', redirect: { name: 'about' } },
    // dynamic redirect, note that the target route `to` is available for the redirect function
    {
        path: '/dynamic-redirect/:id?',
        redirect: to => {
            const { hash, params, query } = to
            if (query.to === 'about') {
                return { path: '/about', query: null }
            }
            if (hash === '#hello') {
                return { name: 'hello', hash: '' }
            }
            if (params.id) {
                return '/with-params/:id'
            } else {
                return '/'
            }
        }
    },
    // named redirect
    { path: '/named-redirect', redirect: { name: 'baz' } },

    // redirect with params
    { path: '/redirect-with-params/:id', redirect: '/with-params/:id' },

    // redirect with caseSensitive
    { path: '/foobar', component: FooComponent, caseSensitive: true },

    // redirect with pathToRegexpOptions
    { path: '/FooBar', component: FooComponent, pathToRegexpOptions: { sensitive: true } },
];

export { redirectRoutes };