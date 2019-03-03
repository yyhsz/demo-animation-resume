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
    background:#ddd;
}
#preTag{
    padding:20px;
    border:1px solid black;
    width:600px;   
    background:rgb(206, 192, 192);
    box-shadow:-3px 3px 3px 3px rgba(0, 0, 0, 0.2);
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
/*我需要一张白纸来进行自我介绍*/
`

var code2 = `
#paperWrapper{
    position:fixed;
    top:18px;right:0;
    border:2px solid rgb(182, 144, 243);
    width:50%;height:88vh;
    background: rgb(206, 192, 192);
}
#paper{
    background:white;
    width:100%;height:100%;
}
`
var md = `
# 自我介绍
我叫 XXX
1990 年 1 月出生
XXX 学校毕业
自学前端半年
希望应聘前端开发岗位
# 技能介绍
熟悉 JavaScript CSS
# 项目介绍
1. XXX 轮播
2. XXX 简历
3. XXX 画板
# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx
# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx
`
writeCode(code,() => {
    createPaper(() => {
        writeCode(code, code2, () =>{writeMakeDown(md,()=>{
            convertMarkdownToHtml(()=>{})
        })})
    })
})

function convertMarkdownToHtml(fn){
    paper.innerHTML = marked(md)
    fn && fn.call()
  }
  

function writeCode(/*传入要在页面显示的多个字符串和一个函数*/) {
    var n = 0
    var string = ''
    for(let key in arguments){
        if(key>arguments.length -3){
            break;
        }else string += arguments[key]
    }
    
    var id = setInterval(() => {
        preTag.innerHTML = Prism.highlight(string + arguments[arguments.length-2].substring(0, n), Prism.languages.css, 'css')
        styleTag.insertAdjacentHTML('beforeend',arguments[arguments.length-2][n])
        n++
        document.querySelector('pre').scrollTop = 10000
        if (n >= arguments[arguments.length-2].length) {
            arguments[arguments.length-1]()
            window.clearInterval(id)
        }
    }, 10)
    
}
function createPaper(fn) {
    var paperWrapper = document.createElement('div')
    paperWrapper.id = 'paperWrapper'
    body = document.querySelector('body')
    body.append(paperWrapper)
    var paper = document.createElement('pre')
    paper.id = 'paper'
    paperWrapper.append(paper)
    fn()
}
function writeMakeDown(md,fn){
    let n = 0
    let id = setInterval(()=>{
        document.querySelector('#paper').insertAdjacentHTML('beforeend',md[n])
        n++
        if(n>=md.length){
            window.clearInterval(id)
            fn()
        }
    },10)
}