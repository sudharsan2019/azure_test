   
function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}
(function( $ ){
     $.fn.multipleInput_replyto = function() {
          return this.each(function() {
               // list of email addresses as unordered list
               $list = $('<ul/>');
               // input
               var $input = $('<input type="email"  placeholder="Type Here" id="email_search" class="email_search multiemail"/>').keyup(function(event) { 
                    if(event.which == 13 || event.which == 32 || event.which == 188) {                        
                         if(event.which==188){
                           var val = $(this).val().slice(0, -1);// remove space/comma from value
                         }
                         else{
                         var val = $(this).val(); // key press is space or comma                        
                         }                         
                         if(validateEmail(val)){
                         // append to list of emails with remove button
                         $list.append($('<li class="multipleInput-email"><span>' + val + '</span></li>')
                              .append($('<a href="#" class="multipleInput-close" title="Remove"><i class="fa fa-close"></i></a>')
                                   .click(function(e) {
                                        $(this).parent().remove();
                                        e.preventDefault();
                                   })
                              )
                         );
                         $(this).attr('placeholder', '');
                         // empty input
                         $(this).val('');
                          }
                          else{
                            alert('Please enter valid email id');
                          }
                    }
               });
               // container div
               var $container = $('<div class="multipleInput-container" />').click(function() {
                    $input.focus();
               });
               // insert elements into DOM
               $container.append($list).append($input).insertAfter($(this));
               return $(this).hide();
          });
     };
})( jQuery );


(function( $ ){
     $.fn.multipleInput1_replycc = function() {
          return this.each(function() {
               // list of email addresses as unordered list
               $list1 = $('<ul/>');
               // input
               var $input = $('<input type="email" placeholder="Type Here" id="email_search" class="email_search multiemail"/>').keyup(function(event) { 
                    if(event.which == 13 || event.which == 32 || event.which == 188) {                        
                         if(event.which==188){
                           var val = $(this).val().slice(0, -1);// remove space/comma from value
                         }
                         else{
                         var val = $(this).val(); // key press is space or comma                        
                         }                         
                         if(validateEmail(val)){
                         // append to list of emails with remove button
                         $list1.append($('<li class="multipleInput-email"><span>' + val + '</span></li>')
                              .append($('<a href="#" class="multipleInput-close" title="Remove"><i class="fa fa-close"></i></a>')
                                   .click(function(e) {
                                        $(this).parent().remove();
                                        e.preventDefault();
                                   })
                              )
                         );
                         $(this).attr('placeholder', '');
                         // empty input
                         $(this).val('');
                          }
                          else{
                            alert('Please enter valid email id');
                          }
                    }
               });
               // container div
               var $container = $('<div class="multipleInput-container" />').click(function() {
                    $input.focus();
               });
               // insert elements into DOM
               $container.append($list1).append($input).insertAfter($(this));
               return $(this).hide();
          });
     };
})( jQuery );


(function( $ ){
     $.fn.multipleInput_replyallto = function() {
          return this.each(function() {
               // list of email addresses as unordered list
               $list2 = $('<ul/>');
               // input
               var $input = $('<input type="email" placeholder="Type Here" id="email_search" class="email_search multiemail"/>').keyup(function(event) { 
                    if(event.which == 13 || event.which == 32 || event.which == 188) {                        
                         if(event.which==188){
                           var val = $(this).val().slice(0, -1);// remove space/comma from value
                         }
                         else{
                         var val = $(this).val(); // key press is space or comma                        
                         }                         
                         if(validateEmail(val)){
                         // append to list of emails with remove button
                         $list2.append($('<li class="multipleInput-email"><span>' + val + '</span></li>')
                              .append($('<a href="#" class="multipleInput-close" title="Remove"><i class="fa fa-close"></i></a>')
                                   .click(function(e) {
                                        $(this).parent().remove();
                                        e.preventDefault();
                                   })
                              )
                         );
                         $(this).attr('placeholder', '');
                         // empty input
                         $(this).val('');
                          }
                          else{
                            alert('Please enter valid email id');
                          }
                    }
               });
               // container div
               var $container = $('<div class="multipleInput-container" />').click(function() {
                    $input.focus();
               });
               // insert elements into DOM
               $container.append($list2).append($input).insertAfter($(this));
               return $(this).hide();
          });
     };
})( jQuery );


(function( $ ){
     $.fn.multipleInput1_replyallcc = function() {
          return this.each(function() {
               // list of email addresses as unordered list
               $list3 = $('<ul/>');
               // input
               var $input = $('<input type="email" placeholder="Type Here" id="email_search" class="email_search multiemail"/>').keyup(function(event) { 
                    if(event.which == 13 || event.which == 32 || event.which == 188) {                        
                         if(event.which==188){
                           var val = $(this).val().slice(0, -1);// remove space/comma from value
                         }
                         else{
                         var val = $(this).val(); // key press is space or comma                        
                         }                         
                         if(validateEmail(val)){
                         // append to list of emails with remove button
                         $list3.append($('<li class="multipleInput-email"><span>' + val + '</span></li>')
                              .append($('<a href="#" class="multipleInput-close" title="Remove"><i class="fa fa-close"></i></a>')
                                   .click(function(e) {
                                        $(this).parent().remove();
                                        e.preventDefault();
                                   })
                              )
                         );
                         $(this).attr('placeholder', '');
                         // empty input
                         $(this).val('');
                          }
                          else{
                            alert('Please enter valid email id');
                          }
                    }
               });
               // container div
               var $container = $('<div class="multipleInput-container" />').click(function() {
                    $input.focus();
               });
               // insert elements into DOM
               $container.append($list3).append($input).insertAfter($(this));
               return $(this).hide();
          });
     };
})( jQuery );



$('#reply_to').multipleInput_replyto();
$('#reply_cc').multipleInput1_replycc();

$('#replyall_to').multipleInput_replyallto();
$('#replyall_cc').multipleInput1_replyallcc();