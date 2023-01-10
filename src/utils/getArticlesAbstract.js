module.exports=(content,length)=>{
    if(content.length<length) return content
    return content.slice(0,length)
}