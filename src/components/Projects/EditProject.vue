<template>
  <div class = "editproject">
    <button type="button" class="btn btn-info btn-md falko-button" id="editbutton" data-toggle="modal" data-target="#editModal" v-on:click="refreshScoreInformation()">
      Edit
    </button>
    <div class="modal fade" id ="editModal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Edit Project</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="row modal-body">
            <div class="col">
              <div class="row">
                <div class="col">
                    <v-text-field
                      label="Name"
                      v-model="name"
                      :rules="[rules.required]"
                    ></v-text-field>
                    <p class="text-danger" v-if="errors.has('name')">{{ errors.first('name') }}</p>
                    <br>
                </div>
                <div class="col">
                  <v-text-field
                    label="Description"
                    v-model="description"
                    :rules="[rules.required]"
                  ></v-text-field>
                  <p class="text-danger" v-if="errors.has('description')">{{ errors.first('description') }}</p>
                  <br>
                </div>
              </div>
              <div class="row">
                <div class="col text-center">
                  <is-scoring v-bind:is_scoring="this.isScoring" v-on:edited-score="refreshIsScoring($event)"></is-scoring>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer" id="editFooterModal">
            <button type="button" :disabled="errors.has('name') || errors.has('description')" class="btn btn-info btn-md falko-button" v-on:click="editProject" data-dismiss="modal">Save</button>
            <button type="button" class="btn btn-info btn-md falko-button-grey" data-dismiss="modal" >Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { HTTP } from '../../http-common';
import IsScoring from '../Score/IsScoring.vue';

export default{
  name: 'editProj',

  components: {
    'is-scoring': IsScoring,
  },

  data() {
    return {
      name: '',
      description: '',
      isScoring: '',
      rules: {
        required: value => !!value || 'Required.',
      }
    };
  },
  computed: {
    ...mapState({
      token: state => state.auth.token,
    }),
  },
  methods: {
    editProject() {
      const _this = this;
      const headers = { Authorization: this.token };

      HTTP.put(`projects/${this.$route.params.id}`, {
        name: this.name,
        description: this.description,
        is_scoring: this.isScoring,
      }, { headers })
        .then(() => {
          this.$emit('edited-project');
        })
        .catch((e) => {
          _this.errors.add('wrong-credentials', 'Problem with credentials');
        });
    },
    getProjectInformation() {
      const headers = { Authorization: this.token };

      HTTP.get(`projects/${this.$route.params.id}`, { headers })
        .then((response) => {
          this.name = response.data.name;
          this.description = response.data.description;
          this.isScoring = response.data.is_scoring;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    refreshIsScoring(event) {
      this.isScoring = event;
      this.$children[0].getScoreInformation();
    },

    refreshScoreInformation() {
      this.$children[0].getScoreInformation();
    },
  },
  created() {
    this.getProjectInformation();
  },
};
</script>

<style scoped>

#editbutton {
  width: 120px;
}

</style>
