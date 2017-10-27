<template>
  <div class="row no-margin justify-content-center">
    <div class="col-6" align="center">
      <div>
        <h3>
          Sprint Retrospective  
        </h3>
      </div>
      <div>
        <list parent="PositivePoints"></list>
        <list parent="NegativePoints"></list>
        <list parent="Improvements"></list>
      </div>   
      <textarea class="text-justify" placeholder="Input your sprint report..." v-model="sprintReport"></textarea>
    </div>
  </div>
</template>

<script>
import List from '@/components/RetrospectiveComponents/List'

export default {
  components: {
    'list': List
  },

  data () {
    return {
      sprintReport: ''
    }
  }
}
</script>

<style scoped>
textarea {
  width: 40em;
  height: 15em;
  padding: 1em;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.25);
  color: #444;
}

input::placeholder {
  color: #777;
}

</style>
