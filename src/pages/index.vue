<template>
  <section class="hero is-small">
    <div class="hero-body">
      <p class="title">Home</p>
      <div class="tabs">
      <ul>
        <li class="is-active"><a>Following</a></li>
        <li><a>Custom Feed 1</a></li>
        <li><a>Custom Feed 2</a></li>
        <li><a>Custom Feed 3</a></li>
      </ul>
    </div>
    </div>
  </section>
  <Timeline />
</template>

<style scoped>
.is-fixed {
  position: fixed;
}
.header {
  z-index: 9999;
  background-color: white;
}
</style>
