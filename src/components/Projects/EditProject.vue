<template>
  <div class = "editproject">
    <v-btn  type="button" 
            class="info falko-button white--text" 
            id="editbutton" 
            data-toggle="modal" 
            data-target="#editModal" 
            v-on:click="refreshScoreInformation()"
    >
      Edit
    </v-btn>
    <div class="modal fade" id ="editModal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Edit Project</h4>
            <v-btn text icon type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </v-btn>
          </div>
          <div class="row modal-body">
            <div class="col">
              <div class="row">
                <div class="col">
                  <p><label > Name </label></p>
                  <p><input type = "text"
                            name="name"
                            v-validate="'required'"
                            v-model="name">
                      <p class="text-danger" v-if="errors.has('name')">{{ errors.first('name') }}</p>
                      <br>
                  </p>
                </div>
                <div class="col">
                  <p><label> Description </label></p>
                  <input type = "text"
                         name = "description"
                         v-validate="'required'"
                         v-model="description">
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
            <v-btn  type="button"  
                    :disabled="errors.has('name') || errors.has('description')" 
                    class="info falko-button white--text" 
                    id="editButton" 
                    v-on:click="editProject" 
                    data-dismiss="modal"
            >
              Save
            </v-btn>
            <v-btn type="button" class="info falko-button white--text" data-dismiss="modal" id="closebutton">Close</v-btn>
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
  background-color: #86B1B1;
}

#closebutton{
  background-color: #868e96;
}

</style>
