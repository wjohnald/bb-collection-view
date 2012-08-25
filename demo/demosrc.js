var ControlPanel = Backbone.View.extend({

  events: {
    "change [data-sort-control]":   "sort",
    "change [data-filter-control]": "filter"
  },

  initialize: function(options) {
    this.collectionViews = options.collectionViews;
  },

  sort: function(event) {
    var val = $(event.target).val();

    if (val) {
      _.each(this.collectionViews, function(collectionView) {
        collectionView.setSortKey(val);
      });
    }

    return false;
  },
  
  filter: function(event) {
    var val = $(event.target).val();

    if (val) {
      _.each(this.collectionViews, function(collectionView) {
        collectionView.setFilter(function(item) {
          return item.get('name') == val;
        });
      });
    } else {
      _.each(this.collectionViews, function(collectionView) {
        collectionView.setFilter(function(item) {
          return true;
        });
      });
    }

    return false;
  }

});

var CreateView = Backbone.View.extend({

  events: {
    "submit":   "newItem"
  },

  newItem: function(event) {

    var args = {};

    args.name = this.$('[data-name-input]').val();
    args.id = this.$('[data-id-input]').val();

    this.collection.add(args);

    this.$('[data-name-input]').val('');
    this.$('[data-id-input]').val('');

    return false;
  }

});

var EditView = Backbone.View.extend({
  events: {
    "submit":               "saveItem",
    "click [data-cancel]":  "cancel"
  },

  setModel: function(item) {
    this.model = item;
    this.render();
  },

  saveItem: function(event) {
    if (this.model) {
      this.model.set(this.getArgs());
    }

    event.preventDefault();
    return false;
  },

  cancel: function(event) {

    this.setModel(null);

    event.preventDefault();
    return false;
  },

  render: function() {
    if (this.model) {
      this.$('[data-name-input]').val(this.model.get('name'));
      this.$('[data-id-input]').val(this.model.get('id'));
    } else {
      this.$('[data-name-input]').val('');
      this.$('[data-id-input]').val('');
    }

    return this;
  },

  getArgs: function() {
    var args = {};
    args.name = this.$('[data-name-input]').val();
    args.id = this.$('[data-id-input]').val();

    return args;
  }
});