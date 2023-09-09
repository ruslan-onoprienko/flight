<template>
  <div>
    <v-menu
        v-model="menu"
        :close-on-content-click="false"
        location="bottom"
    >
      <template v-slot:activator="{ props }">
        <v-btn
            class="people-menu-button"
            color="transparent"
            v-bind="props"
        >
          <template v-if="adults || children">
            {{adults ? `${adults} Adults` : ''}}
            {{children ? `${children} Children` : ''}}
          </template>
          <template v-else>
            <div>
              Add People
            </div>
          </template>
        </v-btn>
      </template>
      <v-card min-width="300">
        <div class="add-people-item">
          <div class="title">Adults</div>
          <div class="content-actions">
            <v-icon
                size="large"
                color="#9B9B9B"
                icon="mdi-minus-box"
                @click="removePeople('adults')">
            </v-icon>
            {{adults}}
            <v-icon
                size="large"
                color="#049DD9"
                icon="mdi-plus-box"
                @click="addPeople('adults')">
            </v-icon>
          </div>
        </div>
        <v-divider></v-divider>
        <div class="add-people-item">
          <div class="title">Children</div>
          <div class="content-actions">
            <v-icon
                size="large"
                color="#9B9B9B"
                icon="mdi-minus-box"
                @click="removePeople('children')">
            </v-icon>
            {{children}}
            <v-icon
                size="large"
                color="#049DD9"
                icon="mdi-plus-box"
                @click="addPeople('children')">
            </v-icon>
          </div>
        </div>
      </v-card>
    </v-menu>
    <Validation :value="countPassengers"
                requireMessage="Please add passengers" />
  </div>
</template>

<script>
import {
  VMenu,
  VList,
  VListItem,
  VDivider,
  VBtn,
  VCard,
  VIcon,
} from 'vuetify/components';
import Validation from './helpers/Validation.vue'

export default {
  name: 'PeopleMenu',
  components: {
    VMenu,
    VList,
    VListItem,
    VDivider,
    VBtn,
    VCard,
    VIcon,
    Validation
  },
  data: () => ({
    menu: false,
    adults: 2,
    children: 0,
  }),
  computed: {
    countPassengers() {
      return this.adults + this.children;
    }
  },
  methods: {
    addPeople(entity) {
      ++this[entity];
    },
    removePeople(entity) {
      const currentPeopleCount = this[entity];
      if (currentPeopleCount > 0) {
        --this[entity];
      }
    }
  }
}
</script>

<style scoped lang="scss">
.people-menu-button {
  width: 200px;
  height: 44px;
}

.add-people-item {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  cursor: default;

  .title {
    flex: 3;
  }

  .content-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 2;
  }
}
</style>