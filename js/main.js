//把字符串code写入页面中
function writeCode(prefix, code, fn) {
    var n = 0
    var id = setInterval(() => {
        preTag.scrollTop = preTag.scrollHeight
        preTag.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css, 'css')
        styleTag.insertAdjacentHTML('beforeend', code[n])
        n++
        if (n >= code.length) {
            window.clearInterval(id)
            fn()
        }
    }, 0)
}
function createPaper(fn) {
    var paperWrapper = document.createElement('div')
    paperWrapper.id = 'paperWrapper'
    document.body.append(paperWrapper)
    var paper = document.createElement('div')
    paper.id = 'paper'
    paperWrapper.append(paper)
    fn()
}
function rotate() {
    preTag.classList.add('rotate')
}
var code = `/*
  我是yyh
    我将通过这个页面的动画来介绍我自己
    只用文字介绍太单调了
    我就用代码来介绍吧
    首先准备一些样式
*/

*{  
    font-size:16px;
    transition:all 1s;
    font-family:Kozuka Gothic Pro L;     
}
html{
    background:rgb(222,222,222);
}
#preTag{
    padding:20px;
    border:1px solid black;
}
/* 需要高亮一下代码 */
.token.selector{
    color:#690 ;
}
.token.punctuation{
    color:#999 ;    
}
.token.property{
    color:#905 ;
}
.token.function{
    color:#DD4A68;
}
/*我需要一张白纸*/
`
writeCode('', code, () => {
    rotate()
    createPaper(() => {
        writeCode(code, code2, () => { console.log(1) })
    })
})

var code2 = `
#paperWrapper{
    position:fixed;
    top:0;right:0;
    width:50%;height:100vh;
    background: rgb(206, 192, 192);
}
#paper{
    background:white;
    width:100%;height:100%;
}
`