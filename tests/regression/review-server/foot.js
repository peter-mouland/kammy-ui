const tick = require('./tick');

const container = children => `<div class="row expanded"><p class="matched columns small-12">${children}</p></div>`;

module.exports = `
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.js"></script>
  <script>
    $(function(){
      $('.choices').on('click', 'button', function(ev) {
        var $button = $(this);
        var $row = $button.closest('.choices')
        var file = $row.data('file')
        var image = $button.data('image')
        var isBase = image.toLowerCase().indexOf('base') > -1;
        $.post('/choose-image', { file: file, image: image })
          .then(function(done) {
            if (done === 'done' && !isBase) {
              $row.html('${container(`<strong>' + file + '</strong> matched! ${tick.replace(/\n/g, '')}`)}');
            }
          })
      });
      $('.choices').each(function(){
        var actual = $(this);
        const block = actual.find('.overlay-block');
        const deltaImg = actual.find('.delta-image img');
        const compareImg = actual.find('.overlay-compare img');
        block.width(deltaImg.width())
        compareImg.width(deltaImg.width())
        drags(actual.find('.overlay-handle'), actual.find('.overlay-compare'), block);
      });
      $('.choices').on('click', '[data-delta]', function(e){
              $(e.target).parents('.choices').get(0).classList.remove('overlay')
      });
      $('.choices').on('click', '[data-overlay]', function(e){
        const fileName = e.currentTarget.getAttribute('data-overlay-fileName');
        const baseSelector = 'a[href="/screenshots/base/' + fileName +'"]'
        const newSelector = 'a[href="/screenshots/new/' + fileName +'"]'
        const baseEl = document.querySelector(baseSelector);
        const newEl = document.querySelector(newSelector);
        $(e.target).parents('.choices').get(0).classList.add('overlay')
            console.log(baseEl)
            console.log(newEl)
      });
      
      
      //draggable funtionality - credits to http://css-tricks.com/snippets/jquery/draggable-without-jquery-ui/
      function drags(dragElement, resizeElement, container) {
          dragElement.on("mousedown vmousedown", function(e) {
              dragElement.addClass('draggable');
              resizeElement.addClass('resizable');
       
              var dragWidth = dragElement.outerWidth(),
                  xPosition = dragElement.offset().left + dragWidth - e.pageX,
                  containerOffset = container.offset().left,
                  containerWidth = container.outerWidth(),
                  minLeft = containerOffset - 22,
                  maxLeft = containerOffset + containerWidth - dragWidth + 22;
              
              dragElement.parents('.overlay-block').on("mousemove vmousemove", function(e) {
                  let leftValue = e.pageX + xPosition - dragWidth ;
                  
                  //constrain the draggable element to move inside its container
                  if(leftValue < minLeft ) {
                      leftValue = minLeft;
                  } else if ( leftValue > maxLeft) {
                      leftValue = maxLeft;
                  }
       
                  const widthValue = (leftValue + dragWidth/2 - containerOffset)*100/containerWidth+'%';
                  
                  $('.draggable').css('left', widthValue).on("mouseup vmouseup", function() {
                      $(this).removeClass('draggable');
                      resizeElement.removeClass('resizable');
                  });
       
                  $('.resizable').css('width', widthValue); 
                         
              }).on("mouseup vmouseup", function(e){
                  dragElement.removeClass('draggable');
                  resizeElement.removeClass('resizable');
              });
              e.preventDefault();
          }).on("mouseup vmouseup", function(e) {
              dragElement.removeClass('draggable');
              resizeElement.removeClass('resizable');
          });
      }
      
    })
  </script>
`;
