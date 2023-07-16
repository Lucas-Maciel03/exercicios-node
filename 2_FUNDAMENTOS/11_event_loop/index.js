function a(){
    console.log("Executando a()")
}

function b(){
    console.log("Executando b()")
}

function c(){
    console.log("Executando c()")
    a()
    b()
}

//event loop garante que a execução do codigo seja sequencial
c()