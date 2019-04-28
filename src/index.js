import Mixin from './mixin';
import Logger from './logger';
import Listener from './listener';
import Emitter from './emitter';
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

export default class VueStompWebSocket {

    /**
     * Initialize all resources
     * @param io
     * @param vuex
     * @param debug
     * @param options
     */
    constructor({connection, vuex, debug, options}){
        Logger.debug = debug;
        this.stompClient = this.connect(connection, options);
        this.emitter = new Emitter(vuex);
        this.listener = new Listener(this.stompClient, this.emitter);
    }

    /**
     * Vue.js entry point
     * @param Vue
     */
    install(Vue){
        Vue.prototype.$socket = this.stompClient;
        Vue.prototype.$vueStompWebSocket = this;
        Vue.mixin(Mixin);

        Logger.info('Vue-stomp-websocket plugin enabled');
    }

    /**
     * Register Stomp client
     * @param connection
     * @param options
     */
    connect(connection, options){
        if(typeof connection === 'string'){
            Logger.info('Received connection string');
            let socket = new SockJS(connection, null, options);
            return this.stompClient = Stomp.over(socket);
        } else {
            throw new Error('Unsupported connection type');
        }
    }
}
