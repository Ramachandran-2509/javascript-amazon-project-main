
// 200 = Here is the file
// 304 = Use old cached file
// 404 = File missing
// 500 = Server exploded


const xhr= new XMLHttpRequest()

xhr.addEventListener('load',()=>{
    // if(xhr.status===200){
    //     console.log(xhr.response)
    // }else if(xhr.status===404){
    //     console.log(xhr.responseText)
    // }else{
    //     console.log("Some other error")
    // }

    console.log(xhr.response)
})

xhr.open("GET","https://supersimplebackend.dev")
xhr.send()