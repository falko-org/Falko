<template>
	<div>
		<div class="col justify-content-center" id="grade">
			<div class="row justify-content-center">
		    <div class="float-right number-circle">
		     	<div id="gradeFont"> {{this.grade}} </div>
		    </div>
			</div>
			<div class="row justify-content-center">
				<div class="float-right ">Project Grade</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { HTTP } from '../../http-common';
	import { mapState } from 'vuex';

  export default {
    props: ['project'],

    data() {
    	return {
      	grade: '',
    	};
  	},

	  computed: {
	    ...mapState({
	      token: state => state.auth.token,
	      isProjectFromGitHub: state => state.clientStatus.isProjectFromGitHub,
	    }),
	  },

  	methods: {
	    getGradeId() {
	    	const headers = { Authorization: this.token };

	      HTTP.get(`projects/${this.project}/grades`, { headers })
	        .then((response) => {
	          this.getGrade(response.data)
	        })
	        .catch((e) => {
	          this.errors.push(e);
	        });
	    },

	    getGrade(grade) {
	    	const headers = { Authorization: this.token };

	    	HTTP.get(`grades/${grade.id}`, { headers })
        .then((response) => {
        	console.log(response.data);
          this.grade = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
	    },
  	},

    mounted() {
    	this.getGradeId();
    },
  }
</script>
<style>
  .number-circle {
    font: 32px Arial, sans-serif;

    width: 1.8em;
    height: 1.8em;

    background: #fff;
    border: 0.1em solid;
    margin-right: 0.3em;
    border-style: solid;
    color: #7799A5;
    border-radius: 50%;

    line-height: 0.5em;
    box-sizing: content-box;
    top: 50%;
    left: 50%;
  }

  #gradeFont {
    font-size: 32px;
    align-self: center;
    margin-top: 0.6em;
  }
</style>