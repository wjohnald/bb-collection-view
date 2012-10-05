describe("CollectionItemView", function() {

    var data;
    var model;
    var itemView;

    beforeEach(function() {
        data = {
            name: "one",
            id: "1"
        };

        model = new Backbone.Model(data);

        itemView = new Backbone.CollectionItemView({
            model: model
        });
    });

    // Verifies bound event: change
    it("should render when the model has changed", function() {
        spyOn(itemView, "render");
        model.set({ id: "2" });
        expect(itemView.render).toHaveBeenCalled();
    });

    it("should render a default template if none has been supplied", function() {
        expect(itemView.$el.html().length > 0).toBe(true);
    });

    it("should post a click event with the event and the item when the $el has been clicked", function() {
        itemView.on("click", function(event, item) {
            expect(event.type == "click").toBe(true);
            expect(item.cid == model.cid).toBe(true);
        });

        itemView.$el.trigger("click");
    });

});
