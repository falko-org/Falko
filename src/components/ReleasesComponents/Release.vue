<template>
  <div>
    <div class="row justify-content-around" id="releaseData">
      <div class="col-md-8">
        <ul class="list-inline">
          <li class="list-inline-item vertical-center">
            <h1>{{release.name}}</h1>
          </li>
          <li class="list-inline-item vertical-center small-float-right">
            <h5 class="float-left">
              {{release.initial_date}}
              | 
              {{release.final_date}}
            </h5>
          </li>
          <p class="text-justify text-muted">
            {{release.description}}
          </p>
        </ul>
      </div>
      <div class="col-md-3">
        <ul class="list-inline">
          <li class="list-inline-item">
            <edit-release></edit-release>   
          </li>
          <li class="list-inline-item">
            <delete-release></delete-release>   
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP } from '../../http-common.js';
import EditRelease from '@/components/ReleasesComponents/EditRelease';
import DeleteRelease from '@/components/ReleasesComponents/DeleteRelease';
import { mapState } from 'vuex';

export default {
  components: {
    'edit-release': EditRelease,
    'delete-release': DeleteRelease
  },
  data () {
    return {
      release: {}
    }
  },
  computed: {
    ...mapState({
      token: state => state.auth.token,
    })
  },
  methods: {
    getRelease() {
      var headers = { 'Authorization':this.token };

      HTTP.get(`releases/${this.$route.params.id}`, { headers })
      .then((response) => {
        this.release = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
      });
    }
  },

  mounted() {
    this.getRelease()
  }
}
</script>

<style scoped>
h1 {
  color: #688E9B;
  font-weight: bold;
}

h5 {
  color: rgba(1, 22, 30, 0.75);
  font-weight: lighter;
}

#releaseData {
  margin-top: 2em;
  margin-right: 0em;
}

.small-float-right {
  margin-left: 1em;
}
.vertical-center {
  vertical-align: middle;
}
</style>
