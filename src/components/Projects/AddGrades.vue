<template>
  <div>
    <div class="text-center">
      <v-btn  type="button" 
              class="info falko-button white--text" 
              id="addButton" 
              color="#86B1B1" 
              data-toggle="modal" 
              data-target="#addGradeModal"
      >
        Grade
      </v-btn>
    </div>
    <div class="modal fade" id ="addGradeModal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Add Grades</h4>
            <v-btn  text icon 
                    type="button" 
                    class="close" 
                    data-dismiss="modal" 
                    aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </v-btn>
          </div>
          <div class="row modal-body">
            <div class="col-md-4">
              <div class="dropdown">
                <button v-model="burndown" class="btn btn-secondary btn-color dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {{ burndownTittle }}
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item items-click" v-on:click="setBurndownValue(0)">0</a>
                  <a class="dropdown-item items-click" v-on:click="setBurndownValue(1)">1</a>
                  <a class="dropdown-item items-click" v-on:click="setBurndownValue(2)">2</a>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="dropdown">
                <button class="btn btn-secondary btn-color dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {{ velocityTittle }}
                </button>
                <div v-model="velocity" class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item items-click" v-on:click="setVelocityValue(0)">0</a>
                  <a class="dropdown-item items-click" v-on:click="setVelocityValue(1)">1</a>
                  <a class="dropdown-item items-click"v-on:click="setVelocityValue(2)">2</a>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="dropdown">
                <button class="btn btn-secondary btn-color dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {{ debtTittle }}
                </button>
                <div v-model="debt" class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item items-click" v-on:click="setDebtValue(0)">0</a>
                  <a class="dropdown-item items-click" v-on:click="setDebtValue(1)">1</a>
                  <a class="dropdown-item items-click"v-on:click="setDebtValue(2)">2</a>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <v-btn  type="button" 
                    class="info falko-button white--text" 
                    color="#86B1B1" 
                    v-on:click="addGrades" 
                    data-dismiss="modal"
            >
              Save
            </v-btn>
            <v-btn type="button" class="info falko-button white--text" color="#868e96" data-dismiss="modal">Close</v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { HTTP } from '../../http-common';

export default {
  data() {
    return {
      burndown: '',
      velocity: '',
      debt: '',
      burndownTittle: 'Burndown',
      velocityTittle: 'Velocity',
      debtTittle: 'Debt',
      created: false,
    };
  },

  computed: {
    ...mapState({
      token: state => state.auth.token,
      isProjectFromGitHub: state => state.clientStatus.isProjectFromGitHub,
    }),
  },

  methods: {
    setVelocityValue(value) {
      this.velocity = value;
      this.velocityTittle = "Velocity: " + value;
    },
    setBurndownValue(value) {
      this.burndown = value;
      this.burndownTittle = "Burndown: " + value;
    },
    setDebtValue(value) {
      this.debt = value;
      this.debtTittle = "Debt: " + value;
    },

    addGrades() {
      const headers = { Authorization: this.token };

      HTTP.post(`projects/${this.$route.params.id}/grades`, {
        grade: {
          weight_debts: this.debt,
          weight_velocity: this.velocity,
          weight_burndown: this.burndown
        },
      }, { headers })
      .then((response)=>{
        this.created = true
      })
      .catch(e=>{
        this.errors.push(e)
      });
    },
  },
};
</script>

<style scoped>

.modal-body{
  position: relative;
  top: 5px;
}

p {
  margin-bottom: 0.5em;
}

label {
  margin-bottom: 0em;
}

.btn-color {
  background-color: #86B1B1;
}

.btn-color:hover {
  background-color: #565e66;
}

.items-click:active {
  background-color: #565e66;
}
</style>
