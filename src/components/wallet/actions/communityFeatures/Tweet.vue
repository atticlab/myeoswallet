<template>
  <md-card class="md-card-style">
    <md-toolbar class="md-transparent" :md-elevation="0">
      <div class="md-title">Decentralized Tweeter</div>
    </md-toolbar>

    <md-card-content class="alw-first-child">
      <md-field :class="tweetError ? 'md-invalid' : ''">
        <label>Tweet</label>
        <span class="md-prefix">@ </span>
        <span class="md-error">Invalid value</span>
        <md-input type="text" v-model="tweet" required @change="validateTweet"></md-input>
      </md-field>
    </md-card-content>

    <md-card-content class="alw-buttons">
      <md-button @click="onTweet" style="color: #ffffff; box-shadow: none; width: 260px; "
                 class="md-raised md-primary" :disabled="tweetValidation">Send
      </md-button>
    </md-card-content>
  </md-card>
</template>

<script>
import bl from '@/bl';
import { mapState, mapGetters, mapActions } from 'vuex';
import ActionType from '@/store/constants';

export default {
  name: 'Tweet',
  data() {
    return {
      tweetError: false,
      tweet: '',
    };
  },
  computed: {
    ...mapState([
      'eos',
    ]),
    ...mapGetters([
      'getAccountName',
      'getAuthority',
    ]),
    tweetValidation() {
      if (this.tweet && !this.tweetError) {
        return false;
      }
      return true;
    },
  },
  methods: {
    ...mapActions([
      ActionType.SET_TRANSACTION,
    ]),
    onTweet() {
      this.eos.transaction(
        {
          actions: [
            {
              account: 'decentwitter',
              name: 'tweet',
              authorization: [{
                actor: this.getAccountName,
                permission: this.getAuthority,
              }],
              data: {
                msg: this.tweet,
              },
            },
          ],
        },
      )
        .then((res) => {
          console.debug(`${this.$options.name} RESULT`, res);
          this[ActionType.SET_TRANSACTION](res);
          bl.renderJSON(res, 'place-for-transaction');
        })
        .catch((e) => {
          this[ActionType.SET_TRANSACTION](e);
          bl.handleError(e, 'place-for-transaction');
        });
    },
    validateTweet() {
      if (bl.lengthInUtf8Bytes(this.tweet) <= 255) {
        this.tweetError = false;
      } else {
        this.tweetError = true;
      }
    },
  },
};
</script>

<style scoped>
  @import '../../../../assets/css/walletaction.css';
</style>
