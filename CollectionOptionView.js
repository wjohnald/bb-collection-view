var CollectionOptionView = CollectionItemView.extend({

    tagName: "option",

    valueField: "id",

    labelField: "name",

    render: function() {
        this.$el.val(this.model.get(this.valueField));
        this.$el.html(this.model.get(this.labelField));

        return this;
    }
    
});
