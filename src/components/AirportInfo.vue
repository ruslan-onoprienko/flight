<template>
  <div class="content-wrapper">
    <div class="content" v-if="fromAirportLocation">
      <div class="title">From Airport Location</div>
      <div class="data">
        {{fromAirportLocation}}
      </div>
    </div>

    <div class="content" v-if="toAirportLocation">
      <div class="title">To Airport Location</div>
      <div class="data">
        {{toAirportLocation}}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia';
import {useFlightStore} from '../stores/flight';

export default {
  name: 'AirportInfo',
  computed: {
    ...mapState(useFlightStore, [
      'fromAirportLocation',
      'toAirportLocation'
    ]),
  },
};
</script>

<style scoped lang="scss">
.content-wrapper {
  .content {
    .title {
      text-align: center;
      font-size: 20px;
      font-width: 500;
      margin-bottom: 20px;
    }

    .data {
      max-height: 175px;
      overflow-y: scroll;
      margin-bottom: 20px;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      border-radius: 10px;
    }

    &:last-child {
      .data {
        margin-bottom: unset;
      }
    }
  }
}
</style>