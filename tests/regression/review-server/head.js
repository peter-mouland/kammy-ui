module.exports = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Regression Test Review</title>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/foundation/6.2.0/foundation.css" rel="stylesheet">
  <style>
    h1 {color:#2199e8}
    .image-container { position:relative ; }
    .image-container .svg-tick { position: absolute; top: 0; left: 0; }
    .circ {
        opacity: 0;
        stroke-dasharray: 130;
        stroke-dashoffset: 130;
        transition: all 1s;
    }
    .tick{
        stroke-dasharray: 50;
        stroke-dashoffset: 50;
        transition: stroke-dashoffset 1s 0.5s ease-out;
    }
    .matched .path,
    .chosen .path{
        opacity: 1;
        stroke-dashoffset: 0;
    }  
    .overlay-container{
      position:relative;
    }
    .overlay-block {
      display:none;
      position: absolute;
      top: 24px;
      max-width: 100%;
      background-color: white;
      background-image: linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc), 
                        linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc);
      background-size: 10px 10px;
      background-position: 0 0, 5px 5px;
      transform: translateZ(0);
      backface-visibility: hidden;
    }
    .overlay-compare  {
      border-right: 1px solid rgba(0, 0, 0, 0.2);
    }
    .overlay-compare img {
         max-width: none;
    }
    .overlay-handle.draggable {
        background-color: #445b7c;
    }
    .overlay-handle {
        position: absolute;
        height: 24px;
        width: 24px;
        left: 50%;
        top: 100%;
        margin-left: -12px;
        margin-top: -12px;
        border-radius: 50%;
        cursor: move;
        box-shadow: 0 0 0 6px rgba(0, 0, 0, 0.2), 0 0 10px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3);
        opacity: 0;
        -webkit-transform: translate3d(0, 0, 0) scale(0);
        -moz-transform: translate3d(0, 0, 0) scale(0);
        -ms-transform: translate3d(0, 0, 0) scale(0);
        -o-transform: translate3d(0, 0, 0) scale(0);
        transform: translate3d(0, 0, 0) scale(0);
    }
    .overlay-compare{
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 0;
      overflow: hidden;
      
    background-color: white;
    background-image: 
    linear-gradient(45deg, #999 25%, transparent 25%, transparent 75%, #999 75%, #999), 
      linear-gradient(45deg, #999 25%, transparent 25%, transparent 75%, #999 75%, #999);
    background-size:10px 10px;
    background-position: 0 0, 5px 5px;
      
      /* Force Hardware Acceleration in WebKit */
      transform: translateZ(0);
      backface-visibility: hidden;
    }
    .overlay .overlay-block{
      display:block;
    }
    .overlay .overlay-compare {
     max-width: none;
      width: 50%;
      /* bounce in animation of the modified image */
      animation: cd-bounce-in 0.7s;
    }
    .overlay .overlay-handle {
        opacity: 1;
        -webkit-transform: translate3d(0, 0, 0) scale(1);
        -moz-transform: translate3d(0, 0, 0) scale(1);
        -ms-transform: translate3d(0, 0, 0) scale(1);
        -o-transform: translate3d(0, 0, 0) scale(1);
        transform: translate3d(0, 0, 0) scale(1);
        -webkit-transition: -webkit-transform 0.3s 0.7s, opacity 0s 0.7s;
        -moz-transition: -moz-transform 0.3s 0.7s, opacity 0s 0.7s;
        transition: transform 0.3s 0.7s, opacity 0s 0.7s;
    }
    @keyframes cd-bounce-in {
      0% {
        width: 0;
      }
      60% {
        width: 55%;
      }
      100% {
        width: 50%;
      }
    }
    
  </style>
</head>
<body>
<div class="row expanded">
  <h1 class="columns small-12">Regression Testing Review</h1>
</div>`;
