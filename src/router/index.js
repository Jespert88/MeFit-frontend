import Vue from 'vue'
import Router from "vue-router"
import BootstrapVue from 'bootstrap-vue'
import LandingPage from '../views/LandingPage'
import About from '../views/About'
import Contact from '../views/Contact'

import Calender from '../components/Calender'
import NotFound from '../views/NotFound'
import Unauthorized from '../views/Unauthorized'
import SideNavbar from '../components/SideNavbar'

import WorkoutList from '../containers/WorkoutList'
import ProgramList from '../containers/ProgramList'
import ExerciseList from '../containers/ExerciseList'
import Profile from '../containers/Profile'
import Dashboard from '../containers/Dashboard'
import UserOverview from '../containers/UserOverview'
import CreateWorkout from '../containers/CreateWorkout'
import CreateExercise from '../containers/CreateExercise'
// import UpdateExercise from '../containers/UpdateExercise'
import UpdateWorkout from '../containers/UpdateWorkout'
import UpdateProgram from '../containers/UpdateProgram'

import CreateProgram from '../containers/CreateProgram'
import ShowOneExercise from '../containers/ShowOneExercise'
import SetGoal from '../containers/SetGoal'
import GoalHistory from '../containers/GoalHistory'

import { authGuard } from "../auth";

Vue.use(Router)
Vue.use(BootstrapVue)

export default new Router({
	mode:'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/about",
			name: "About",
			component: About
		},
		{
			path: "/contactus",
			name: "Contact",
			component: Contact
		},
		{
			path: "/",
			name: "LandingPage",
			component: LandingPage
		},
		{
			path: "/calender",
			name: "Calender",
			component: Calender,
			beforeEnter: authGuard
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
			beforeEnter : authGuard,
			children: [
				{ path: '/dashboard', component: UserOverview, props: true },
				{ path: '/createprogram', component: CreateProgram, props: true },
				{ path: '/createexercise', component: CreateExercise, props: true },
				{ path: '/createworkout', component: CreateWorkout, props: true },
				{ path: '/profile', component: Profile, props: true, beforeEnter:authGuard },
				{ path: '/showoneexercise', component: ShowOneExercise, props: true },
				{ path: '/useroverview', component: UserOverview, props: true },
				{ path: '/viewexercises', component: ExerciseList, props: true },
				{ path: '/viewworkouts', component: WorkoutList, props: true },
				{ path: '/viewprograms', component: ProgramList, props: true },
				{ path: '/setgoal', component: SetGoal, name :'SetGoal', props: true },
				{ path: '/goalHistory', component: GoalHistory, props: true },
				{ path: '/updateworkout', component: UpdateWorkout,name: "UpdateWorkout", props: true },
				{ path: '/updateprogram', component: UpdateProgram,name: "UpdateProgram", props: true },

			]
		},
		{
			path: "/unauthorized",
			name: "Unauthorized",
			component: Unauthorized
		},
		{
			path: "/*",
			name: "Notfound",
			component: NotFound
		}
	]
})