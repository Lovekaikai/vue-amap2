export default {
  data () {
    return {}
  },
  methods: {},
  computed: {
    permission () {
      return this.$store.getters.getPermission
    }
  }
}
