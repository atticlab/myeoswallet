<template>
  <div></div>
</template>

<script>


export default {
  name: 'Dashboard',
  data() {
    return {
      currentComponent: 'Transfer',
    };
  },
};
</script>

<style lang="scss" scoped>

  .column {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background-color: rgba(255, 255, 255, 0);
  }

  .content {
    margin-top: 5px;
    display: block;
    justify-content: flex-start;
    flex-direction: row;
    height: auto;
    /*flex-grow: 1;*/
    /*background-color: rgba(255, 255, 255, 0);*/
  }

  .transaction-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    word-break: break-all;
    word-break-wrap: break-word;
    overflow-x: auto;
  }
  .md-card-style {
    /*border: 2px rgb(233, 236, 239) solid;*/
    box-shadow: none;
    /*border-radius: 2px;*/
    /*background-color: #fff;*/
  }
  .md-title {
    font-size: 20px;
    color: #7ac231 !important;
  }

  .md-card {
    margin-left: 0;
    margin-right: 0;
  }
</style>
