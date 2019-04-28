export default {

    /**
     * Assign runtime callbacks
     */
    beforeCreate(){
        if(!this.sockets) this.sockets = {};

        this.sockets.subscribe = (event, callback) => {
            this.$vueStompWebSocket.emitter.addListener(event, callback, this);
        };

        this.sockets.unsubscribe = (event) => {
            this.$vueStompWebSocket.emitter.removeListener(event, this);
        };
    },

    /**
     * Register all socket events
     */
    mounted(){
        if(this.$options.sockets){
            Object.keys(this.$options.sockets).forEach(event => {
                this.$vueStompWebSocket.emitter.addListener(event, this.$options.sockets[event], this);
            });
        }
    },

    /**
     * Unsubscribe when component unmounting
     */
    beforeDestroy(){
        if(this.$options.sockets){
            Object.keys(this.$options.sockets).forEach(event => {
                this.$vueStompWebSocket.emitter.removeListener(event, this);
            });
        }
    }
}
