(function() {
    var CollectionItemView = Backbone.View.extend({

        tagName: "ul",

        events: {
            "click":    "onClick"
        },

        initialize: function(options) {
            this._parseOptions(options);
            this._bindEvents();

            this.render();
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },

        template: function(args) {
            var html = "";

            _.each(args, function(value, key) {
                html += "<li><strong>" + key + "</strong>: " + value + "</li>";
            });

            return html + "";
        },

        onClick: function(event) {
            this.trigger("click", event, this.model);
        },

        _parseOptions: function(options) {

            if (options.template) {
                this.template = options.template;
            }

        },

        _bindEvents: function(options) {
            this.model.on("change", function(model) {
                this.render();
            }, this);
        }

    });

    _.extend(Backbone, {
        CollectionItemView: CollectionItemView
    });
})();
