import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementRuLocale from 'element-ui/lib/locale/lang/ru-RU'// element-ui lang
import enLocale from './en'
import ruLocale from './ru'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  ru: {
    ...ruLocale,
    ...elementRuLocale
  }
}

const i18n = new VueI18n({
  locale: Cookies.get('language') || 'en', // set locale
  messages // set locale messages
})

export default i18n
