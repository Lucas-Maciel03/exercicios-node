const x = "10"

if(!Number.isInteger(x)){
    throw new Error("O valor de x nao é inteiro")
}

console.log('se x for inteiro essa msg sera exibida')
