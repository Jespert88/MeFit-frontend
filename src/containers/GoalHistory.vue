<template>
    <div class="content">
     <Loading v-if="loading"/>
     <div  v-if="!loading">

        <GoalCard/>

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
                profileId: this.$auth.profileId
            }
        },
        mounted() {

        },
        methods: {
            retrieveGoals: function() {
                axios
                    .get('http://localhost:8080/goal/history/user/1')
                    .then((response) => {
                        this.loading = false
                        this.errorMessage=""
                        if(response.status == 202) {
                            // success
                            this.goalList = response.data
                        } 
                    })
                    .catch(e => {
                    this.errorMessage = e
                    })
            }
        }
    }
</script>
