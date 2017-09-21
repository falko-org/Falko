<template>
  <div class="card" id="loginRegisterComponent">
    <ul class="nav mb-3 justify-content-around" id="pills-tab" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-expanded="true">Log In</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-expanded="true">Register</a>
      </li>
    </ul>
    <div class="tab-content" id="pills-tabContent">
      <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
        <login></login>
      </div>
      <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
        <register></register>
      </div>
    </div>
</div>
</template>

<script>
import Login from '@/components/Login'
import Register from '@/components/Register'
export default {

  components: {
    'login': Login,
    'register': Register
  }
}
</script>

<style>
#loginRegisterComponent {
  max-width: 20em;
}

.nav-link {
  color: #8B9598;
  padding-top: 1em;
  padding-bottom: 0.4em;
}

.nav-link:hover {
  color: #8B9598;
  border-bottom: 0.25em solid #CAD5D9;
  transition: border .3s ease;
}

.nav-link.active {
  color: #5D6A6F;
  border-bottom: 0.25em solid #86B1B1;
}


</style>
