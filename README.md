# ListController
Simple class to manipulate lists (arrays) of objects in JavaScript

##Usage
To use this class just include the file using &lt;script&gt; tag. All comments in file placed in Russian.
Use ListController variable to access functions:

<code>ListController.getItemById(list, itemId, fieldName, inverseSelection, getAllMatches)</code>

Returns first item matching to params:

list - array of objects.
itemId - item id value.
fieldName - name of object's property containing id value. By default is "id".
inverseSelection - get item excluding  "fieldName = itemId" value.
getAllMatches - return all matching items.

<code>ListController.deleteItem: function (list, item, fieldName)</code>

Delete item from list with comparing "fieldName" values. First match will be deleted.

<code>ListController.deleteItemId(list, itemId, fieldName)</code>

Delete first item from list where item's "fieldName" = "itemId" value. If "fieldName" not set "id" used.

<code>ListController.moveItem(list, item, stepBy, sortField)</code>
In sorted <code>list</code> moves <code>item</code> with "stepBy" steps. <code>sortField</code> is name of sort order field.

<code>ListController.moveItemTo(list, item, index, sortField)</code>
Moves item to "index" position in the list.

<code>ListController.normalize(list, sortField)</code>
Numerate elements from 0 to N-1 in element's "sortField".

<code>ListController.removeFields(list, fields)</code>
Remove each field from <code>fields</code> array from the eachobject of the list;

