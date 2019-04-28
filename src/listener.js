
export default class VueStompWebSocketListener {

    /**
     * socket.io-client reserved event keywords
     * @type {string[]}
     */
    static staticEvents = [
            'connect',
            'error',
            'disconnect',
            'reconnect',
            'reconnect_attempt',
            'reconnecting',
            'reconnect_error',
            'reconnect_failed',
            'connect_error',
            'connect_timeout',
            'connecting',
            'ping',
            'pong'
    ];

    constructor(stompClient, emitter){
        this.stompClient = stompClient;
        this.register();
        this.emitter = emitter;
    }

    /**
     * Listening all STOMP events
     */
    register(){
        this.stompClient.onevent = (packet) => {
            let [event, ...args] = packet.data;

            if(args.length === 1) args = args[0];

            this.onEvent(event, args)
        };

        VueStompWebSocketListener.staticEvents.forEach(event => this.stompClient.on(event, args => this.onEvent(event, args)))
    }

    /**
     * Broadcast all events to vue.js environment
     */
    onEvent(event, args){
        this.emitter.emit(event, args);
    }

}
