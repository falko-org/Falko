<template>
  <div>
    <div v-if="isSprintsEmpty()">
      <no-sprint></no-sprint>
    </div>
    <div class="row top-buffer" v-for="i in Math.ceil(sprints.length / 2)">
      <div v-for="sprint in sprints.slice((i-1) * 2,i*2)" class="col-md-6 text-center">
        <router-link v-bind:to="'/insprint/'+sprint.id" class="asdf">
          <div class="card">
            <div class="card-body sprint">
              <h4 class="card-title">
                  {{sprint.name}}
              </h4>
              <p class="card-text text-muted">{{sprint.description}}</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="col">
      <AddSprint></AddSprint>
    </div>
  </div>
</template>

<script>
import { EventBus } from '../event-bus.js';
import AddSprint from '@/components/AddSprint';
import {HTTP} from '../http-common.js';
import NoSprints from '@/components/NoSprints'

export default{
  components: {
    'AddSprint' : AddSprint,
    'no-sprint': NoSprints
  },
  name: 'sprints',
  data() {
    return{
      sprints: []
    }
  },
  methods: {
    getSprints() {
      var headers = {'Authorization':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1MDgwNjk5NDB9.z6-SzacTPbJNIbVtperIsNUvDlS5vJCl4pcIsRv4K4o'}
      HTTP.get("projects/1/sprints", { headers:headers })
      .then(response => {
        this.sprints = response.data;
      })
      .catch(e => {
        this.errors.push(e);
      });
    },

    isSprintsEmpty() {
      return this.sprints.length == 0
    }
  },
  mounted() {
    var _this = this
    EventBus.$on('added-sprint', function (id) {
      HTTP.get("sprints")
      .then(response => {
        _this.sprints = response.data;
      })
      .catch(e => {
        this.errors.push(e);
      });
    });

    this.getSprints();
  }

}
</script>

<style scoped>
.top-buffer {
  margin-top:30px;
}

a:link {
  text-decoration: none !important;
  color: inherit;
}

a:hover {
  font-weight: bold;
}
</style>
