import Vue from "vue";
import createAuth0Client from "@auth0/auth0-spa-js";
import axios from 'axios'
const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

let instance;

export const getInstance = () => instance;

export const useAuth0 = ({
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  redirectUri = 'http://localhost:3000/home',
  ...options
}) => {
  if (instance) return instance;

  instance = new Vue({
    data() {
      return {
        loading: true,
        isAuthenticated: false,
        user: {},
        auth0Client: null,
        popupOpen: false,
        error: null,
        userId : '',
        profileId: '',
        isContributor :false,
        isAdmin : false 
      };
    },
    methods: {
   
      async loginWithPopup(o) {
        this.popupOpen = true;

        try {
          await this.auth0Client.loginWithPopup(o);
          this.user = await this.auth0Client.getUser();
          this.isAuthenticated = await this.auth0Client.isAuthenticated();
          this.error = null;
        } catch (e) {
          console.error(e);
          this.error = e;
        } finally {
          this.popupOpen = false;
        }
      },
      async handleRedirectCallback() {
        console.log('here0')
        this.loading = true;
        try {
          await this.auth0Client.handleRedirectCallback();
          this.user = await this.auth0Client.getUser();
          this.isAuthenticated = true;
          this.error = null;
        } catch (e) {
          this.error = e;
        } finally {
          this.loading = false;
        }
      },
      loginWithRedirect(o) {
        console.log('here1')
        return this.auth0Client.loginWithRedirect(o);
      },
      getIdTokenClaims(o) {
        console.log('here2')

        return this.auth0Client.getIdTokenClaims(o);
      },
      getTokenSilently(o) {
        console.log('here3')

        return this.auth0Client.getTokenSilently(o);
      },
      getTokenWithPopup(o) {
        console.log('here4')

        return this.auth0Client.getTokenWithPopup(o);
      },
      logout(o) {
        return this.auth0Client.logout(o);
      },
    },
     
    async created() {
    
      this.auth0Client = await createAuth0Client({
        domain: options.domain,
        client_id: options.clientId,
        audience: options.audience,
        redirect_uri: redirectUri
      });

      try {
        if (
          window.location.search.includes("code=") &&
          window.location.search.includes("state=")
        ) {
          const { appState } = await this.auth0Client.handleRedirectCallback();
          this.error = null;
          onRedirectCallback(appState);
        }
      } catch (e) {
        this.error = e;
      } finally {
        this.isAuthenticated = await this.auth0Client.isAuthenticated();
        this.user = await this.auth0Client.getUser();
        this.loading = false;
        this.userId = this.user.sub.substring(6)
      }

      axios.get('https://me-fit.herokuapp.com/profile/user/'+this.user.sub.substring(6)).then(response =>{
        this.profileId = response.data.profileId
        if(!response.data.role && response.data.role ==1 ){
          this.isContributor = false;
          this.isAdmin = false;
        }else if (response.data.role == 2){
          this.isContributor = true;
          this.isAdmin = false;
        } else if (response.data.role ==3) {
          this.isContributor = false;
          this.isAdmin = true;
        }else {
          this.isContributor = false
          this.isAdmin = false;
        }
  })
    }
  });

  return instance;
};

export const Auth0Plugin = {
  install(Vue, options) {
    Vue.prototype.$auth = useAuth0(options);
  }
};
