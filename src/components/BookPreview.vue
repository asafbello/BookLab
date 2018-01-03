<template>
    <section>
        <div class="flip-container" ontouchstart="this.classList.toggle('hover');">
            <div class="flipper">
                <div class="front">
                 <img class="book-img" style="box-shadow: 7px 7px 15px 0px rgb(177, 177, 180);
" :src="imgUrl"/>
                </div>
                <div class="back">
                    <img  class="book-img" :src="imgUrl" />
                </div>
            </div>
        </div>
    </section>
</template>

<script>

import store from "../store/store.js";


export default {
    props: ["imgUrl"],

}


</script>

<style scoped>

/* entire container, keeps perspective */
.flip-container {
	perspective: 1000px;
}
	/* flip the pane when hovered
       For full flip: 180deg */
	.flip-container:hover .flipper, .flip-container.hover .flipper {
		transform: rotateY(180deg);
	}

.flip-container, .front, .back {
	width: auto;
	height: 200px;
    /* // Changed to auto instead 320 px, in case of problems revert!// */
}
.flip-container img {
    height: 200px;
}

/* flip speed goes here */
.flipper {
	transition: 0.6s;
	transform-style: preserve-3d;
	position: relative;
}

/* hide back of pane during swap */
.front, .back {
	backface-visibility: hidden;
	position: absolute;
	top: 0;
	left: 0;
    
}

/* front pane, placed above back */
.front {
	z-index: 2;
	/* for firefox 31 */
	transform: rotateY(-45deg);
}

/* back, initially hidden pane */
.back {
	transform: rotateY(180deg);
    box-shadow: 5px 5px 15px 0px rgb(177, 177, 180);
}

.back:hover {
}



</style>