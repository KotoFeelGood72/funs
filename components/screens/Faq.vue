<template>
  <div class="faq">
    <div class="container">
      <div class="faq_main">
        <h2>Часто задаваемые вопросы</h2>
        <Divider :height="3.2" />
        <div class="faq-list">
          <div
            class="faq-item"
            v-for="(item, index) in visibleQuestions"
            :key="index"
            :class="{
              blur: !showAll && index >= visibleQuestions.length - 2,
              [`blur-${index}`]:
                !showAll && index >= visibleQuestions.length - 2,
            }"
            :style="{
              pointerEvents:
                !showAll && index >= visibleQuestions.length - 2
                  ? 'none'
                  : 'auto',
            }"
          >
            <div class="faq-question" @click="toggleQuestion(index)">
              <h3>{{ item.question }}</h3>
              <div class="faq-btn">
                <Icon
                  :name="
                    activeIndex === index
                      ? 'ic:baseline-minus'
                      : 'ic:baseline-plus'
                  "
                  :size="25"
                />
              </div>
            </div>
            <div
              class="faq-answer"
              :style="{
                height: activeIndex === index ? heights[index] + 'px' : '0',
              }"
              ref="answers"
            >
              <p>{{ item.answer }}</p>
            </div>
          </div>
        </div>
        <div class="show-more">
          <btn
            name="Показать все"
            v-if="!showAll"
            @click="showAllQuestions"
            theme="white"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";
import Divider from "../ui/Divider.vue";
import btn from "../ui/buttons/btn.vue";

const questions = [
  {
    question: "Вопрос?",
    answer:
      "Современные технологии достигли такого уровня, что консультация с широким активом напрямую зависит от модели развития.",
  },
  {
    question: "Вопрос?",
    answer:
      "Современные технологии достигли такого уровня, что консультация с широким активом напрямую зависит от модели развития.",
  },
  {
    question: "Вопрос?",
    answer:
      "Современные технологии достигли такого уровня, что консультация с широким активом напрямую зависит от модели развития.",
  },
  {
    question: "Вопрос?",
    answer:
      "Современные технологии достигли такого уровня, что консультация с широким активом напрямую зависит от модели развития.",
  },
  {
    question: "Вопрос?",
    answer:
      "Современные технологии достигли такого уровня, что консультация с широким активом напрямую зависит от модели развития.",
  },
  {
    question: "Вопрос?",
    answer:
      "Современные технологии достигли такого уровня, что консультация с широким активом напрямую зависит от модели развития.",
  },
  {
    question: "Вопрос?",
    answer:
      "Современные технологии достигли такого уровня, что консультация с широким активом напрямую зависит от модели развития.",
  },
  {
    question: "Вопрос?",
    answer:
      "Современные технологии достигли такого уровня, что консультация с широким активом напрямую зависит от модели развития.",
  },
  {
    question: "Вопрос?",
    answer:
      "Современные технологии достигли такого уровня, что консультация с широким активом напрямую зависит от модели развития.",
  },
];

const activeIndex = ref<number | null>(null);
const heights = ref<number[]>([]);
const answers = ref<HTMLElement[]>([]);
const showAll = ref(false);
const visibleQuestions = ref(questions.slice(0, 5));

const toggleQuestion = (index: number) => {
  if (showAll || index < visibleQuestions.value.length - 2) {
    activeIndex.value = activeIndex.value === index ? null : index;
  }
};

const calculateHeights = async () => {
  await nextTick();
  answers.value = answers.value.slice(0, visibleQuestions.value.length);
  heights.value = answers.value.map((el) => (el ? el.scrollHeight : 0));
};

const showAllQuestions = () => {
  visibleQuestions.value = questions;
  showAll.value = true;
  calculateHeights();
};

nextTick(() => calculateHeights());
</script>

<style scoped lang="scss">
.faq {
  position: relative;
  background-color: $blue;

  h2 {
    color: $white;
    font-size: 3.2rem;
    text-align: center;
  }

  .faq-list {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    position: relative;
  }
}

.faq-list {
  max-width: 62.4rem;
  margin: 0 auto;
}

.faq-item {
  padding: 1.2rem 3.2rem;
  background-color: $white;
  border-radius: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.faq-question {
  @include flex-space;
  gap: 2rem;
  h3 {
    font-size: 2.4rem;
    color: $dark;
  }
}

.faq-btn {
  @include flex-center;
  color: $blue;
}

.faq-answer {
  overflow: hidden;
  transition: height 0.3s ease;
  p {
    padding: 2rem 0;
    font-size: 1.8rem;
    color: $blue;
    font-family: $font_2;
  }
}

.show-more {
  position: absolute;
  bottom: 5.1rem;
  left: 50%;
  transform: translateX(-50%);
}

.blur {
  opacity: 0.5;
  backdrop-filter: blur(0.5rem);
}

.blur-3 {
  opacity: 0.4;
  backdrop-filter: blur(1rem);
}

.blur-4 {
  opacity: 0.2;
  backdrop-filter: blur(2rem);
}
</style>
