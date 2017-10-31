<template>
	<div class="gpa">
		<div class="card-body">
		    <div class="row align-itens-arround">
		      <div class="col-5 align-content-center">
		        <p class="card-text">
		          <div class="number-circle">
		            <div id="GpaFont">
		            	{{gpa}}
		            </div>
		            <h4> GPA </h4>
		          </div>
		        </p>
		      </div>
		      <div class="col">
		        <p class="card-text text-justify"> </p>
		      </div>
		    </div>
		</div>		    
	</div>	
</template>

<script>
import {HTTP} from '../http-common.js';
export default {
  	props: ['projectId'],
  	data() {
  		return {
  			gpa: 0
  		}
  	},
	methods: {
	    getGpa() {
	      var token = localStorage.getItem('token');
	      var tokenSimple = token.replace(/"/, "");
	      var tokenSimple2 = tokenSimple.replace(/"/, "");
	      var header = { 'Authorization': tokenSimple2 };

	      HTTP.get(`projects/${this.projectId}/gpa`, { headers: header })
	        .then((response) => {
	          this.gpa = response.data;
	        })
	        .catch((e) => {
	          this.errors.push(e);
	        });
	    }
	},
	mounted() {
		this.getGpa();
	}
};
	
</script>

<style>

.number-circle {
  font: 32px Arial, sans-serif;

  width: 2.5em;
  height: 2.5em;
  box-sizing: initial;

  background: #fff;
  border: 0.2em solid #7799A5;
  border-style: solid;
  color: #7799A5;
  text-align: center;
  border-radius: 50%;

  line-height: 2.5em;
  box-sizing: content-box;
  top: 50%;
  left: 50%;
}

#GpaFont {
  font-weight:bolder;
  font-size:1.2em;
}

h4 {
	margin-top: 0.5em;
	font-weight:bolder;
}
</style>>