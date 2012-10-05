describe("CollectionSelectView", function() {

    var data;
    var collection;
    var collectionView;

    function checkSubviewOrder() {
        collection.each(function(item, index) {
            expect(item.cid == collectionView.itemViews[index].model.cid).toBe(true);
        });
    }

    function getItem() {
        return collection.at(0);
    }

    function getViewForItem(item) {
        return _.find(collectionView.itemViews, function(itemView) {
            return itemView.model.cid == item.cid;
        });
    }

    function addItem() {
        var item = new Backbone.Model({ name: "five", id: 5 });
        collection.add(item);

        return item;
    }

    function removeItem() {
        var item = collection.at(0);
        collection.remove(item);

        return item;
    }

    function checkSubviewLengthAgainstCollectionLength() {
        return collection.length == collectionView.itemViews.length;
    }

    function checkSubviewHTMLAgainstCollectionViewHtml() {
        var $wrapper = $('<div />');
        var totalHtml = _.reduce(collectionView.itemViews, function(memo, itemView) {
            $wrapper.empty().append(itemView.$el);
            return memo + $wrapper.html().length;
        }, 0);

        var displayedHtml = collectionView.$el.html().length;

        if (totalHtml < displayedHtml) {
            return -1;
        }

        if (totalHtml > displayedHtml) {
            return 1;
        }

        return 0;
    }

    function checkIfViewExistsForItem(item) {
        return _.reduce(collectionView.itemViews, function(memo, itemView) {
            return (itemView.model.cid == item.cid) || memo;
        }, false);
    }

    function checkDOMEvents() {
        var subView = collectionView.itemViews[0];

        collectionView.on("click", function(event, item, col) {
            expect(event.type == "click").toBe(true);
            expect(subView.model.cid == item.cid).toBe(true);
            expect(collection.cid == col.cid).toBe(true);
        });

        subView.$el.trigger("click");
    }

    beforeEach(function() {

        data = [
          {
            name: "four",
            id: 4
          },
          {
            name: "two",
            id: 2
          },
          {
            name: "one",
            id: 1
          },
          {
            name: "three",
            id: 3
          }
        ];

        collection = new Backbone.Collection(data);

        collectionView = new Backbone.CollectionSelectView({
            collection: collection
        });

    });

    // Verifies CollectionView.initialize();
    // Verifies CollectionView.reset();
    it("should automatically render the existing contents of the collection", function() {
        expect(checkSubviewLengthAgainstCollectionLength()).toBe(true);
        collection.each(function(item) {
            expect(checkIfViewExistsForItem(item)).toBe(true);
        });
        checkSubviewOrder();
    });

    // Verifies CollectionView.add();
    // Verifies bound event: "add"
    it("should add a new subview when an item is added to the collection", function() {
        var item = addItem();
        expect(checkSubviewLengthAgainstCollectionLength()).toBe(true);
        expect(checkIfViewExistsForItem(item)).toBe(true);
    });

    // Verifies CollectionView.remove();
    // Verifies bound event: "remove"
    it("should remove the corresponding subview when an item is removed from the collection", function() {
        var item = removeItem();
        expect(checkSubviewLengthAgainstCollectionLength()).toBe(true);
        expect(checkIfViewExistsForItem(item)).toBe(false);
    });

    // Verifies bound event: "reset"
    it("should recreate all subviews when resetting the collection", function() {
        spyOn(collectionView, "reset");
        collection.reset(data);
        expect(collectionView.reset).toHaveBeenCalled();
    });

    // Verifies CollectionView.setFilter();
    it("should filter the view when filtering the collection", function() {
        collectionView.setFilter(function(item) {
            return item.get('id') == 4;
        });
        expect(checkSubviewLengthAgainstCollectionLength()).toBe(true);
        expect(checkSubviewHTMLAgainstCollectionViewHtml()).toBe(1);
    });

    // Verifies CollectionView.setSortKey();
    it("should sort the collection when setting a new sortKey", function() {
        spyOn(collection, "sort");
        collectionView.setSortKey("id");
        expect(collection.sort).toHaveBeenCalled();
    });

    it("should sort the view when sorting the collection", function() {
        collectionView.setSortKey("id");
        checkSubviewOrder();
    });

    // Verifies bound event: "change:<sort key>"
    it("should re-sort the collection when an item's sort key has been changed", function() {
        collectionView.setSortKey("id");
        var item = getItem();
        spyOn(collection, "sort");
        item.set({ id: "7" });
        expect(collection.sort).toHaveBeenCalled();
    });

    it("should post a click event with the DOM event, item, and collection when a subview is clicked", function() {
        checkDOMEvents();
    });

    it("should maintain DOM event listeners after a hard reset", function() {
        collectionView.reset();
        checkDOMEvents();
    });

    it("should maintain DOM event listeners after a manual render", function() {
        collectionView.render();
        checkDOMEvents();
    });

    // Add drop-down specific changes
    it("should post a change event with the value when a new option is selected", function() {
        collectionView.on("change", function(event, val) {
            expect(event.type).toBe("change");
            expect(val).toBe('3');
        });
        collectionView.$el.val('3');
        collectionView.$el.trigger("change");
    });

    it("should post a click event with the item and collection when a new option is selected", function() {
        var modelView = collectionView.itemViews[0];
        var model = modelView.model;

        collectionView.on("click", function(event, item, col) {
            expect(event.type).toBe("click");
            expect(item.cid).toBe(model.cid);
            expect(col.cid).toBe(collection.cid);
        });

        collectionView.$el.val(model.get('id'));
        collectionView.$el.trigger("change");
    });

    it("should display a null item first when addEmpty is true", function() {
        collectionView = new Backbone.CollectionSelectView({
            collection: collection,
            addEmpty: "Select an item"
        });

        var $emptyItem = $(collectionView.$('option')[0]);

        expect($emptyItem.val()).toBe("");
        expect($emptyItem.html()).toBe("Select an item");
    });

    it("should be able to handle item with multiple word values", function() {
        var item = new Backbone.Model({
            name: "North America",
            id: "North America"
        });
        collection.add(item);

        collectionView.on("click", function(event, i) {
            expect(i.cid).toBe(item.cid);
        });

        var itemView = getViewForItem(item);
        itemView.$el.trigger("click");
    });

});
