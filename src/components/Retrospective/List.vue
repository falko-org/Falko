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
      v-on:remove="removeItem(index)"
      >
    </li>
  </ul>
</div>
</template>

<script>
import ListItem from './ListItem.vue';

export default {
  props: ['parent'],

  components: {
    'list-item': ListItem,
  },

  data() {
    return {
      newItemText: '',
      items: [],
      nextItemId: 0,
    };
  },

  methods: {
    addNewItem() {
      if (this.newItemText !== '') {
        this.items.push({
          id: this.nextItemId += 1,
          title: this.newItemText,
        });
        this.newItemText = '';

        this.$emit('listUpdated', this.items, this.parent);
      } else {
        // Fazer aparecer uma mensagem: "{{parent}} can not be blank!"
      }
    },

    removeItem(index) {
      this.items.splice(index, 1);

      this.$emit('listUpdated', this.items, this.parent);
    },
  },
};
</script>

<style scoped>

input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}


ul {
  padding: 0;
}
</style>
