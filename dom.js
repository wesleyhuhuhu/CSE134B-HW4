/* dom.js */

function init() {
    let element = document.getElementById('walkBtn');
    element.addEventListener('click', function () {
        walk();
    });

    element = document.getElementById('advWalkBtn');
    element.addEventListener('click', function () {
        advWalk();
    })

    element = document.getElementById('modifyBtn');
    element.addEventListener('click', function () {
        modify();
    });

    element = document.getElementById('advModifyBtn');
    element.addEventListener('click', function () {
        advModify();
    });

    element = document.getElementById('addBtn');
    element.addEventListener('click', function () {
        add();
    });

    element = document.getElementById('addEl');
    element.addEventListener('click', function () {
        addEl();
    });

    element = document.getElementById('removeBtn');
    element.addEventListener('click', function () {
        remove();
    });

    element = document.getElementById('safeRemoveBtn');
    element.addEventListener('click', function () {
        safeDelete();
    });
}

function advModify() {
    h1Tag = document.querySelector('h1');
    h1Tag.innerHTML = 'DOM Manipulation is Fun!';
    let num = Math.floor(Math.random() * 6);
    const colors = ["black", "darkslategray", "darkgreen", "darkgoldenrod", "darkred", "darkmagenta"];
    h1Tag.style.color = colors[num];
    p1Tag = document.getElementById('p1');
    p1Tag.classList.remove('fancy');
    p1Tag.classList.add('shmancy');
}

function walk() {
   let el;

   el = document.getElementById('p1');
   showNode(el);

   el = el.firstChild;
   showNode(el);

   el = el.nextSibling;
   showNode(el);

   el = el.lastChild;
   showNode(el);

   el = el.parentNode.parentNode.parentNode;
   showNode(el);

   el = el.querySelector('section > *');
   showNode(el);
}

function advWalk() {
    let el;
    el = document.documentElement.parentNode;
    textArea = document.getElementById('nodeOutput');
    //el = el.firstChild.firstChild;
    let nodeType = el.nodeType;
    let nodeName = el.nodeName;
    let nodeValue = el.nodeValue;
    let html = JSON.stringify(document.documentElement.outerHTML);
    let array = html.split('');
    //textArea.innerHTML = array + '\r\n' + '\r\n';
    let flag = false;
    let enter = false;
    for (let i = 0; i < array.length; i++) {
        if (array[i] == '\\' && array[i+1] == 'n' && enter == false) {
            textArea.innerHTML = textArea.innerHTML + '\r\n';
            enter = true;
        }
        else if (array[i] == ' ' && array[i+1] == ' ' && array[i+2] == ' ' && array[i+3] == ' ') {
            textArea.innerHTML = textArea.innerHTML + ' ';
        }
        else if (array[i] == '<' && array[i+1] == 'e' && array[i+2] == 'm') {
            flag = true;
            enter = false;
            textArea.innerHTML = textArea.innerHTML + '\r\n' + '        ';
        }
        else if (array[i] == '<' && array[i+1] == 'h' && array[i+2] == 'e') {
            flag = true;
            enter = false;
            textArea.innerHTML = textArea.innerHTML + '\r\n';
        }
        else if (array[i] == '<' && array[i+1] != '/' && array[i+1] != '!') {
            flag = true;
            enter = false;
        }
        else if (flag && array[i] == '>') {
            flag = false;
            textArea.innerHTML = textArea.innerHTML + array[i];
        }
        else if (flag && array[i] == ' ') {
            flag = false;
            textArea.innerHTML = textArea.innerHTML + '>';
        }
        if (flag) {
            textArea.innerHTML = textArea.innerHTML + array[i];
        }
    }
    //alert(JSON.stringify(document.body.outerHTML));
    //traverseDOMTree(textArea, el, 1);
    if (el && (nodeName != '#text')) {
        //alert(`Node type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}`)
    }
}

