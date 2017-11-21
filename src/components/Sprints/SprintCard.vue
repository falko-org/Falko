<template>
  <div>
    <div class="card pointer-cursor">
      <div class="row">
        <div class="col-md-3 divider">
          <div class="row">
            <p>{{sprint.initial_date}}</p>
          </div>
          <div class="row">
            <p>{{sprint.final_date}}</p>
          </div>
        </div>
        <div class="col-md-6 divider">
          <div class="row card-title">
            <h4>{{sprint.name}}</h4>
          </div>
          <div class="row card-text text-muted">
            <p>{{sprint.description}}</p>
          </div>
        </div>
        <div class="col-md-3">
          <p>STATUS</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['sprint'],
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
