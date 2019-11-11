
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
import Dashboard from '../containers/Dashboard'
import CreateExercise from '../containers/CreateExercise'

Vue.use(Router)
Vue.use(BootstrapVue)

export default new Router({
	mode:'history',
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
		},
		{
			path: "/dashboard",
			name: "Dashboard",
			component: Dashboard,
			children: [
				/* https://router.vuejs.org/guide/essentials/nested-routes.html */
				{ path: '/createexercise', component: CreateExercise, props: true },
				{ path: '/profile', component: Profile, props: true}
			]
		}
	]
})