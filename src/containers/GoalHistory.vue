<template>
<div class="content">
     <Loading v-if="loading"/>

     <b-alert v-if="errorMessage != ''" align="center" variant="danger" show dismissible>{{errorMessage}}</b-alert>
    <div v-if="noGoal" style="text-align:center"><h2>You have no goals archived </h2> </div>
     <div v-if="!loading && !noGoal ">
        <b-card no-body class="full-width">
            <b-tabs pills card vertical> 
                <b-tab :title="goal.name" v-for="goal in goalList" :key="goal.goalId">
                    <GoalCard :goal="goal"/>
                </b-tab>
            </b-tabs>
        </b-card>
    </div>
</div>
</template>

<script>
    import GoalCard from '../components/GoalCard.vue'
    import Loading from '../components/Loading.vue'
    import axios from 'axios';

    export default {
        name: "GoalHistory",
        components: {
            GoalCard,
            Loading
        },      
        data() {
            return {
                goalList: [],
                loading: false,
                noGoal : false,
                errorMessage: "",
                profileId: localStorage.profileId
            }
        },
        mounted() {
            this.retrieveGoals()
        },
        methods: {
            retrieveGoals: function() {
                this.loading = true
                axios
                    .get('https://me-fit.herokuapp.com/goal/history/user/'+this.profileId)
                    .then((response) => {
                        this.loading = false
                        if(response.status == 202) {
                            // success
                            if(response.data.length == 0 ){
                                this.noGoal =true;
                            } else{
                                this.noGoal = false;
                                this.goalList = response.data
                            }
                        } 
                    })
                    .catch(() => {
                        this.loading = false
                        this.errorMessage = 'You have no goals in history'
                        this.noGoal =true;
                    })
            }
        }
    }
</script>
<style scoped>
.full-width {
    width: inherit;
}
</style>