function traverseDOMTree(targetDocument, currentElement, depth)
{
  if (currentElement)
  {
    var j;
    var tagName=currentElement.tagName;
    let nodeType = currentElement.nodeType;
    let nodeName = currentElement.nodeName;
    let nodeValue = currentElement.nodeValue;
    let textArea = document.getElementById('nodeOutput');
    // Prints the node tagName, such as <A>, <IMG>, etc
    if (currentElement) {
        let areaText = textArea.innerHTML;
        areaText = areaText + `\nNode type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}\n`;
        textArea.innerHTML = areaText;
    }
    else {
        let areaText = textArea.innerHTML;
        areaText = areaText + `unknown element`;
        textArea.innerHTML = areaText;
    }
    // Traverse the tree
    var i=0;
    var currentElementChild=currentElement.childNodes[i];
    while (currentElementChild)
    {
      // Formatting code (indent the tree so it looks nice on the screen)
      targetDocument.write("<BR>\n");
      for (j=0; j<depth; j++)
      {
        // &#166 is just a vertical line
        targetDocument.write("&nbsp;&nbsp;&#166");
      }  							
      targetDocument.writeln("<BR>");
      for (j=0; j<depth; j++)
      {
        targetDocument.write("&nbsp;&nbsp;&#166");
      }					
      if (tagName)
        targetDocument.write("--");

      // Recursively traverse the tree structure of the child node
      traverseDOMTree(targetDocument, currentElementChild, depth+1);
      i++;
      currentElementChild=currentElement.childNodes[i];
    }
    // The remaining code is mostly for formatting the tree
    targetDocument.writeln("<BR>");
    for (j=0; j<depth-1; j++)
    {
      targetDocument.write("&nbsp;&nbsp;&#166");
    }			
    targetDocument.writeln("&nbsp;&nbsp;");
    if (tagName)
      targetDocument.writeln("&lt;/"+tagName+"&gt;");
  }
}

function showNode(el) {
    let nodeType = el.nodeType;
    let nodeName = el.nodeName;
    let nodeValue = el.nodeValue;
    let textArea = document.getElementById('nodeOutput');
    let areaText = textArea.innerHTML;

    areaText = areaText + `\nNode type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}\n`;
    textArea.innerHTML = areaText;
    //alert(`Node type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}`);
}

function modify() {
    let el = document.getElementById('p1');

    // You can do all the properties one by one if you know them in HTML
    el.title = 'I was changed by JS';

    // you can update the style as a string
    // el.style = 'color: blue; font-size: 1em;';

    // you also may prefer to update on the CSS object.  This is the same as above
    // el.style.color = 'blue';
    // el.style.fontSize = '1em';
    // be careful doing many styles bit by bit it isn't efficent, might be easier just to set a class

    // you can also update the class list
    el.classList.remove('shmancy');
    el.classList.add('fancy');

    // you can also update the dataset which change data-* attributes
    el.dataset.cool = 'true';       // data-cool="true"
    el.dataset.coolFactor = '9000'; //data-cool-factor="9000"

}

function add() {

    let p, em, txt1, txt2, txt3;

    // first we do things the long old-fashioned standard DOM way
    p = document.createElement('p'); // <p></p>
    em = document.createElement('em'); // <em></em>
    txt1 = document.createTextNode('This is a '); // "This is a"
    txt2 = document.createTextNode('test'); // "test"
    txt3 = document.createTextNode(' of the DOM'); // " of the DOM"

    p.appendChild(txt1); // <p>This is a</p>
    em.appendChild(txt2); // <em>test</em>
    p.appendChild(em); // <p>This is a<em>test</em></p>
    p.appendChild(txt3); // <p>This is a<em>test</em> of the DOM</p>

    // go an insert this new copy below the old one
    let oldP = document.getElementById('p1');
    oldP.parentNode.insertBefore(p, oldP.nextSibling);

    // Alternative method using innerHTML and insertAdjacentHTML
    // let oldP = document.getElementById('p1');
    // oldP.insertAdjacentHTML('afterend', '<p>This is a<em>test</em> of the DOM</p>');
    // clearly short hands are pretty easy!
}

function addEl() {

    let select = document.getElementById('addition');
    let value = select.value;
    const date = new Date();
    let outputArea = document.getElementById('output');
    let text = document.getElementById('textField').value;
    if (text == '') {}
    if (value == 'text') {
        if (text == '') {text = 'New Text Node';}
        let span = document.createElement('span');
        let textNode = document.createTextNode(text);
        span.appendChild(textNode);
        span.innerHTML = span.innerHTML + "|" + date;
        outputArea.appendChild(span);
        span.style.border = '1px solid red';
    }
    else if (value == 'comment') {
        if (text == '') {text = 'New Comment';}
        let span = document.createElement('span');
        let comment = `<!--${text}-->`;
        span = document.createElement('span');
        span.innerHTML = comment + date;
        outputArea.appendChild(span);
        span.style.border = '1px solid green';
    }
    else {
        if (text == '') {text = 'New Element';}
        let element = document.createElement(value);
        element.innerHTML = element.innerHTML + text + '|' + date;
        outputArea.appendChild(element);
        element.style.border = '1px solid blue'
    }
    console.log(text);
}

function safeDelete() {
    while (document.body.lastChild.tagName != 'SECTION') {
        document.body.removeChild(document.body.lastChild);
    }
    while (document.body.firstChild.tagName != 'SECTION') {
        document.body.removeChild(document.body.firstChild);
    }
}

function remove() {
  document.body.removeChild(document.body.lastChild);
}

window.addEventListener('DOMContentLoaded', init);
