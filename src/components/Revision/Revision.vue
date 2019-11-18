<template>
  <div>
    <div class="row justify-content-around no-margin">
      <div class="col-md-10">
        <div class="card">
          <div class="card-head text-center">
            <h1 id="title" class=""> Sprint Revision </h1>
          </div>
          <div class="card-body ">

            <div class="container">
              <div class="row">
                <p class="col-md-6">
                  <ul class="list-group ">
                    <li class="list-group-item active">Done Reports</li>
                    <li v-for="(done, index) in doneReport" class="list-group-item">
                      <h6> • {{done}}</h6>
                    </li>
                  </ul>
                </p>

                <p class="col-md-6">
                  <ul class="list-group">
                    <li class="list-group-item active">Undone Reports</li>
                    <li v-for="(undone, index) in undoneReport" class="list-group-item">
                      <h6>• {{undone}}</h6>
                    </li>
                  </ul>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-content-around" id="buttons">
          <edit-revision></edit-revision>
          <delete-revision></delete-revision>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ListRevision from './ListRevision.vue';
import DeleteRevision from './DeleteRevision.vue';
import EditRevision from './EditRevision.vue';
import { HTTP } from '../../http-common';

export default {
  name: 'Revision',

  components: {
    'delete-revision': DeleteRevision,
    'edit-revision': EditRevision,
  },

  data() {
    return {
      undoneReport: [],
      doneReport: [],
    };
  },

  computed: {
    ...mapState({
      token: state => state.auth.token,
    }),
  },

  methods: {
    getRevision() {
      const headers = { Authorization: this.token };

      HTTP.get(`revisions/${this.$route.params.id}`, { headers })
        .then((response) => {
          this.doneReport = response.data.done_report,
          this.undoneReport = response.data.undone_report;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },

  mounted() {
    this.getRevision();
  },
};

</script>

<style scoped>
#buttons {
  margin-top: 1em;
}

h1 {
  color: #688E9B;
  font-weight: bold;
  margin-top: 0.5em;
}

p {
  color: #01161E;
  /*text-align: center;*/
}

li {
  border: 0;
}

div {
    text-align: justify;
    text-justify: inter-word;
}

.active {
  background-color: #86b1b1;
  text-align: center;
  border: 0;
}
</style>
