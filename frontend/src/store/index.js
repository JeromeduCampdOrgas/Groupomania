import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate';

const state = {
  userLoggedIn:{},
  count:0,
  //currentPostId: ''
};
const getters = {
  getUserLoggedIn: () => {
    return state.userLoggedIn
  },
  /*getCurrentPostId: () => {
    return state.currentPostId
  }*/
};
const mutations = {
  INCREMENT: (state) => {
    state.count++
  },
  CHANGE_TEXTE: (state,valeur) => {
    state.count = valeur
  },
  SET_USER_INFOS: (state, user) => {
    state.userLoggedIn =user
  },
  /*SET_CURRENT_POST_ID: (state, postId) => {
    state.currentPostId = postId
  }*/
};
const actions =  {
  increment: ({commit}) =>{
    commit('INCREMENT')
  },
  changeTexte: ({commit},valeur) => {
    commit('CHANGE_TEXTE',valeur)
  },
  getUserInfos: ({commit}, user) => {
    commit('SET_USER_INFOS',user)
  },
  /*getCurrentPostId: ({ commit }, postId) => {
    commit('SET_CURRENT_POST_ID',postId)
  }*/
};

export default new Vuex.Store({
  plugins: [persistedState()],
  state,
  getters,
  mutations,
  actions,
  modules:{}   
})