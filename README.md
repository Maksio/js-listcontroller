# ListController
Simple class to manipulate lists (arrays) of objects in JavaScript

##Usage
<p>To use this class just include the file using &lt;script&gt; tag. </p>
<code>&lt;script src="/assets/js/list-controller-1.1.0.js"&gt;&lt;/script&gt;</code>
<p>All comments in file placed in Russian.</p>
Use **ListController** variable to access functions:

### Get item(s) from list by id
<code>ListController.getItemById(list, itemId, fieldName, inverseSelection, getAllMatches)</code>

<p>Returns first item matching to params:</p>

* list - array of objects.
* itemId - item id value.
* fieldName - optional name of object's property containing id value. By default is "id".
* inverseSelection - optional. If set will get item excluding  "fieldName = itemId" matches.
* getAllMatches - optional. If set will return all matching items.

### Delete item
<code>ListController.deleteItem: function (list, item, fieldName)</code>

<p>Delete item from list with comparing "fieldName" values. First match will be deleted.</p>

<code>ListController.deleteItemId(list, itemId, fieldName)</code>

<p>Delete first item from list where item's "fieldName" = "itemId" value. If "fieldName" not set "id" used.</p>

### Move item in sorted array
<code>ListController.moveItem(list, item, stepBy, sortField)</code>
<p>In sorted <code>list</code> moves <code>item</code> with "stepBy" steps. <code>sortField</code> is name of sort order field.</p>

<code>ListController.moveItemTo(list, item, index, sortField)</code>
<p>Moves item to "index" position in the list.</p>

### Numerate array elements
<code>ListController.normalize(list, sortField)</code>
<p>Numerate elements from 0 to N-1 in element's "sortField".</p>

### Remove fields from elements of array
<code>ListController.removeFields(list, fields)</code>
<p>Remove each field from <code>fields</code> array from the eachobject of the list;</p>

