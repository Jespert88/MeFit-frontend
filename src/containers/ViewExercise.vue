<template>
	<div class="content">

		<h1>View all exercises here in a nice way</h1>

		<b-container>
			<b-row>
				<b-col v-for="program in programList" :key="program.id" class="col-lg-3" >
					<ProgramCard :program="program" :toSelect="false"/>
				</b-col>
			</b-row>
		</b-container>
	</div>
</template>

<script>
	import ProgramCard from '../components/ProgramCard.vue'
	// import axios from 'axios'

	export default {
		components: {
			ProgramCard
		},
		data() {
			return {
				programList: {}
			}
		},
		created() {
			// axios
			// .get('http://localhost:8080/program')
			// .then(response => {
			// 	if(response.status == 202) {
   //                      // success
   //                      this.programList = response.data
   //                  } else if (response.status == 404) {
   //                      // not found
   //                  } else if (response.status == 400) {
   //                      // bad request
   //                  } else {
   //                      // something went wrong
   //                  }
   //              })
			// .catch(() => {
			// })

			this.programList = [
			{
				programId: 1,
				name: "name1",
				category: "category1",
				programGoalFk: [],
				programWorkoutFk: [
				{
					programWorkoutId: 1,
					workoutFk: {
						workoutId: 1,
						name: "name1",
						type: "type1",
						set: [
						{
							setId: 1,
							repetitions: 10,
							setRepetitions: 3,
							exerciseFk: {
								exerciseId: 1,
								name: "exercise1",
								description: "description1",
								targetMuscle: "targetMuslce1",
								imageLink: "imageLink",
								videoLink: "videoLink"
							}
						},
						{
							setId: 2,
							repetitions: 10,
							setRepetitions: 3,
							exerciseFk: {
								exerciseId: 2,
								name: "exercise2",
								description: "description2",
								targetMuscle: "targetMuslce2",
								imageLink: "imageLink",
								videoLink: "videoLink"
							}
						},
						{
							setId: 3,
							repetitions: 10,
							setRepetitions: 3,
							exerciseFk: {
								exerciseId: 3,
								name: "exercise3",
								description: "description3",
								targetMuscle: "targetMuslce3",
								imageLink: "imageLink",
								videoLink: "videoLink"
							}
						},
						{
							setId: 4,
							repetitions: 10,
							setRepetitions: 3,
							exerciseFk: {
								exerciseId: 4,
								name: "exercise4",
								description: "description4",
								targetMuscle: "targetMuslce4",
								imageLink: "imageLink",
								videoLink: "videoLink"
							}
						}
						]
					}
				},
				{
					programWorkoutId: 2,
					workoutFk: {
						workoutId: 2,
						name: "name2",
						type: "type2",
						set: [
						{
							setId: 5,
							repetitions: 10,
							setRepetitions: 3,
							exerciseFk: {
								exerciseId: 1,
								name: "exercise1",
								description: "description1",
								targetMuscle: "targetMuslce1",
								imageLink: "imageLink",
								videoLink: "videoLink"
							}
						}
						]
					}
				},
				{
					programWorkoutId: 3,
					workoutFk: {
						workoutId: 3,
						name: "name3",
						type: "type3",
						set: [
						{
							setId: 6,
							repetitions: 10,
							setRepetitions: 3,
							exerciseFk: {
								exerciseId: 1,
								name: "exercise1",
								description: "description1",
								targetMuscle: "targetMuslce1",
								imageLink: "imageLink",
								videoLink: "videoLink"
							}
						}
						]
					}
				}
				]
			},
			{
				programId: 2,
				name: "name2",
				category: "category2",
				programGoalFk: [],
				programWorkoutFk: [
				{
					programWorkoutId: 4,
					workoutFk: {
						workoutId: 1,
						name: "name1",
						type: "type1",
						set: [
						{
							setId: 1,
							repetitions: 10,
							setRepetitions: 3,
							exerciseFk: {
								exerciseId: 1,
								name: "exercise1",
								description: "description1",
								targetMuscle: "targetMuslce1",
								imageLink: "imageLink",
								videoLink: "videoLink"
							}
						},
						{
							setId: 2,
							repetitions: 10,
							setRepetitions: 3,
							exerciseFk: {
								exerciseId: 2,
								name: "exercise2",
								description: "description2",
								targetMuscle: "targetMuslce2",
								imageLink: "imageLink",
								videoLink: "videoLink"
							}
						},
						{
							setId: 3,
							repetitions: 10,
							setRepetitions: 3,
							exerciseFk: {
								exerciseId: 3,
								name: "exercise3",
								description: "description3",
								targetMuscle: "targetMuslce3",
								imageLink: "imageLink",
								videoLink: "videoLink"
							}
						},
						{
							setId: 4,
							repetitions: 10,
							setRepetitions: 3,
							exerciseFk: {
								exerciseId: 4,
								name: "exercise4",
								description: "description4",
								targetMuscle: "targetMuslce4",
								imageLink: "imageLink",
								videoLink: "videoLink"
							}
						}
						]
					}
				},
				{
					programWorkoutId: 5,
					workoutFk: {
						workoutId: 4,
						name: "name4",
						type: "type4",
						set: [
						{
							setId: 7,
							repetitions: 10,
							setRepetitions: 3,
							exerciseFk: {
								exerciseId: 1,
								name: "exercise1",
								description: "description1",
								targetMuscle: "targetMuslce1",
								imageLink: "imageLink",
								videoLink: "videoLink"
							}
						}
						]
					}
				}
				]
			}
			]
		},
	}
</script>

<style>

</style>