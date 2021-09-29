<template>
  <div>
    パラメータ：{{ $route.params.id }}
  </div>
</template>

<script>
  export default {
    validate ({ params }) {
      // 数値でなければならない
      return /^\d+$/.test(params.id)
    }
  }
</script>
