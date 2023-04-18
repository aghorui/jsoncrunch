# Design Notes

## Purpose of Application

The purpose of JsonTx is to create an easy to use tool for manipulation,
presentation, data extraction and filtering of JSON Data that is convenient
to use.

A rough list of features that are desired in the final application is as
follows:

* Copy a JSON object block/array block as a JSON string
* Copy a JSON element's path or key
* Copy a JSON element's value (excluding just objects and arrays)
* Insert JSON elements in blocks
* Filter JSON Elements by, name, value, type, etc. and be able to copy them.
* Infer the presentation method of the content by examining the structure
  (dataset, small set, dictionary, markdown and so on)
* Store all performed transformations of data and be able to undo them.


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

## Supplying JSON to program

* JSON input is supplied to the program through the Text input tab of the main
  screen.
* Supplied JSON input should be parseable by Javascript's `JSON.parse(...)`

## Selections and Context Menus

* Storage of the selection information of the JSON elements is done by
  recreating the tree of the input json incrementally as new elements are added
  to the selection, mimicking a radix tree in a way.
* This will look a lot like the metadict, I think.
* To mark that a parent has been selected, an indicator member is used.
* General schema of the selection tree:

  ```ts
  type JsonSelectionNode = { selected: boolean, children: { [id: string]: JsonSelectionNode } }
  type JsonSelection = { count: number, selection?: JsonSelectionNode }
  ```

* Possible foresight: Maybe add the count to `JSONSelectionNode` so its easier
  to recursively determine the count?

