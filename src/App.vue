<script lang="ts">
import users from './components/users.vue'

export default {
  data() {
    return {

    }
  },
  components: {
    users: users
  }
}
</script>

<template>
  <div id="fullpage">
    <div class="block" id="left">
      <users></users>
    </div>
    <div class="block" id="talk">
      <p>talk</p>
    </div>
    <div class="block" id="main">
      <p>main</p>
    </div>
    <div class="block" id="hand">
      <p>hand</p>
    </div>
    <div class="block" id="right">
      <p>right</p>
    </div>
  </div>
</template>

<style scoped>
  * {
    box-sizing: border-box;
  }

  #fullpage {
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 0.5rem;

    display: grid;
    grid-template: 4fr 2fr 4fr / 2fr 7fr 0.5fr;
    gap: 0.5rem;
    grid-template-areas:
        "left main right"
        "talk main right"
        "talk hand right";
  }

  .block {
    background-color: rgb(255, 255, 255);

    border: 0.2rem solid black;
    border-radius: 1rem;
    padding: 0.5rem;
    color: black;

    display: grid;
    justify-content: center;
    align-items: center;
  }

  #left {
    grid-area: left;
  }

  #talk {
    grid-area: talk;
  }

  #main {
    grid-area: main;
  }

  #hand {
    grid-area: hand;
  }

  #right {
    grid-area: right;
  }
</style>
