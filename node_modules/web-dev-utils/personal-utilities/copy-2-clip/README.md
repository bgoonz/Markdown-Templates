# How to Copy to Clipboard text from <code> and <pre> tags using Jquery and JS?




```js

$(document).ready(function() {
  $('code, pre').append('<span class="command-copy" ><i class="fa fa-clipboard" aria-hidden="true"></i></span>');

  $('code span.command-copy').click(function(e) {
    var text = $(this).parent().text().trim(); //.text();
    var copyHex = document.createElement('input');
    copyHex.value = text
    document.body.appendChild(copyHex);
    copyHex.select();
    document.execCommand('copy');
    console.log(copyHex.value)
    document.body.removeChild(copyHex);
  });


  $('pre span.command-copy').click(function(e) {
    var text = $(this).parent().text().trim();
    var copyHex = document.createElement('input');
    copyHex.value = text
    document.body.appendChild(copyHex);
    copyHex.select();
    document.execCommand('copy');
    console.log(copyHex.value)
    document.body.removeChild(copyHex);
  });
})
```




---


```css
code,
pre {
  position: relative;
}

code,
pre {
  display: block;
  padding: 20px;
  background: #f2f2f2;
  color: #555755;
}

span.command-copy {
  position: absolute;
  top: 10px;
  right: 10px;
  opacity: .6;
  font-size: 20px;
  color: #555755;
}

span.command-copy:hover {
  cursor: pointer;
}

```




```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    
    <!--------------------------------------------------------------------------->
    
    
    
    <!------------------------NEED JQUERY TO ENABLE SCRIPT BELOW----------------->
    
    
    
#    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">

#    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    
    
        
    <!--------------------------------------------------------------------------->

    
</head>

<body class="lang-js">


```
