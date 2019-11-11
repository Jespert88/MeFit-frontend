<template>
    <div class="footer">
        <div class="container">
            <h5>MeFit : Your personal work out organizer </h5>
            <p>&copy; 2019 by MeFit-team | Contact us</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Footer',
    }
</script>

<style scoped>
.footer {
    text-align: center;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
}
img {
    width: 50px;
}
h5 {
    padding-top: 2%;
    color: #3088a0;
}
</style>
