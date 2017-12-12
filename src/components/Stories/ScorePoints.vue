<template>
	<div>
			<div v-show = "edit == false" @dblclick = "edit = true">
      	{{points}}
    	</div>
    	<input min="0" type="number" v-show = "edit == true" 
    				v-model = "points"
      			@keyup.enter = "edit=false; scoreStory(points)">
	</div>
</template>

<script>
import { HTTP } from '../../http-common';
import { mapState } from 'vuex';

export default {
	data() {
		return {
			points: "?",
			edit: false,
		}
	},
	computed: {
    ...mapState({
      token: state => state.auth.token,
    }),
  },
	props: ['storyId'],
	methods: {
    scoreStory: function(points) {
    	const headers = { Authorization: this.token };

      HTTP.patch(`/stories/${this.storyId}`, { story_points: points }, { headers })
      .then((response) => console.log(response.code))
    },
  }
}
</script>

<style scoped>
input {
	width: 30px;
}
::-webkit-scrollbar-button {
	display: none;
}
</style>