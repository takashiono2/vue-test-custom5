<template>
  <div>
    パラメータ：{{ $route.params.id }}
  </div>
</template>

<script>
  export default {
    props: {
      name: 'users-id',
    },
    validate ({ params }) {
      // 「\w」アルファベット、アンダーバー、数字
      return /^\w+$/.test(params.id)
    }
  }

</script>
