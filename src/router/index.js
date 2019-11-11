
import Vue from 'vue'
import Router from "vue-router"
import BootstrapVue from 'bootstrap-vue'
import Login from '../components/Login'
import Register from '../components/Register'
import Progress from '../components/Progress'
import Calender from '../components/Calender'
import ExerciseCard from '../components/ExerciseCard'
import Profile from '../components/Profile'
import SideNavbar from '../components/SideNavbar'

Vue.use(Router)
Vue.use(BootstrapVue)

export default new Router({
	routes: [
		{
			path: "/",
			name: "Login",
			component: Login
		},
		{
			path: "/register",
			name: "Register",
			component: Register
		},
		{
			path: "/progress",
			name: "Progress",
			component: Progress
		},
		{
			path: "/calender",
			name: "Calender",
			component: Calender
		},
		{
			path: "/exercisecard",
			name: "ExerciseCard",
			component: ExerciseCard
		},
		{
			path: "/profile",
			name: "Profile",
			component: Profile
		},
		{
			path: "/sidenavbar",
			name: "SideNavbar",
			component: SideNavbar
		}
	]
})