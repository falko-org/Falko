<template>
  <div>
    <div class="card">
      <div class="row">
        <div class="col-md-3 divider">
          <div class="row">
            <p>01/01/2017</p>
          </div>
          <div class="row">
            <p>02/01/2017</p>
          </div>
        </div>
        <div class="col-md-6 divider">
          <div class="row card-title">
            <h4>Sprint 01</h4>
          </div>
          <div class="row card-text text-muted">
            <p>Sprint description</p>
          </div>
        </div>
        <div class="col-md-3">
          <p>STATUS</p>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="row">
        <div class="col-md-3 divider">
          <div class="row">
            <p>02/01/2017</p>
          </div>
          <div class="row">
            <p>03/01/2017</p>
          </div>
        </div>
        <div class="col-md-6 divider">
          <div class="row card-title">
            <h4>Sprint 02</h4>
          </div>
          <div class="row card-text text-muted">
            <p>Sprint 2 description</p>
          </div>
        </div>
        <div class="col-md-3">
          <p>STATUS 2</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sprint: {},
    };
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
