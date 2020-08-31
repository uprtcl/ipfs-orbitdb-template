<template>
  <div class="ipfs-info">
    <input v-model="content" />
    <button v-on:click="create">create object ipfs</button>
    <pre>{{ cid }}</pre>
    <br />
    <input v-model="cid" />
    <br />
    <button v-on:click="read">read from ipfs</button>
    <br />
    <pre>{{ contentRead }}</pre>

    <br />
    <button v-on:click="createOdb">crete db</button>
    <br />
    <pre>{{ dbAddress }}</pre>

    <input v-model="key" placeholder="key" />
    <input v-model="value" placeholder="value" />
    <button v-on:click="addEntry">crete entry</button>

    <hr />

    <select v-model="keyRead">
      <option disabled value="">Please select one</option>
      <option v-for="key in keys" :key="key">{{ key }}</option>
    </select>
    <button v-on:click="readEntry">read key</button>
    <br />
    <pre>{{ valueRead }}</pre>
  </div>
</template>

<script>
export default {
  name: 'IpfsInfo',
  data: function () {
    return {
      status: 'Connecting to IPFS...',
      id: '',
      agentVersion: '',
      cid: '',
      content: '',
      contentRead: '',
      dbAddress: '',
      key: '',
      value: '',
      keyRead: '',
      valueRead: '',
      keys: [],
    }
  },
  mounted: function () {
    this.getIpfsNodeInfo()
  },
  methods: {
    async createOdb() {
      const orbitdb = await this.$orbitdb
      const db = await orbitdb.keyvalue('first-database')
      this.dbAddress = db.address
    },
    async addEntry() {
      const orbitdb = await this.$orbitdb
      const db = await orbitdb.keyvalue('first-database')
      await db.load()
      console.log('add entry', db)
      await db.put(this.key, this.value)
      const all = db.all
      this.keys = [...Object.keys(all)]
    },
    async readEntry() {
      const orbitdb = await this.$orbitdb
      const db = await orbitdb.keyvalue('first-database')
      await db.load()
      this.valueRead = db.get(this.keyRead)
      console.log('read entry', { db, valueRead: this.valueRead })
    },
    async create() {
      const ipfsCidConfig = {
        version: 1,
        hashAlg: 'sha2-256',
        format: 'dag-cbor',
      }
      const ipfs = await this.$ipfs
      const object = { text: this.content }
      console.log(object)
      const cid = await ipfs.dag.put(object, ipfsCidConfig)
      this.cid = cid.toString('base58btc')
      console.log({ cid: this.cid })
    },
    async read() {
      const ipfs = await this.$ipfs
      const read = await ipfs.dag.get(this.cid)
      this.contentRead = read.value
    },
    async getIpfsNodeInfo() {
      try {
        // Await for ipfs node instance.
        const ipfs = await this.$ipfs
        console.log(ipfs._ipfs)
        // Call ipfs `id` method.
        // Returns the identity of the Peer.
        const { agentVersion, id } = await ipfs.id()
        this.agentVersion = agentVersion
        this.id = id
        // Set successful status text.
        this.status = 'Connected to IPFS =)'
      } catch (err) {
        // Set error status text.
        this.status = `Error: ${err}`
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
hr {
  margin: 30px 0px 60px 0px;
}
input {
  width: 100%;
  width: calc(100% - 20px - 20px);
  padding: 8px 20px;
  margin-bottom: 20px;
}
.ipfs-logo {
  height: 10rem;
}
pre {
  width: calc(100% - 18px - 18px);
  padding: 18px;
  background-color: #000000;
  color: white;
  text-align: left;
  border-radius: 6px;
}
</style>
