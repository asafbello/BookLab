<template v-if="videoId">
    <section class="vid-modal">
        <h1 class="vid-title">We get it, videos are easier &#128526 </h1>
        <div class="video-wrapper">
            <iframe class="iframe" frameborder="0" width="100%" height="250vh" :src="videoURL"></iframe>
        </div>
    </section>
</template>

<script>

export default {
    props: ['videoId'],
    computed: {
        videoURL() {
            return `https://www.youtube.com/embed/${this.videoId}`
        }
    },
    created() {
    }
}

</script>

<style scoped>

.vid-title {
    margin-bottom: 1em;
    padding-bottom: .3em;
    border-bottom: 1px solid black;
}

.vid-modal {
    background: white;
    z-index: 999;
}



</style>