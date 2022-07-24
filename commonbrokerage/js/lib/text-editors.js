$(function(){
  var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    // [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['link', 'image']
    // ['clean']                                         // remove formatting button
  ];


  // var quill = new Quill('#indication_note_editor', {
    
  //   modules: {
  //     toolbar: toolbarOptions,
  //     keyboard: {
  //       bindings: {
  //           tab: false
  //       }
  //     },  
  //   },
  //   theme: 'snow'
  // });

  // var quill = new Quill('#quote_note_editor', {
  //   modules: {
  //     toolbar: toolbarOptions,
  //     keyboard: {
  //       bindings: {
  //           tab: false
  //       }
  //     },
  //   },
  //   theme: 'snow'
  // });


  // var quill = new Quill('#bind_note_editor', {
  //   modules: {
  //     toolbar: toolbarOptions,
  //     keyboard: {
  //       bindings: {
  //           tab: false
  //       }
  //     },
  //   },
  //   theme: 'snow'
  // });

  // var quill = new Quill('#issue_note_editor', {
  //   modules: {
  //     toolbar: toolbarOptions,
  //     keyboard: {
  //       bindings: {
  //           tab: false
  //       }
  //     },
  //   },
  //   theme: 'snow'
  // });


  var quill = new Quill('#editor', {
    modules: {
      toolbar: toolbarOptions,
      keyboard: {
        bindings: {
            tab: false
        }
      },
    },
    theme: 'snow'
  });

  // var quill = new Quill('#editor1', {
  //   modules: {
  //     toolbar: toolbarOptions,
  //     keyboard: {
  //       bindings: {
  //           tab: false
  //       }
  //     },
  //   },
  //   theme: 'snow'
  // });

  var quill = new Quill('.account_note_editor', {
    modules: {
      toolbar: toolbarOptions,
      keyboard: {
        bindings: {
            tab: false
        }
      },
    },
    theme: 'snow'
  });

  // var quill = new Quill('#policy_note_editor', {
  //   modules: {
  //     toolbar: toolbarOptions,
  //     keyboard: {
  //       bindings: {
  //           tab: false
  //       }
  //     },
  //   },
  //   theme: 'snow'
  // });

  var quill = new Quill('.ad_note_editor', {
    modules: {
      toolbar: toolbarOptions,
      keyboard: {
        bindings: {
            tab: false
        }
      },
    },
    theme: 'snow'
  });

  var quill = new Quill('#sideAdNoteDes', {
    modules: {
      toolbar: toolbarOptions,
      keyboard: {
        bindings: {
            tab: false
        }
      },
    },
    tab: 'disabled',
    theme: 'snow'
  });

});
