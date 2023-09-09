<template>
  <v-form ref="formSubmission" class="form-submission-panel">
    <div class="options">
      <div class="option">
        <v-select v-model="trip"
                  :items="tripItems"
                  density="compact" />
      </div>
      <div class="option">
        <v-select v-model="flightClass"
                  :items="flightClassItems"
                  density="compact" />
      </div>
      <div class="option">
        <PeopleMenu />
      </div>
    </div>
    <div class="input-info-search-wrapper">
      <div class="input-info-wrapper">
        <div class="input-info">
          <v-text-field
              :rules="required"
              placeholder="From Airport"
              prepend-inner-icon="mdi-map-marker"
              variant="outlined"
              v-model="fromAirport"
          ></v-text-field>
        </div>
        <div class="switch-block">
          <v-btn class="switch-button" @click="onSwitchAirport">
            <img :src="require('../assets/switch.svg')" />
          </v-btn>
        </div>
        <div class="input-info">
          <v-text-field
              :rules="required"
              placeholder="To Airport"
              prepend-inner-icon="mdi-map-marker"
              variant="outlined"
              v-model="toAirport"
          ></v-text-field>
        </div>
        <div class="input-info">
          <VueDatePicker class="date-picker"
                         placeholder="Calendar From"
                         :min-date="new Date()"
                         v-model="calendarFrom">
          </VueDatePicker>
          <Validation :value="calendarFrom"
                      requireMessage="Please select date" />
        </div>
        <div class="input-info">
          <VueDatePicker class="date-picker"
                         placeholder="Calendar To"
                         :min-date="calendarFrom"
                         v-model="calendarTo">
          </VueDatePicker>
          <Validation :value="calendarTo"
                      requireMessage="Please select date" />
        </div>
      </div>
      <div class="search-wrapper">
        <v-btn class="search" @click="onSearch">
          Search
        </v-btn>
      </div>
    </div>
    <AirportInfo />
    <Notification v-model="showAirportNotification"
                  title="Please select an airport" />
  </v-form>
</template>

<script>
import { mapActions } from 'pinia';
import { useFlightStore } from '../stores/flight';
import {VForm, VIcon, VSelect, VTextField, VBtn} from 'vuetify/components';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import PeopleMenu from './PeopleMenu.vue';
import AirportInfo from './AirportInfo.vue'
import Notification from './helpers/Notification.vue';
import Validation from "./helpers/Validation.vue";

export default {
  name: 'FormSubmission',
  components: {
    Validation,
    VForm,
    VIcon,
    VSelect,
    VTextField,
    VBtn,
    VueDatePicker,
    PeopleMenu,
    AirportInfo,
    Notification,
  },
  data: () => ({
    trip: 'Round-Trip',
    tripItems: ['Round-Trip', 'One way trip'],
    flightClass: 'Economy',
    flightClassItems: ['Economy', 'Business', 'First'],
    fromAirport: '',
    toAirport: '',
    calendarFrom: null,
    calendarTo: null,
    required: [
      value => {
        if (value) {
          return true;
        }

        return 'Please select an airport';
      },
    ],
    showAirportNotification: false,
  }),
  methods: {
    ...mapActions(useFlightStore, [
      'setFromAirportLocation',
      'setToAirportLocation'
    ]),
    onSwitchAirport() {
      const airport = this.fromAirport;
      this.fromAirport = this.toAirport;
      this.toAirport = airport;
    },
    async onSearch() {
      const { valid } = await this.$refs.formSubmission.validate();

      if (!this.fromAirport || !this.toAirport) {
        this.showAirportNotification = true;
      }

      if (valid) {
        this.setFromAirportLocation(this.fromAirport);
        this.setToAirportLocation(this.toAirport);
      }
    },
  },
  watch: {
    calendarFrom() {
      this.calendarTo = null;
    }
  }
};
</script>

<style lang="scss" scoped>
.form-submission-panel {
  display: flex;
  flex-direction: column;

  .options {
    display: flex;
    margin-bottom: 20px;


    .option {
      width: 200px;
      margin-right: 30px;

      &:last-child {
        margin-right: unset;
      }
    }
  }

  .input-info-search-wrapper {
    display: flex;
    margin-bottom: 80px;

    .input-info-wrapper {
      display: flex;
      flex: 4;
      padding: 5px;
      height: 64px;
      border-radius: 5px;
      margin-right: 10px;
      background-color: #049DD9;

      .switch-block {
        margin-right: 10px;

        .switch-button {
          min-width: 54px;
          height: 100%;
        }
      }

      .input-info {
        flex: 2;
        background-color: #ffffff;
        margin-right: 10px;

        &:last-child {
          margin-right: unset;
        }

        .date-picker {
          :deep(input) {
            height: 54px;
          }
        }
      }
    }

    .search-wrapper {
      display: flex;
      flex: 1;

      .search {
        width: 184px;
        height: 64px;
        color: #100225;
        background-color: #049DD9;
      }
    }
  }
}
</style>
