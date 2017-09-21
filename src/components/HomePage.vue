<template>
  <div>
    <div  id="sectionBlue">
      <div class="row justify-content-around center-block">

        <div class="col-sm-5 align-self-center" id="loginComponent">
          <h1>See beyond</h1>
          <p class="white-description">
            The Falko platform was designed with the focus on meeting the need for agile
            project managers to track the productivity of teams and projects managed in a
            more simplified way. The application aims to present the metrics established,
            through the data collected in GitHub, as relevant information and compact
            reports. Thus, it will centralize all the information necessary for the analysis
            and decision making of the manager.
          </p>
        </div>

        <div class="col-sm-4" id="loginComponent" align="center">
          <h2>Start Now!</h2>
          <login></login>
        </div>
      </div>
    </div>

      <div class="parallax">
        <div class="row justify-content-around center-block" id="asdf">
          <div class="col-sm-5 align-self-center" id="loginComponent">
            <h1>See beyond</h1>
            <p class="white-description">
              The Falko platform was designed with the focus on meeting the need for agile
              project managers to track the productivity of teams and projects managed in a
              more simplified way. The application aims to present the metrics established,
              through the data collected in GitHub, as relevant information and compact
              reports. Thus, it will centralize all the information necessary for the analysis
              and decision making of the manager.
            </p>
          </div>

          <div class="col-sm-4" id="loginComponent" align="center">
            <h1>Start Now!</h1>
            <login></login>
          </div>
        </div>
      </div>

    <div class="" id="sectionLight">
      <div class="row justify-content-center">
        <div class="col-sm-4" align="center" id="registerComponent">
          <register></register>
        </div>


        <div class="col-sm-6 align-self-center">
          <h1>Another Lorem Ipsum</h1>
          <p class="white-description">
            The Falko platform was designed with the focus on meeting the need for agile
            project managers to track the productivity of teams and projects managed in a
            more simplified way. The application aims to present the metrics established,
            through the data collected in GitHub, as relevant information and compact
            reports. Thus, it will centralize all the information necessary for the analysis
            and decision making of the manager.
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import Login from './Login.vue'
import Register from './Register.vue'

export default {
  components: {
    'login': Login,
    'register': Register
  },

  data () {
    return {

    }
  }
}
</script>

<style scoped>

h1 {
  color: white;
  text-shadow: 1px 2px rgba(0, 0, 0, 0.4);
}

.parallax {
    /* The image used */
    background-image: url("../assets/fk.jpg");

    /* Set a specific height */
    height: auto;
    /* Create the parallax scrolling effect */
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

}

.white-description {
  color: #EFF3F5;
  text-align: justify;
}

#asdf {
  margin: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(18, 69, 89, 0.7);
}

#falkoDescription {
  color: #EFF3F5;
}

#loginComponent {
  padding-top: 2em;
  padding-bottom: 2em;
}

#registerComponent {
  padding-top: 4em;
  padding-bottom: 4em;
}

#sectionBlue {
  background-color: #598392;
}

#sectionLight {
  background-color: #124559;
}
</style>
