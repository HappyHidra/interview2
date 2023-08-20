<template>
  <main class="main">
    <div class="main-container container">
      <!-- Loader -->
      <div class="loader" v-if="itemsLoading">
        <img src="@/assets/img/loader.gif" alt="" />
      </div>
      <!-- Error -->
      <div class="error" v-if="error">
        {{ error }}
      </div>
      <!-- Content -->
      <ul class="news-list" v-if="itemsLoaded">
        <li class="news-list__item news-list__item_first">
          <article class="news-card">
            <p class="news-card__tag_first">В центре внимания</p>
            <h2 class="news-card__title_first">
              Операционные результаты Зебры за 2-ой квартал 2018 года
            </h2>
            <span class="news-card__date news-card__date_first">27.05.2018</span>
          </article>
        </li>
        <li v-for="newsItem of data?.items" :key="newsItem.type.xmlId" class="news-list__item">
          <article class="news-card">
            <!-- <img v-if="newsItem.image" :src="newsItem.image" :alt="newsItem.code" /> -->
            <h2 class="news-card__title">
              {{ newsItem.name }}
            </h2>
            <span class="news-card__date">{{ formatDate(newsItem.date) }}</span>
            <p class="news-card__tag">{{ newsItem.type.value }}</p>
          </article>
        </li>
      </ul>
      <!-- Loader -->
      <div class="loader" v-if="moreLoading">
        <img src="@/assets/img/loader.gif" alt="" />
      </div>
      <button @click="showMore" v-if="showMoreBtn" class="button button-primary">
        Загрузить ещё
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { fetchData, fetchPage } from '@/composables/useData'
import type { Response } from '@/types/News'
import { formatDate } from '@/helpers/date'
import { ref, Ref, computed } from 'vue'

const data: Ref<Response | null> = ref(null)
const currentPage = ref(0)
const totalPage = ref(0)
const itemsLoaded = ref(false)
const itemsLoading = ref(false)
const moreLoading = ref(false)
const error = ref(null)

const showMoreBtn = computed(() => {
  return currentPage.value < totalPage.value
})

const showMore = () => {
  currentPage.value += 1
  loadData(currentPage.value)
}

const loadData = async (page?: number) => {
  // Initial
  if (!page) {
    itemsLoaded.value = false
    itemsLoading.value = true
    fetchData()
      .then((res) => {
        data.value = res
        currentPage.value = res.nav.current
        totalPage.value = res.nav.total
        itemsLoading.value = false
        itemsLoaded.value = true
      })
      .catch((err) => {
        itemsLoading.value = false
        error.value = err
      })
  }
  //   Page passed
  else {
    moreLoading.value = true
    fetchPage(currentPage.value)
      .then((res) => {
        if (data.value) {
          data.value.items = data.value.items.concat(res.items)
          data.value.nav.current = currentPage.value
        }
        moreLoading.value = false
      })
      .catch((err) => {
        itemsLoading.value = false
        error.value = err
      })
  }
}

loadData()
</script>
