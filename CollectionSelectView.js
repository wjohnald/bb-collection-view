var CollectionSelectView = CollectionView.extend({

    tagName: "select",

    itemViewConstructor: CollectionOptionView,

    addEmpty: false,

    events: {
        "change":   "onChange"
    },

    initialize: function(options) {
        this.itemViews = [];
        this.itemOptions = {};

        this._parseOptions(options);
        this._bindEvents();

        if (this.addEmpty) {
            this.$el.append(this._createEmpty());
        }

        this.reset();
    },

    render: function() {
        this.$el.html('');
        
        if (this.addEmpty) {
            this.$el.append(this._createEmpty());
        }

        _.each(this.itemViews, function(view) {

            if (this._collectionFilter(view.model)) {
                view.delegateEvents(view.events);
                this.$el.append(view.$el);
            }
        }, this);

        return this;
    },

    onChange: function(event) {
        var val = this.$el.val();

        if (val) {
            this.trigger("change", event, this.$el.val());
        }
    },

    _parseOptions: function(options) {
        CollectionView.prototype._parseOptions.call(this, options);

        if (options.addEmpty) {
            this.addEmpty = options.addEmpty;
        }
    },

    _createEmpty: function() {
        var $empty = $('<option />');
        $empty.val('');
        $empty.html('Select One');

        return $empty;
    }

});
