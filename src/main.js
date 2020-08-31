import Vue from 'vue'
import App from './App.vue'
import VueIpfs from './plugins/vue-ipfs'

const jsConfig = {
  preload: { enabled: false },
  relay: { enabled: true, hop: { enabled: true, active: true } },
  EXPERIMENTAL: { pubsub: true },
  config: {
    Addresses: {
      Swarm: [
        '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/',
        '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star/',
        '/dns4/webrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star/',
      ],
    },
    Bootstrap: [
      '/ip4/192.168.1.13/tcp/4003/ws/p2p/QmY2Sqz9K6VEZaw3jAGhYNzciWV6WJkhYHK8PvCSF9VFpE',
    ],
  },
}

// Load our IPFS plugin.
Vue.use(VueIpfs, jsConfig)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount('#app')
