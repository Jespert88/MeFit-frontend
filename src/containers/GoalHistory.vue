<template>
<div class="content">
     <Loading v-if="loading"/>

     <b-alert v-if="errorMessage != ''" align="center" variant="danger" show dismissible>{{errorMessage}}asdsad</b-alert>

     <div v-if="!loading">
        <b-card no-body class="full-width">
            <b-tabs pills card vertical> 
                <b-tab :title="goal.endDate" v-for="goal in goalList" :key="goal.goalId">
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
                errorMessage: "",
                profileId: this.$auth.profileId
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
                            this.goalList = response.data
                        } 
                    })
                    .catch((e) => {
                        this.loading = false
                        this.errorMessage = e
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