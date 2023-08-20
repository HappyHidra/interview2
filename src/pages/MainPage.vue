<template>
  <TheHeader />
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
        <li v-for="newsItem of data?.items" :key="newsItem.type.xmlId" class="news-list__item">
          <article class="news-card">
            <img
              v-if="newsItem.image"
              class="news-card__image"
              :src="newsItem.image"
              :alt="newsItem.code"
            />
            <div class="news-card-content">
              <div class="news-card-date">
                <div class="news-card-date__day">{{ formatDate(newsItem.date)[0] }}</div>
                <div class="news-card-date__date">
                  {{ formatDate(newsItem.date)[1] }}<br />{{ formatDate(newsItem.date)[2] }}
                </div>
              </div>
              <h2 class="news-card__title link">
                {{ newsItem.name }}
              </h2>
              <p class="news-card__descr">{{ newsItem.previewText }}</p>
            </div>
            <p class="news-card__tag">{{ newsItem.type.value }}</p>
          </article>
        </li>
      </ul>
      <!-- Loader -->
      <div class="loader" v-if="moreLoading">
        <img src="@/assets/img/loader.gif" alt="" />
      </div>
      <div class="btn-wrapper">
        <button @click="showMore" v-if="showMoreBtn" class="button button-primary">
          Загрузить ещё
        </button>
      </div>
    </div>
  </main>
  <TheFooter />
</template>

<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
import { fetchData, fetchPage } from '@/composables/useData'
import type { Response } from '@/types/News'
import type { Ref } from 'vue'
import { formatDate } from '@/helpers/date'
import { ref, computed } from 'vue'

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

<style lang="scss" scoped>
@import '@/assets/css/style.scss';
</style>
