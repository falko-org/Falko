<template>
  <div>
    <div class="image-background">
      <div id="sectionBlue">
        <div class="row justify-content-around center-block no-margin">
          <div class="col-md-4 align-self-center">
            <h1>Start now!</h1>
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
            <login-register></login-register>
          </div>
        </div>
      </div>
    </div>

      <div class="parallax">
        <div class="row justify-content-around center-block no-margin" id="sectionParallax">
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

          <div class="col-sm-4 align-self-center" align="center">
            <img src="../assets/logo.png" class="img-fluid" width="500em" alt="Falko" id="falkoLogo" />
          </div>
        </div>
      </div>

    <div class="" id="sectionDark">
      <div class="row justify-content-center no-margin">
        <div class="col-sm-4" align="center" id="registerComponent">
          <login-register></login-register>
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
    <div class="card-footer" id="footer">
      <a>
Copyright (c) 2017 Falko - UnB-FGA (GPP/MDS) Grupo 8 Segundo Semestre de 2017</a>
    </div>
  </div>
</template>

<script>
import LoginRegister from './LoginRegister.vue'

export default {
  components: {
    'login-register': LoginRegister
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
    background-image: url("../assets/computer.jpg");
    height: auto;

    /* Parallax scrolling effect */
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

}

.white-description {
  color: #EFF3F5;
  text-align: justify;
}

.no-margin {
  margin: 0;
}

#falkoLogo {
  margin: 5em 0;
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

#sectionParallax {
  margin: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(18, 69, 89, 0.9);
}

#sectionBlue {
  background-color: #598392;
  background-color: rgba(89, 131, 146, 1);

  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

#sectionDark {
  background-color: #0C2C39;
}

#footer {
  background-color: #01161E;
  margin: 0;
  max-height: 3em;
  font-size: smaller;
  color: #598392;
  font-size: 0.9rem;
  text-align: center;
}

</style>
