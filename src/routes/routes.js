import VueRouter from 'vue-router'
import Home from '../pages/Home'

const routes = [
    { path: '/', component: Home, meta: {
        title: "Home"
    } }
]
export default new VueRouter({
    routes // short for `routes: routes`
})