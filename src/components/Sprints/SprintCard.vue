<template>
  <div>
    <div class="card pointer-cursor" v-bind:id="sprint.id" v-on:click="select($event)">
      <div class="row">
        <div class="col-md-3 divider">
          <div class="row">
            <p>{{sprint.initial_date}}</p>
          </div>
          <div class="row">
            <p>{{sprint.final_date}}</p>
          </div>
        </div>
        <div class="col-md-6 divider">
          <div class="row card-title">
            <h4>{{sprint.name}}</h4>
          </div>
          <div class="row card-text text-muted">
            <p>{{sprint.description}}</p>
          </div>
        </div>
        <div class="col-md-3">
          <p>{{this.status()}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { EventBus } from '../../event-bus';
import { HTTP } from '../../http-common';

export default {
  props: ['sprint'],

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
      const headers = { Authorization: this.token };

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

      // TODO: find out a way to catch retrospective status.
      //       HTTP shows erros with no retrospective created.

      if ((today.getDate() > finalDate) && !isRevisionCreated) {
        return 'ALERT';
      }
      return 'OK';
    },
  },
};
</script>

<style scoped>
.sprint-card {
  background-color: #D0D4DA;
  border-bottom: 2px solid #637074;
}

.divider {
  border-right: 1px solid #CCC;
}
</style>
