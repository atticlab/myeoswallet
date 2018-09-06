<template>
  <md-card class="md-card-style">
    <md-toolbar class="md-transparent" :md-elevation="0">
      <div class="md-title">Vote producer</div>
    </md-toolbar>

    <md-card-content>
      <md-button @click="producers = []" style="color: #ffffff; box-shadow: none; width: 260px; "
                 class="md-raised md-primary">Reset
      </md-button>
      <md-button @click="Vote" style="color: #ffffff; box-shadow: none; width: 260px; "
                 class="md-raised md-primary">Vote
      </md-button>
    </md-card-content>
  </md-card>
</template>

<script>
import bl from '@/bl';
import { mapState, mapGetters, mapActions } from 'vuex';
import ActionType from '../../../../store/constants';

export default {
  name: 'Vote',
  data() {
    return {
      producers: [],
    };
  },
  computed: {
    ...mapState([
      'eos',
    ]),
    ...mapGetters([
      'getAccountName',
    ]),
  },
  methods: {
    ...mapActions([
      ActionType.SET_TRANSACTION,
    ]),
    onSetProxy() {
      this.eos.voteproducerss(this.getAccountName, '', this.producers)
        .then((res) => {
          console.debug(`${this.$options.name} RESULT`, res);
          this[ActionType.SET_TRANSACTION](res);
          bl.renderJSON(res, 'place-for-transaction');
        })
        .catch((e) => {
          bl.handleError(e, 'place-for-transaction');
        });
    },
  },
  created() {
    this.eos.getProducers({
      json: true,
      limit: 700,
    })
      .then((res) => {
        this.producers = res.rows;
        for (let i = 0; i < this.producers.length; i++) {
          this.producers[i].h = 1
        }
      })
      .catch(e => console.log(e));
  },
};
</script>

<style scoped>

</style>
