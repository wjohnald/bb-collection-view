/*
 *  OPINIONS
 *
 *  1) Collection should render automatically
 *  2) Sub-views should be rendered once on creation unless manually re-rendered
 *  3) CollectionView should not need to be manually re-rendered except for rare cases
 *
 *  Dependencies:
 *   - CollectionItemView
 *
 */

var CollectionView = Backbone.View.extend({

    tagName: "ul",

    itemViewConstructor: CollectionItemView,

    itemViews: null,

    itemOptions: null,

    sortKey: null,

    initialize: function(options) {
        this.itemViews = [];
        this.itemOptions = {};

        this._parseOptions(options);
        this._bindEvents();

        this.reset();
    },

    // This function will be called manually by the user
    // It will obliterate the current el. When adding sub-views
    // back to the DOM, it will be necessary to delegateEvents
    // again. Event delegation will be up to the item view.
    render: function() {
        this.$el.html('');

        _.each(this.itemViews, function(view) {

            if (this._collectionFilter(view.model)) {
                view.delegateEvents(view.events);
                this.$el.append(view.$el);
            }
        }, this);

        return this;
    },

    // This will be bound to the collection's add event
    add: function(item, options) {
        var view = this._createItemView(item);

        options = _.defaults(options || {}, {
            index: false
        });

        if (options && options.index && (options.index < this.itemViews.length)) {
            
            var pivotView = this.itemViews[options.index];
            this.itemViews.splice(options.index, 0, view);

            if (this._collectionFilter(item)) {
                pivotView.$el.before(view.$el);
            }
            
        } else {

            this.itemViews.push(view);

            if (this._collectionFilter(item)) {
                this.$el.append(view.$el);
            }

        }
    },

    // This will be bound to the collection's remove event
    remove: function(item, options) {
        var viewIndex = -1;
        view = _.find(this.itemViews, function(view, index) {
            if (item.cid == view.model.cid) {
                viewIndex = index;

                return true;
            }
        });

        view.remove();
        this.itemViews.splice(viewIndex, 1);
    },

    // This will be bound to the collection's reset event
    //  "reset" is posted from the following:
    //      1) Collection is reset
    //      2) Collection is fetched
    //      3) Collection is sorted
    //
    reset: function(options) {
        _.each(this.itemViews, function(view) {
            view.remove();
        });
        this.itemViews = [];

        this.collection.each(function(item) {
            this.add(item);
        }, this);
    },

    setSortKey: function(sortKey, comparator) {

        if (this.sortKey) {
            this.collection.off("change:" + this.sortKey);
        }

        this.sortKey = sortKey;

        if (comparator) {
            this.collection.comparator = comparator;
        } else {
            this.collection.comparator = function(item1, item2) {
                return item1.get(sortKey) > item2.get(sortKey);
            };
        }

        this.collection.on("change:" + this.sortKey, function() {
            this.collection.sort();
        }, this);

        this.collection.sort();
    },

    setFilter: function(filter) {
        this._collectionFilter = filter;
        this.render();
    },

    _collectionFilter: function(item) {
        return true;
    },

    // It will be possible to override
    // many options with configuration
    // variables rather than subclasses.
    // This allows for faster productivity
    _parseOptions: function(options) {

        if (options.itemViewConstructor) {
            this.itemViewConstructor = options.itemViewConstructor();
        }

        if (options.itemOptions) {
            this.itemOptions = options.itemOptions;
        }

    },

    _createItemView: function(item) {
        var view = new this.itemViewConstructor({
            model: item
        });

        view.on("click", function(event, item) {
            this.trigger("click", event, item, this.collection);
        }, this);

        return view;
    },

    _bindEvents: function() {
        this.collection.on("add", function(model, collection, options) {
            this.add(model, options);
        }, this);

        this.collection.on("remove", function(model, collection, options) {
            this.remove(model, options);
        }, this);

        this.collection.on("reset", function(collection, options) {
            this.reset(options);
        }, this);
    }

});
