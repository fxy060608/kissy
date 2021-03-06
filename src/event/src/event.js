/**
 * @ignore
 * @fileOverview KISSY Scalable Event Framework
 * @author yiminghe@gmail.com
 */
KISSY.add('event', function (S, _data, KeyCodes, Event, Target, Object) {
    S.mix(Event,
        /**
         * @override KISSY.Event
         * @class KISSY.Event.EventMod
         * @singleton
         */
        {
            KeyCodes:KeyCodes,
            Target:Target,
            Object:Object,
            /**
             * Same with {@link KISSY.Event#add}
             * @method
             * @member KISSY.Event
             */
            on:Event.add,
            /**
             * Same with {@link KISSY.Event#remove}
             * @method
             * @member KISSY.Event
             */
            detach:Event.remove,
            /**
             * Delegate event.
             * @param targets KISSY selector             *
             * @param {String|Function} selector filter selector string or function to find right element
             * @param {String} [eventType] The type of event to delegate.
             * use space to separate multiple event types.
             * @param {Function} [fn] The event handler/listener.
             * @param {Object} [scope] The scope (this reference) in which the handler function is executed.
             * @member KISSY.Event
             */
            delegate:function (targets, eventType, selector, fn, scope) {
                return Event.add(targets, eventType, {
                    fn:fn,
                    scope:scope,
                    selector:selector
                });
            },
            /**
             * undelegate event.
             * @param targets KISSY selector
             * @param {String} [eventType] The type of event to undelegate.
             * use space to separate multiple event types.
             * @param {String|Function} [selector] filter selector string or function to find right element
             * @param {Function} [fn] The event handler/listener.
             * @param {Object} [scope] The scope (this reference) in which the handler function is executed.
             * @member KISSY.Event
             */
            undelegate:function (targets, eventType, selector, fn, scope) {
                return Event.remove(targets, eventType, {
                    fn:fn,
                    scope:scope,
                    selector:selector
                });
            }
        });

    S.mix(Event, _data);

    S.mix(S, {
        Event:Event,
        EventTarget:Event.Target,
        EventObject:Event.Object
    });

    return Event;
}, {
    requires:[
        'event/data',
        'event/key-codes',
        'event/base',
        'event/target',
        'event/object',
        'event/focusin',
        'event/hashchange',
        'event/valuechange',
        'event/mouseenter',
        'event/submit',
        'event/change',
        'event/mousewheel',
        'event/add',
        'event/remove'
    ]
});

/*
   2012-02-12 yiminghe@gmail.com note:
    - 普通 remove() 不管 selector 都会查，如果 fn scope 相等就移除
    - undelegate() selector 为 ''，那么去除所有委托绑定的 handler
 */