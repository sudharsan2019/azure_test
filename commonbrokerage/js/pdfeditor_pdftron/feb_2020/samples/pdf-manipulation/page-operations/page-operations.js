// @link WebViewerInstance: https://www.pdftron.com/api/web/WebViewerInstance.html

// @link DocumentViewer: https://www.pdftron.com/api/web/CoreControls.DocumentViewer.html

// @link Document: https://www.pdftron.com/api/web/CoreControls.Document.html
// @link Document.getPageInfo: https://www.pdftron.com/api/web/CoreControls.Document.html#getPageInfo__anchor
// @link Document.rotatePages: https://www.pdftron.com/api/web/CoreControls.Document.html#rotatePages__anchor
// @link Document.cropPages: https://www.pdftron.com/api/web/CoreControls.Document.html#cropPages__anchor
// @link Document.getPageCount: https://www.pdftron.com/api/web/CoreControls.Document.html#getPageCount__anchor
// @link Document.removePages: https://www.pdftron.com/api/web/CoreControls.Document.html#removePages__anchor
// @link Document.movePages: https://www.pdftron.com/api/web/CoreControls.Document.html#movePages__anchor
// @link Document.insertBlankPages: https://www.pdftron.com/api/web/CoreControls.Document.html#insertBlankPages__anchor

// @link CoreControls: https://www.pdftron.com/api/web/CoreControls.html

// @link partRetriever: https://www.pdftron.com/api/web/PartRetrievers.html

WebViewer(
  {
    path: '../../../lib',
    useDownloader: false,
    initialDoc: '../../../samples/files/demo.pdf',
  },
  document.getElementById('viewer')
).then(function(instance) {
  var docViewer = instance.docViewer;
  var CoreControls = instance.CoreControls;

  docViewer.on('documentLoaded', function() {
    var doc = docViewer.getDocument();

    var editDropdown = document.getElementById('edit');
    var moveFromDropdown = document.getElementById('move-from');
    var moveToDropdown = document.getElementById('move-to');
    var insertAtDropdown = document.getElementById('insert-at');
    var rotateButton = document.getElementById('rotate');
    var cropButton = document.getElementById('crop');
    var deleteButton = document.getElementById('delete');
    var moveButton = document.getElementById('move');
    var insertButton = document.getElementById('insert');
    var filePickerButton = document.getElementById('file-picker');

    // Updates page dropdowns when page count changes
    function updatePages(pageCount) {
      editDropdown.innerHTML = '';
      moveFromDropdown.innerHTML = '';
      moveToDropdown.innerHTML = '';
      insertAtDropdown.innerHTML = '';

      var i;
      var option;
      for (i = 0; i < pageCount; i++) {
        option = document.createElement('option');
        option.innerHTML = i + 1;
        editDropdown.appendChild(option);
        moveFromDropdown.appendChild(option.cloneNode(true));
        moveToDropdown.appendChild(option.cloneNode(true));
        insertAtDropdown.appendChild(option.cloneNode(true));
      }

      var clonedOption = option.cloneNode(true);
      clonedOption.innerHTML = i + 1;
      insertAtDropdown.appendChild(clonedOption);
    }

    rotateButton.onclick = function() {
      // Rotate pages
      doc.rotatePages([Number(editDropdown.value)], CoreControls.PageRotation.e_90);
    };

    cropButton.onclick = function() {
      // Crop pages
      doc.cropPages([Number(editDropdown.value)], 40, 40, 40, 40);
    };

    deleteButton.onclick = function() {
      var newPageCount = doc.getPageCount() - 1;
      // Delete pages
      doc.removePages([Number(editDropdown.value)]);
      updatePages(newPageCount);
    };

    moveButton.onclick = function() {
      var pageFrom = Number(moveFromDropdown.value);
      var pageTo = Number(moveToDropdown.value);
      if (pageFrom < pageTo) {
        pageTo++;
      }

      // Move pages
      doc.movePages([pageFrom], pageTo);
    };

    insertButton.onclick = function() {
      var info = doc.getPageInfo(0);
      var width = info.width;
      var height = info.height;
      var newPageCount = doc.getPageCount() + 1;
      // Insert blank pages
      doc.insertBlankPages([Number(insertAtDropdown.value)], width, height);
      updatePages(newPageCount);
    };

    filePickerButton.onchange = function(e) {
      var file = e.target.files[0];
      CoreControls.createDocument(file, {} /* , license key here */).then(function(newDoc) {
        var pages = [];
        for (var i = 0; i < newDoc.getPageCount(); i++) {
          pages.push(i + 1);
        }
        var newPageCount = doc.getPageCount() + newDoc.getPageCount();
        // Insert (merge) pages
        doc.insertPages(newDoc, pages, doc.getPageCount() + 1);
        updatePages(newPageCount);
      });
    };

    updatePages(doc.getPageCount());
  });
});
