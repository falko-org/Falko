<template>
  <div>
    <div>
      <input v-if="parent == 'PositivePoints'"
        v-model="newItemText"
        placeholder="Add positive points" 
        v-on:keyup.enter="addNewItem"
      />
      <input v-if="parent == 'NegativePoints'"
        v-model="newItemText"
        placeholder="Add negative points" 
        v-on:keyup.enter="addNewItem"
      />
      <input v-if="parent == 'Improvements'"
        v-model="newItemText"
        placeholder="Add improvements" 
        v-on:keyup.enter="addNewItem"
      />
    </div>
    <ul>
      <li
        is="list-item"
        v-for="(item, index) in items"
        v-bind:key="item.id" v-bind:title="item.title"
        v-on:remove="items.splice(index, 1)"
      >
      </li>
    </ul>
  </div>
</template>

<script>
import ListItem from './ListItem';

export default {
  props: ["parent"],

  components: {
    'list-item': ListItem
  },

  data () {
    return {
      newItemText: '',
      items: [],
      nextItemId: 0
    }
  },

  methods: {
    addNewItem() {
      if(this.newItemText != "") {
        this.items.push({
          id: this.nextItemId++,
          title: this.newItemText
        })
        this.newItemText = ''
      } else { 
        // TODO: Fazer aparecer uma mensagem: "{{parent}} can not be blank!"
      }
    }
  }
}
</script>

<style scoped>
input {
  width: 40em;
  padding: 1em;
  background-color: #7799B9;
  border: none;
  color: white;
}

input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}


ul {
  padding: 0;
}
</style>
