# Design Notes

## Purpose of Application

The purpose of JsonTx is to create an easy to use tool for manipulation,
presentation, data extraction and filtering of JSON Data that is convenient
to use.

A rough list of features that are desired in the final application is as follows:

* Copy a JSON object block/array block as a JSON string
* Copy a JSON element's path or key
* Copy a JSON element's value (excluding just objects and arrays)
* Insert JSON elements in blocks
* Filter JSON Elements by, name, value, type, etc. and be able to copy them.
* Infer the presentation method of the content by examining the structure
  (dataset, small set, dictionary, markdown and so on)


## Deletion of nodes

* Deletion can be done by clicking on an object and then pressing the delete
  button on the context menu, or by pressing the delete button on the keyboard.
* If the root node is selected along with others for deletion, the root node
  will not be deleted.
* Parents will be deleted before their children in the logic. Missing elements
  will be omitted along with them.

## Metadict

* The metadict contains information that is specific to JsonTx about how to
  present, filter, or do anything with the JSON Data.
* The metadict is stored separately from the JSON Data.