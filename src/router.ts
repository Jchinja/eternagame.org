import Vue from 'vue';
import Router, { Route, RouteCallback } from 'vue-router';
import Component from 'vue-class-component';

Vue.use(Router);

Component.registerHooks(['beforeRouteEnter', 'beforeRouteLeave', 'beforeRouteUpdate']);

export default function createRouter() {
  const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/labs',
        name: 'labs-list',
        component: () => import('./views/labs/LabsExplore/LabsExplore.vue'),
      },
      {
        path: '/labs/:id',
        name: 'lab-view',
        component: () => import('./views/labs/LabView/LabView.vue'),
      },
      {
        path: '/challenges/:id',
        name: 'challenge-view',
        component: () => import('./views/challenges/ChallengeView/ChallengeView.vue'),
      },
      {
        path: '/quests',
        name: 'quests-list',
        component: () => import('./views/quests/QuestsExplore/QuestsExplore.vue'),
      },
      {
        path: '/quests/:id',
        name: 'quests-view',
        component: () => import('./views/quests/QuestView/QuestView.vue'),
      },
      {
        path: '/create/quest',
        name: 'create-quest',
        component: () => import('./views/quests/CreateQuest/CreateQuest.vue'),
      },
      {
        path: '/puzzles',
        name: 'puzzle-list',
        component: () => import('./views/puzzles/PuzzlesExplore/PuzzlesExplore.vue'),
      },
      {
        path: '/puzzles/:id',
        name: 'puzzle-view',
        component: () => import('./views/puzzles/PuzzleView/PuzzleView.vue'),
      },
      {
        path: '/puzzles/:id/edit',
        name: 'puzzle-view',
        component: () => import('./views/puzzles/PuzzleEdit/PuzzleEdit.vue'),
      },
      {
        path: '/',
        name: 'home',
        component: () => import('./views/home/Home.vue'),
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('./views/about/About.vue'),
      },
      {
        path: '/history',
        name: 'history',
        component: () => import('./views/history/History.vue'),
      },
      {
        path: '/help',
        name: 'quick-help',
        component: () => import('./views/help/QuickHelp.vue'),
      },
      {
        path:'/gamerguide',
        name:'gamer-guide',
        component: () => import('./views/help/GamerGuide.vue'),
      },
      {
        path: '/challenges',
        name: 'challenge-list',
        component: () => import('./views/challenges/ChallengeExplore/ChallengeExplore.vue'),
      },
      {
        path: '/about/software',
        name: 'software',
        component: () => import('./views/software/SoftwareExplore.vue'),
      },
      {
        path: '/about/terms',
        name: 'terms-and-conditions',
        component: () => import('./views/terms/TermsAndConditions.vue'),
      },
      {
        path: '/conduct',
        name: 'code-of-conduct',
        component: () => import('./views/conduct/CodeOfConduct.vue'),
      },
      {
        path: '/news',
        name: 'news-list',
        component: () => import('./views/news/NewsExplore/NewsExplore.vue'),
      },
      {
        path: '/news/:id',
        name: 'news-view',
        component: () => import('./views/news/NewsView/NewsView.vue'),
      },
      {
        path: '/about/publications',
        name: 'publications-list',
        component: () => import('./views/publications/PublicationsExplore.vue'),
      },
      {
        path: '/feed',
        name: 'activity-feed',
        component: () => import('./views/feed/ActivityFeed/ActivityFeed.vue'),
      },
      {
        path: '/players/:uid',
        name: 'player',
        component: () => import('./views/players/PlayerView/PlayerView.vue'),
      },
      {
        path: '/account',
        name: 'edit-profile',
        component: () => import('./views/players/EditProfile/EditProfile.vue'),
      },
      {
        path: '/players',
        name: 'leaderboards',
        component: () => import('./views/players/LeaderBoard/LeaderBoard.vue'),
      },
      {
        path: '/lost',
        name: 'not-found',
        component: () => import('./views/lost/NotFound.vue'),
      },
      {
        path: '/chat',
        name: 'chat',
        component: () => import('./views/chat/FullPageChat.vue'),
      },
      {
        path: '/eternacon',
        redirect: { name: 'eternacon-2021' }
      },
      {
        path: '/eternacon/2020',
        name: 'eternacon-2020',
        component: () => import('./views/eternacon/Eternacon2020.vue'),
      },
      {
        path: '/eternacon/2021',
        name: 'eternacon-2021',
        component: () => import('./views/eternacon/Eternacon2021.vue'),
      },
      {
        path: '/eternacon/about',
        name: 'about-eternacon',
        component: () => import('./views/eternacon/AboutEternacon.vue'),
      }
    ],
    scrollBehavior(to, from, savedPosition) {
      // Navigate to previous scroll position, or else top of page
      // https://router.vuejs.org/guide/advanced/scroll-behavior.html
      if (savedPosition) {
        return savedPosition;
      }

      if (to.hash) {
        return { selector: to.hash };
      }
      
      if(to.params.keepScroll) return null;

      return { x: 0, y: 0 };
    },
  });
  

  router.beforeEach(async (to: Route, from: Route, next: RouteCallback<any>) => {
    const userStore = router.app.$vxm.user;
    // console.log("User", JSON.stringify(router.app.$vxm));
    // console.log("User", router.app.$vxm);
    // console.log("window local storage", window.localStorage);
    if (window.localStorage.getItem('loggedIn') === 'true' && !userStore.triedAuthenticating) {
      await userStore.authenticate();
    }
    if (to.matched.some(record => record.meta.requiresAuth)){
      // puzzle edit
      console.log("http router", router);
      // console.log("total url", `/get/?type=puzzle&nid=${router.app.$route.params.id}&script=-1`);
      // console.log("route params", router.app.$route);
      // console.log("to", to);
      // could add res type, would be odd to have in the router file

      // const res = (
      //   await router.app.$http.get(`/get/?type=puzzle&nid=${to.params.id}&script=-1`)
      // ).data.data;

      // if( res.puzzle.username === router.app.$vxm.user){
      //   console.log("yeah we're good");
      // }
      // console.log("res", res.puzzle);
      
    }
    if (!to.matched.length) {
      next('/lost');
    }
    next();
  });

  router.afterEach(() => {
    // @ts-ignore
    gtag('config', 'UA-17383892-2');
  });

  return router;
}
