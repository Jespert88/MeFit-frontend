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
    bottom: 0;
    text-align: center;
    background-color: #123e4b;
    width: 100%;
    padding: 5px;
}
h5 {
    font-size: 18px !important;
    color: #fff;
    margin: 0;
    padding: 0;
}
p {
    font-size: 15px !important;
    color: #fff;
    margin: 0;
    padding: 0;
}

/* Mobile */
@media (min-width: 360px) and (max-width: 600px) {
.footer {
    bottom: 0;
    text-align: center;
    background-color: #123e4b;
    width: 100%;
    padding: 5px;
}
h5 {
    font-size: 15px !important;
    color: #fff;
    margin: 0;
    padding: 0;
}
p {
    font-size: 12px !important;
    color: #fff;
    margin: 0;
    padding: 0;
}
}
/* Tablet */
@media (min-width: 768px) and (max-width: 1024px) {
.footer {
    position: absolute;
    bottom: 0;
    text-align: center;
    background-color: #123e4b;
    width: 100%;
    padding: 5px;
}
h5 {
    font-size: 18px !important;
    color: #fff;
    margin: 0;
    padding: 0;
}
p {
    font-size: 15px !important;
    color: #fff;
    margin: 0;
    padding: 0;
}
}
</style>