<template>
  <v-row>
    <!-- <v-col cols="12" sm="6" md="6"> -->
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }"><!--v-tooltipからactivatorというslotを取得するという意味-->
          <div v-if="date!==datetodoPick && datetodoPick ">
            <v-text-field
              v-model="datetodoPick"
              label="todo期限"
              prepend-inner-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </div>
          <div v-else>
            <v-text-field
              v-model="date"
              label="todo期限"
              prepend-inner-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </div>
        </template>
          <v-date-picker
            v-model="date"
            @input="menu = false"
            @change="datePick"
          ></v-date-picker>
      </v-menu>
    <!-- </v-col> -->{{'1:'+datetodoPick}}{{'2:'+date}}
  </v-row>
</template>

<script>
  export default {
    name: 'datepicker',
    props:['datetodoPick'],
    data () {
      return {
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      }
    },
    created:function(){
      //date初期値（当日の日付）を親コンポーネントにわたすためにemit実行
      this.$emit('datePick',this.date)
    },
    methods:{
      datePick(){
        this.$emit('datePick',this.date)
        // console.log(this.date)
      }
    }
  }
</script>
