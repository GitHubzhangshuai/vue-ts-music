<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input ref="query" v-model="query" class="box" :placeholder="placeholder"/>
    <i @click="clear" v-show="query" class="icon-dismiss"></i>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { debounce } from '@/common/ts/util'

@Component({})
export default class SearchBox extends Vue {
    @Prop({ type: String, default: '搜索歌曲，歌手' }) placeholder!: string;
    private query = ''
    private clear () {
      this.query = ''
    }

    private setQuery (query: string) {
      this.query = query
    }

    private blur () {
      (this.$refs.query as any).blur()
    }

    @Emit('query') queryEmit (newQuery: string) { return newQuery }
    private created () {
      this.$watch('query', debounce((newQuery: string) => {
        this.queryEmit(newQuery)
      }, 200))
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .search-box
    display: flex
    align-items: center
    box-sizing: border-box
    width: 100%
    padding: 0 6px
    height: 40px
    background: $color-highlight-background
    border-radius: 6px
    .icon-search
      font-size: 24px
      color: $color-background
    .box
      flex: 1
      margin: 0 5px
      line-height: 18px
      background: $color-highlight-background
      color: $color-text
      font-size: $font-size-medium
      &::placeholder
        color: $color-text-d
    .icon-dismiss
      font-size: 16px
      color: $color-background
</style>
