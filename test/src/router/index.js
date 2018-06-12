import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import lh from '@/components/lodash'
import son from '@/components/son'
import transfer from '@/components/transfer'
import top from '@/components/onemit/top'
import selfMethod from '@/components/directives/selfMethod'
import first from '@/components/inherit/first'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children: [
        {
          path: '/lh',
          component: lh,
          children: [
            {
              path: 'son',
              component: son
            },
            {
              path: 'transfer',
              component: transfer
            }
          ]
        },
        {
          path: '/onemit',
          component: top
        },
        {
          path: '/directives',
          component: selfMethod
        },
        {
          path: '/inherit',
          component: first
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
