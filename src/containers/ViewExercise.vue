<template>
	<div class="content">

		<h1>View all exercises here in a nice way</h1>

		<b-container>
			<b-row>
				<b-col v-for="programGoal in goal.programGoalFk" :key="programGoal.programGoalId" class="col-lg-3" >
					<ProgramCard :programGoal="programGoal" :toSelect="false" :reloadKey="retrieveGoal"/>
				</b-col>
			</b-row>
		</b-container>
	</div>
</template>

<script>
	import ProgramCard from '../components/ProgramCard.vue'
	import axios from 'axios'

	export default {
		components: {
			ProgramCard
		},
		data() {
			return {
				goal: []
			}
		},
		mounted() {
			this.retrieveGoal()
		},
		methods: {
			retrieveGoal: function() {
				axios
					.get('http://localhost:8080/goal/status/user/1')
					.then((response) => {
						if (response.status == 202) {
							this.goal = response.data
						} else if (response.status == 404) {
							// not found
							console.log("status: " + 404)
						} else if (response.status == 400) {
							// bad request
							console.log("status: " + 400)
						} else {
							// something went wrong
						}
					})
					.catch(() => {
					})
			}
		}
	}
</script>

<style>

</style>