<template>
  <div>
    <div>
      <input v-if="parent == 'DoneReport'"
        v-model="newItemText"
        placeholder="Add done report"
        v-on:keyup.enter="addNewItem"
      />
      <input v-if="parent == 'UndoneReport'"
        v-model="newItemText"
        placeholder="Add undone report"
        v-on:keyup.enter="addNewItem"
      />
    </div>
    <ul>
      <li
        is="list-item-revision"
        v-for="(item, index) in items"
        v-bind:key="item.id" v-bind:title="item.title"
        v-on:remove="items.splice(index, 1)"
      >
      </li>
    </ul>
  </div>
</template>

<script>
import ListItemRevision from './ListItemRevision';

export default {
  props: ["parent"],

  components: {
    'list-item-revision': ListItemRevision
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

      this.$emit('listUpdated', this.items, this.parent)
      } else {
        // Fazer aparecer uma mensagem: "{{parent}} can not be blank!"
      }
    }
  }
}
</script>

<style scoped>
input {
  width: 100%;
  padding: 1em;
  background-color: #86B1B1;
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
