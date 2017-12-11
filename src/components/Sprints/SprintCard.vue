<template>
  <div class="sprint-card">
    <div class="card pointer-cursor" v-bind:id="sprint.id" v-on:click="select($event)">
      <div class="row blue-bg">
        <div class="col-md-3 align-self-center" id="sprintPeriod">
          <div align="center">
            <ul>
              <li>
               <i class="fa fa-calendar-o"></i>
              </li>

              <li>
                {{dateConvert(sprint.initial_date)}}
                |
                {{dateConvert(sprint.final_date)}}
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-6 align-self-center dark-blue-bg" align="center">
          <div class="card-title">
            <h4 align="center">{{sprint.name}}</h4>
          </div>
          <div class="card-text" id="sprintDescription">
            <p align="center">{{sprint.description}}</p>
          </div>
        </div>
        <div class="col-md-3 align-self-center" align="center">
          <ul>
            <li>
              <i class="fa fa-bullhorn"></i>
            </li>

            <li>
              <p align="center">{{this.status()}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { EventBus } from '../../event-bus';
import dateConvert from '../../mixins/dateConvert';

export default {
  props: ['sprint'],

  mixins: [dateConvert],

  computed: {
    ...mapState({
      token: state => state.auth.token,
    }),
  },

  methods: {
    select: (event) => {
      const targetId = event.currentTarget.id;
      EventBus.$emit('selected-sprint', targetId);
    },

    status() {
      const today = new Date();
      const finalDate = this.sprint.final_date.split('-')[2];
      let isRevisionCreated;
      // const headers = { Authorization: this.token };

      // HTTP.get(`retrospectives/${this.sprint.id}`, { headers })
      //   .then((response) => {
      //     if (response.data.id !== null) {
      //       isRevisionCreated = true;
      //     } else {
      //       isRevisionCreated = false;
      //     }
      //   })
      //   .catch(() => {
      //   });

      if ((today.getDate() > finalDate) && !isRevisionCreated) {
        return 'ALERT';
      }
      return 'OK';
    },
  },
};
</script>

<style scoped>
p {
  margin: 0;
}

ul {
  padding: 0;
  margin: 0;
  list-style-type: none;
}

i {
  font-size: 1.5em;
  margin-bottom: 0.5em;
}

.blue-bg {
  background-color: #598392;
}

.dark-blue-bg {
  padding: 0.75em 0 0.75em 0;
  background-color: #124559;
}

.sprint-card {
  color: white;
  margin: 0.5em 0 0.5em 0;
}

.sprint-card:hover {
  filter: grayscale(45%);
}

#sprintDescription {
  color: rgba(255, 255, 255, 0.85);
}
</style>
