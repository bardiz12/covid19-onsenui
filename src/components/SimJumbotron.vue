<template>
  <div class="jumbotron">
    <template v-if="configx.iconPos == 'left'">
      <div class="logo">
        <img class="jumb-image" v-bind:src="image" />
      </div>
      <div class="caption">
        <slot></slot>
      </div>
    </template>
    <template v-else>
      <div class="caption">
        <slot></slot>
      </div>
      <div class="logo">
        <img :class="`jumb-image ${configx.isRounded ? 'rounded-img' : ''}`" v-bind:src="image" />
      </div>
    </template>
  </div>
</template>


<style lang="scss">
.jumbotron {
  padding: 16px;
  background-color: #13bde2;
  color: white;
  display: flex;
  justify-content: space-between;
  & .caption {
    margin: auto;
    padding-right: 16px;
    width: 100%;
    vertical-align: middle;
  }
}
.jumb-image {
  width: 150px;
}
</style>

<script>
export default {
  props: ["image", "iconPos","isRounded"],
  data: function() {
    return {
      configx: {
        iconPos: this.iconPos ? this.iconPos : "right",
        isRounded: this.isRounded ? this.isRounded : false
      }
    };
  }
};
</script>