<template>
  <ContentView title="Проверьте правильность введённых данных">
  
  </ContentView>
</template>

<script setup lang="ts">
import ContentView from "~/components/shared/ContentView.vue";
import Inputs from "~/components/ui/inputs/Inputs.vue";
import btn from "~/components/ui/buttons/btn.vue";
import DatePicker from "~/components/ui/inputs/DatePicker.vue";
import Select from "~/components/ui/inputs/Select.vue";
import { ref } from "vue";

// Массив пассажиров
const passengers = ref([
{
  lastName: "",
  firstName: "",
  dateOfBirth: null,
  gender: "",
  passportSeries: "",
  passportNumber: "",
  citizenship: "",
  email: "",
  class: "эконом",
},
{
  lastName: "",
  firstName: "",
  dateOfBirth: null,
  gender: "",
  passportSeries: "",
  passportNumber: "",
  citizenship: "",
  email: "",
  class: "эконом",
},
]);

// Активный таб
const activeTab = ref(0);

// Устанавливаем активный таб
const setActiveTab = (index: number) => {
activeTab.value = index;
};
</script>

<style scoped lang="scss">
.passenger-form {
margin: 0 auto;
width: 100%;
max-width: 94.8rem;
.tab-links {
  @include flex-start;
  gap: .4rem;
  flex-wrap: wrap;
  font-size: 1.8rem;
  font-family: $font_2;

  .tab-link {
    background-color: $gray-light;
    border-radius: 0.8rem;
    color: $dark;
    padding: 1rem .8rem .8rem .8rem;
    cursor: pointer;
    &.active {
      color: $blue;
      background-color: #A2D0FF4A;
    }
  }
}

.tab-content {
  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2.4rem;
    margin-bottom: 2.4rem;
  }
}

.note {
  color: #999;
  margin-bottom: 2.4rem;
  font-size: 1.4rem;
}

.bottom {
  display: flex;
  justify-content: space-between;
  gap: 1.6rem;

  .total {
    span {
      font-size: 1.4rem;
      color: #999;
      display: block;
      margin-bottom: 0.8rem;
    }
    p {
      font-size: 3.2rem;
      font-weight: bold;
    }
  }
}
}
</style>