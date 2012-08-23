bb-collection-view
==================

Why?
====

Backbonejs (http://backbonejs.org) Collections will more often than not require an automatically updating view to reflect their current state. *bb-collection-view* provides a light-weight, unobtrusive, and flexible solution to this issue. It contains classes for a standard list and drop-down menu. The template for the standard list is overridable. When an item is clicked, these classes post a click event containing the model of the selected view. The drop-down menu additionally posts a change event with the new value of the menu.

These classes require almost 0 code on the part of the developer. The most that you might want to do is provide a different item template function. This is as simple as passing an option. If you do desire extra functionality, simply extend these views to meet your requirements.

Dependencies
============

* jQuery or Zepto
* Underscorejs or Lodash
* Backbonejs

Usage
=====

The demos included in this package provide a pretty thorough use-case. Simply create a new view and assign a collection to it. Append the CollectionView's el to the document, and it will work out of the box automatically!

