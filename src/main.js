import Vue from "vue";
import App from "./App.vue";
import VueIpfs from "./plugins/vue-ipfs";

const jsConfig = {
  preload: { enabled: false },
  relay: { enabled: true, hop: { enabled: true, active: true } },
  EXPERIMENTAL: { pubsub: true },
  config: {
    Addresses: {
      Swarm: [
        "/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/",
        "/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star/",
        "/dns4/webrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star/",
      ],
    },
    Bootstrap: [
      "/ip4/192.168.0.113/tcp/4002/p2p/QmcHaP6rjtQPHSKt3Tk1fue7CGTLGXMEcunQGf7NAX9gH5",
    ],
  },
};

// Load our IPFS plugin.
Vue.use(VueIpfs, jsConfig);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
