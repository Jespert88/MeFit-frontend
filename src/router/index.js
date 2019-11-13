
import Vue from 'vue'
import Router from "vue-router"
import BootstrapVue from 'bootstrap-vue'

import Login from '../components/Login'
import Register from '../components/Register'
import Progress from '../components/Progress'
import Calender from '../components/Calender'
import ExerciseCard from '../components/ExerciseCard'
import SideNavbar from '../components/SideNavbar'

import Profile from '../containers/Profile'
import EditProfile from '../containers/EditProfile'
import Dashboard from '../containers/Dashboard'
import CreateExercise from '../containers/CreateExercise'
import ShowOneExercise from '../containers/ShowOneExercise'

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
			path: "/sidenavbar",
			name: "SideNavbar",
			component: SideNavbar
		},
		{
			path: "/editprofile",
			name: "EditProfile",
			component: EditProfile,
		},
		{
			path: "/dashboard",
			name: "Dashboard",
			component: Dashboard,
			children: [
				/* https://router.vuejs.org/guide/essentials/nested-routes.html */
				{ path: '/createexercise', component: CreateExercise, props: true },
				{ path: '/profile', component: Profile, props: true},
				{ path:'/showoneexercise', component: ShowOneExercise, props: true}
			]
		}
	]
})