# STOMP WebSocket for Vue.js
vue-stomp-websocket is an integration of STOMP WebSocket for Vuejs: 
supporting Vuex 
component level socket consumer managements

## Installation

## Usage

### Using Connection String
``` javascript
import Vue from 'vue'
import store from './store'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'

Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://metinseylan.com:1992',
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    },
    options: { path: "/my-app/" } //Optional options
}))

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
```

### Using socket.io-client Instance
``` javascript
import Vue from 'vue'
import store from './store'
import App from './App.vue'
import SocketIO from 'socket.io-client';
import VueSocketIO from 'vue-socket.io'

const options = { path: '/my-app/' }; //Options object to pass into SocketIO

Vue.use(new VueSocketIO({
    debug: true,
    connection: SocketIO('http://metinseylan.com:1992', options), //options object is Optional
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    }
  })
);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
```

**Parameters**|**Type's**|**Default**|**Required**|**Description**
-----|-----|-----|-----|-----
debug|Boolean|`false`|Optional|Enable logging for debug
connection|String/Socket.io-client|`null`|Required|Websocket server url or socket.io-client instance
vuex.store|Vuex|`null`|Optional|Vuex store instance
vuex.actionPrefix|String|`null`|Optional|Prefix for emitting server side vuex actions
vuex.mutationPrefix|String |`null`|Optional|Prefix for emitting server side vuex mutations

### Component Level Usage

<p>If you want to listen socket events from component side, you need to add `sockets` object in Vue component, and every function will start to listen events, depends on object key</p>

``` javascript
new Vue({
    sockets: {
        connect: function () {
            console.log('socket connected')
        },
        customEmit: function (data) {
            console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
        }
    },
    methods: {
        clickButton: function (data) {
            // $socket is socket.io-client instance
            this.$socket.emit('emit_method', data)
        }
    }
})
```

### Dynamic Listeners

<p>If you need consuming events dynamically in runtime, you can use `subscribe` and `unsubscribe` methods in Vue component</p>

``` javascript
this.sockets.subscribe('EVENT_NAME', (data) => {
    this.msg = data.message;
});

this.sockets.unsubscribe('EVENT_NAME');
```

### Vuex Integration
<p>When you set store parameter in installation, `Vue-Socket.io` will start sending events to Vuex store. If you set both prefix for vuex, you can use `actions` and `mutations` at the same time. But, best way to use is just `actions`</p>

``` javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {
        "<MUTATION_PREFIX><EVENT_NAME>"() {
            // do something
        }
    },
    actions: {
        "<ACTION_PREFIX><EVENT_NAME>"() {
            // do something
        }
    }
})
```
