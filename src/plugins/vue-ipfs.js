import IPFS from 'ipfs'
import OrbitDB from 'orbit-db'

const plugin = {
  install(Vue, opts = {}) {
    Vue.prototype.$orbitdb = null
    Vue.prototype.$ipfs = IPFS.create(opts).then(
      (ipfs) => (Vue.prototype.$orbitdb = OrbitDB.createInstance(ipfs)),
    )
  },
}

// Auto-install
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
