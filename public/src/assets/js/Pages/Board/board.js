$(document).ready(function () {


  // PAGE: freeBoardWrite
  if (s0.exist('#freeBoardWrite')) {

    $(document).ready(function () {
      $('#summernote').summernote({
        height: 400,
      });
    });

  }

  // PAGE: free board detail
  if (s0.exist('#freeBoardDetail')) {

    if (s0.exist('#summernote')) {
      $('#summernote').summernote({
        height: 400,
      });

    }
    console.log('detail page');
  }

});