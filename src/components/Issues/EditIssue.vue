<template>
  <div class="edit-sprint">
     <v-btn type="button" class="info btn-sm falko-button" id="editIssue" data-toggle="modal" v-bind:data-target="`#editIssueModal${selected_issue.number}`" v-on:click="getIssuesInformation()" color="#86B1B1">
      Edit
    </v-btn>

    <div class="modal fade" v-bind:id="`editIssueModal${selected_issue.number}`" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Edit Issue</h4>
              <v-btn text icon type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </v-btn>
          </div>
          <div class="modal-body row">
            <div class="col">
              <v-text-field
                label="Name"
                v-model="name"
                :rules="[rules.required]"
              ></v-text-field>
              <p class="text-danger" v-if="errors.has('name')">{{ errors.first('name') }}</p>
              <br>
              <v-text-field
                label="Description"
                v-model="body"
                :rules="[rules.required]"
              ></v-text-field>
              <p class="text-danger" v-if="errors.has('body')">{{ errors.first('body') }}</p>
              <br>
            </div>
            <div class="col">
              <v-text-field
                label="Assignees"
                v-model="search"
              ></v-text-field>
              <div class="col" v-if="search != ''">
                <div class="row" v-for="contributor in filteredContribs">
                <label class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" v-bind:value="contributor" v-model="selectedContribs">
                    <span class="custom-control-indicator"></span>
                    <span class="custom-control-description">{{contributor}}</span>
                </label>
              </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <v-btn type="button" :disabled="errors.has('name') || errors.has('body')" class="info btn-md falko-button" 
              v-on:click="editIssue(), setAssignees()" data-dismiss="modal" color="#86B1B1">Save</v-btn>
            <v-btn type="button" class="info btn-md falko-button-grey" data-dismiss="modal" color="#868e96">Close</v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP } from '../../http-common.js';
import { mapState } from 'vuex';

export default {
  props: ["selected_issue"],

  data () {
    return {
      name: "",
      body: "",
      number: "",
      contributors: [],
      selectedContribs: [],
      search: "",
      rules: {
        required: value => !!value || 'Required.',
      }
    }
  },

  methods: {

    setAssignees() {
      const headers = { Authorization: this.token };

      HTTP.post(`projects/${this.$route.params.id}/issues/assignees`, {
          assignees: this.selectedContribs,
          issue_number: this.number
      }, { headers })
      .then((response)=>{
        console.log("Success")
      })
      .catch(e=>{
        this.errors.push(e)
      });

    },

    getContributors() {
      const headers = { Authorization: this.token };

      HTTP.get(`projects/${this.$route.params.id}/contributors`, { headers })
        .then((response) => {
          this.contributors = response.data
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    editIssue() {
      const headers = { Authorization: this.token };

      HTTP.put(`projects/${this.$route.params.id}/issues`, {
        issue: {
          number: this.number,
          name: this.name,
          body: this.body
        }
      }, { headers })
      .then((response)=>{
        this.$emit('updated-issue', this.$route.params.id);
        this.$parent.getIssues();
      })
      .catch(e=>{
        this.errors.push(e)
      });
    },

    getIssuesInformation() {
      this.name = this.selected_issue.name,
      this.body = this.selected_issue.body,
      this.number = this.selected_issue.number
    }
  },

  mounted() {
    this.getContributors();
  },
  computed: {
    ...mapState({
      token: state => state.auth.token,
    }),

    filteredContribs:function()
    {
        var self=this;
        return this.contributors.filter(function(contributor){return contributor.toLowerCase().indexOf(self.search.toLowerCase())>=0;});
    }
  }
}

</script>

<style scoped>
#editIssue {
  margin-right: 4px;
}
</style>
