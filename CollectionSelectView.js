/*
 *
 * TODO make a checkbox version
 *
 */

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
        
        // We don't want to add a blank model to the collection
        // because we don't want to interfere with collection data
        //
        // We don't need to do this in reset, because reset will
        // only remove itemViews
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
            this.trigger("change", event, val, this.collection);
            this.$("option[value='" + val + "']").trigger("click");
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
        $empty.html(this.addEmpty);

        return $empty;
    }

});
