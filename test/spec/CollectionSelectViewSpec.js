describe("CollectionSelectView", function() {
    // var TestCollection = Backbone.Collection.extend({
    //     model: Backbone.Model
    // });
    // var collection;
    // var collectionView;

    // beforeEach(function() {
    //     collection = new TestCollection();
    //     collectionView = new CollectionSelectView({
    //         collection: collection,
    //         itemOptions: {
    //             template: _.template("<%= data.name %>")
    //         }
    //     });

    //     collection.reset([
    //         { 
    //             id:         "truth",
    //             name:       "Test item 1",
    //             selected:   "1"
    //         }
    //     ]);
    // });

    // it("should render collections", function() {
    //     collectionView.render();
    //     expect(collectionView.$el.html().length > 0).toBe(true);
    // });

    // it("should be able to create subviews", function() {
    //     var view = collectionView.createSubView( new Backbone.Model({ name: "New Model" }));
    //     view.render();
    //     expect(view.$el.html()).toBe("New Model");
    // });

    // it("should call add when adding items to the collection", function() {
    //     collection.add(new Backbone.Model({ name: "new super model " }));
    //     expect(collectionView.subViews.length == collection.length).toBe(true);
    // });

    // it("should call remove when removing items remove the collection", function() {
    //     var model = collection.pop();
    //     expect(collectionView.subViews.length == collection.length).toBe(true);
    // });

    // it("should render when the collection is reset", function() {
    //     spyOn(collectionView, "addAll");
    //     collection.reset();
    //     expect(collectionView.addAll).toHaveBeenCalled();
    // });

    // it("should report the currently selected value", function() {
    //     expect(collectionView.getValue()).toBe("truth");
    // });
});
