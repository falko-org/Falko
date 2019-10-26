<template>
  <div id="reset-password">
    <div class="container">
      <div v-if="isLoading" class="row justify-content-center">
        <div class="col-md-2">
          <span class="text-secondary"> Loading... </span>
        </div>
      </div>
      <div v-if="hasNetworkError" class="row justify-content-center">
        <div class="col-sm-8">
          <span class="alert alert-danger"> A network error has ocurred. Please, try again later </span>
        </div>
      </div>
      <div v-else-if="errors.has('apiError')" class="row justify-content-center">
        <div class="col-sm-8">
          <span class="alert alert-danger"> {{ errors.first('apiError') }} </span>
        </div>
      </div>
      <div v-else class="container">
        <div v-if="passwordReseted" class="row justify-content-center">
          <div class="col-xm-6">
            <div class="card">
              <div class="card-body">
                <div class="text-center">
                  <span> Your password has been reseted. </span>
                </div>
                <div class="text-center">
                  <v-btn type="button" 
                         class="primary falko-button" 
                         v-on:click="toLogin"
                  > 
                    Login 
                  </v-btn> 
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="tokenValid" class="row justify-content-center">
          <div class="col-xm-4">
            <div class="card">
              <h5 class="card-header text-center"> Reset your password </h5>
              <div class="card-body">
                <form @submit.prevent="sendForm">
                  <div class="form-group">
                    <input v-validate="'required'" name="password" v-model="password" type="password" ref="password" class="form-control" placeholder="New password"> 
                    <small v-if="errors.has('password')" class="text-danger"> {{ errors.first('password') }} </small> 
                  </div>
                  <div>
                    <input v-validate="'required|confirmed:password'" v-model="passwordConfirmation" name="passwordConfirmation" type="password" data-vv-as="confirmation" class="form-control" placeholder="Retype new password"> 
                    <small v-if="errors.has('passwordConfirmation')" class="text-danger"> {{ errors.first('passwordConfirmation') }} </small>
                  </div>
                  <div class="text-center">
                    <v-btn type="submit" 
                           class="primary falko-button"
                    >
                      Reset 
                    </v-btn>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="row justify-content-center">
          <span class="alert alert-warning"> Link invalid or expired. Please, try generating a new one. </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { HTTP } from '../../http-common';

export default {
  name: 'reset-password',
  data() {
    return {
      isLoading: false,
      token: null,
      tokenValid: null,
      password: null,
      passwordConfirmation: null,
      passwordReseted: false,
      hasNetworkError: false,
    }
  },
  methods: {
    checkTokenValidity: function() {
      this.isLoading = true;
      const token = this.$route.query.token;
      HTTP.get(`/password/validate_token?token=${token}`)
        .then( res => {
          if(res.data.status === 'true') {
            this.tokenValid = true;
          } else {
            this.tokenValid = false;
          }
        })
        .catch( err => {
          if(err.message === 'Network Error') {
            this.hasNetworkError = true;
          }
          else if(err.response) {
            this.errors.add('apiError', err.response.data['status']);
          } else if(err.request) {
            this.errors.add('apiError', err.message);
          }
        })
        .then(() => {
          this.isLoading = false; 
        });
    },

    sendForm: function() {
      if( this.errors.any()) {
        return false;
      } else {
        HTTP.post('/password/reset', {
          token: this.token,
          password: this.password
        })
          .then( res => {
            if(res.status === 200) {
              this.passwordReseted = true
            } else {
              this.passwordReseted = false
            }
          })
          .catch( err => {
            if(err.message === 'Network Error') {
              this.hasNetworkError = true;
            }
            else if(err.response) {
              this.errors.add('apiError', err.response.data['status']);
            } else if(err.request) {
              this.errors.add('apiError', err.message);
            } else {
              this.errors.add('apiError', 'Something wrong happened. Try again later');
            }
          });
      }
      return true;
    },
    toLogin: function() {
      this.$router.push({ path:'/'});
    }

  },
  created() {
    const token = this.$route.query.token;
    if(token !== null || token !== undefined) {
      this.token = token;
      this.checkTokenValidity();
    } 
  }


}
</script>
<style scoped>
  #reset-password {
    margin-top:10em;
  }
</style>



