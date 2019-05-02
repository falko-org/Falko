<template>
  <div id="forgot-password">
    <div class="d-flex flex-row justify-content-center">
      <div class="col-sm-8 col-md-6 col-lg-3">
        <div class="card">
          <div class="card-header text-center">
            Recover password
          </div>
          <div class="card-body">
            <form v-if="!sent" @submit.prevent="sendForm()">
              <div class="form-group">
                <label for="email"> Email </label>
                <input type="email" class="form-control" name="email" v-model="email" v-validate="'email'">
                <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</span>
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-primary falko-button"> Recover password </button>
              </div>
            </form>
            <div v-else class="text-center">
              <p>  A recovery email was sent to the given address if it exists in our database. </p>
            </div>
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
  name: 'forgot-password',
  data() {
    return {
      email: '',
      sent: false,
    };
  },

  methods: {
    sendForm() {
      HTTP.post('password/forgot',{
        email: this.email
      })
        .then(res => {
          if( res.status === 200 ) {
            this.sent = true
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
  },
};
</script>

<style scoped>
  #forgot-password {
    margin-top: 10em;
  }
</style>


