<template>
	<div>
			<div v-if = "edit == false" @dblclick = "edit = true">
      	{{storyPoints}}
    	</div>
    	<input min="0" type="number" v-else
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
			points: "0",
			edit: false,
		}
	},
	computed: {
    ...mapState({
      token: state => state.auth.token,
    }),
  },
	props: ['storyId', 'storyPoints'],
	methods: {
    scoreStory: function(points) {
    	const headers = { Authorization: this.token };

      HTTP.patch(`/stories/${this.storyId}`, { story_points: points }, { headers })
      .then((response) => this.$emit('update'));
    },
  },

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