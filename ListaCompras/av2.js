var dic_produtos = {}
var lista_totais = []//criada para poder usar a função soma (facilitar a vida)
var min = 0
var max = 0
var guarda_nome_barato = ""
var guarda_nome_caro = ""

// esta função do enter só funciona para o primeiro botão Ir
document.addEventListener("keypress", function (e) {

    if (e.key == "Enter") {
        const btn_ir = document.getElementById("entradaButton")
        btn_ir.click(verificaProduto())
    }

})

function verificaProduto() {
    var produto = document.getElementById("entradaInput").value.toLowerCase()

    if (produto == "") {
        window.alert("Nenhum produto foi digitado =(")
    } else {
        var achou = procura(produto, dic_produtos)

        if (achou) {
            window.alert("Este produto já está inserido!!")
            document.getElementById("entradaInput").value = ""
        } else {
            infoProduto(produto)
        }
    }
}

function procura(nome_produto, dic) {

    for (chave in dic) {
        if (chave == nome_produto) {
            return true
        }
    }
    return false
}

function infoProduto(nome_produto) {
    var valor_uni = document.createElement("input")
    var qtd_comprada = document.createElement("input")
    var section = document.getElementById("section")
    var buttonInserir = document.createElement("input")

    valor_uni.setAttribute("type", "number")
    valor_uni.setAttribute("step", "any")//para permitir valores reais
    valor_uni.setAttribute("placeholder", "Digite o valor unitário")
    valor_uni.setAttribute("id", "entradaValor_uni")

    qtd_comprada.setAttribute("type", "number")
    qtd_comprada.setAttribute("placeholder", "Digite a quantia comprada")
    qtd_comprada.setAttribute("id", "entradaQtd_comprada")

    buttonInserir.setAttribute("type", "button")
    buttonInserir.setAttribute("value", "Inserir produto")
    buttonInserir.setAttribute("onclick", `insereProduto('${nome_produto}')`)

    section.innerHTML = section.innerHTML + "<br>"
    section.appendChild(valor_uni)
    section.innerHTML = section.innerHTML + "<br><br>"
    section.appendChild(qtd_comprada)
    section.innerHTML = section.innerHTML + "<br><br>"
    section.appendChild(buttonInserir)

    document.getElementById("entradaInput").value = nome_produto
}

function insereProduto(nome_produto) {
    var valor_uni = parseFloat(document.getElementById("entradaValor_uni").value)
    var qtd_comprada = parseInt(document.getElementById("entradaQtd_comprada").value)

    if (isNaN(valor_uni) || isNaN(qtd_comprada)) {
        window.alert("Erro =(\nO valor unitário e/ou a quantidade comprada não foram digitados corretamente!!\nPor favor, digite corretamente os valores!!")
    } else {
        var tbody = document.getElementById("tbody")
        var tr_info = document.createElement("tr")
        var tr_total = document.getElementById("total_tudo")
        tr_total.innerHTML = ""
        tbody.removeChild(tr_total)
        var td1_total = document.createElement("td")
        var td2_total = document.createElement("td")
        var td1 = document.createElement("td")
        var td2 = document.createElement("td")
        var td3 = document.createElement("td")
        var td4 = document.createElement("td")
        var total = parseFloat(valor_uni * qtd_comprada)

        lista_totais.push(total)
        dic_produtos[nome_produto] = [valor_uni, qtd_comprada, total]

        tr_info.setAttribute("id", `tr_${nome_produto}`)
        td2_total.setAttribute("id", "td_total_tudo")
        td2_total.setAttribute("colspan", "3")

        td1.innerText = nome_produto
        tr_info.appendChild(td1)

        td2.innerText = "R$ " + valor_uni
        tr_info.appendChild(td2)

        td3.innerText = qtd_comprada
        tr_info.appendChild(td3)

        td4.innerText = "R$ " + total
        tr_info.appendChild(td4)

        td1_total.innerHTML = "<strong>Total</strong>"
        td2_total.innerText = "R$ " + d3.sum(lista_totais)
        tr_total.appendChild(td1_total)
        tr_total.appendChild(td2_total)

        tbody.appendChild(tr_info)
        tbody.appendChild(tr_total)

        section.innerHTML = ""
        document.getElementById("entradaInput").value = ""
        minMax()
    }
}

function minMax() {
    var contador = 0
    var nome_caro = ""
    var nome_barato = ""
    for (chave in dic_produtos) {
        if (contador == 0) {
            min = dic_produtos[chave][0]
            max = dic_produtos[chave][0]
            nome_caro = chave
            nome_barato = chave
        } else {
            if (dic_produtos[chave][0] < min) {
                min = dic_produtos[chave][0]
                nome_barato = chave
            } else if (dic_produtos[chave][0] > max) {
                max = dic_produtos[chave][0]
                nome_caro = chave
            }
        }
        contador = 1
    }
    var info_lista = [nome_barato, nome_caro]
    caro_barato(info_lista)
}

function caro_barato(lista) {
    if (guarda_nome_barato == "") {
        var mais_barato = document.getElementById(`tr_${lista[0]}`)
        var mais_caro = document.getElementById(`tr_${lista[1]}`)

        mais_caro.style.color = "white"
        mais_caro.style.background = "red"

        mais_barato.style.color = "black"
        mais_barato.style.background = "greenyellow"

        guarda_nome_barato = lista[0]
        guarda_nome_caro = lista[1]
    } else {
        var antigo_barato = document.getElementById(`tr_${guarda_nome_barato}`)
        var antigo_caro = document.getElementById(`tr_${guarda_nome_caro}`)
        var mais_barato = document.getElementById(`tr_${lista[0]}`)
        var mais_caro = document.getElementById(`tr_${lista[1]}`)

        antigo_barato.style.color = "black"
        antigo_barato.style.background = "url('Imagens/fundo.png')"

        antigo_caro.style.color = "black"
        antigo_caro.style.background = "url('Imagens/fundo.png')"

        mais_caro.style.color = "white"
        mais_caro.style.background = "red"

        mais_barato.style.color = "black"
        mais_barato.style.background = "greenyellow"

        guarda_nome_barato = lista[0]
        guarda_nome_caro = lista[1]
    }
}

function estruturaExcluir() {
    var div = document.getElementById("div_excluir")
    var seraExcluido = document.createElement("input")
    var button_ir = document.createElement("input")

    seraExcluido.setAttribute("type", "text")
    seraExcluido.setAttribute("placeholder", "Digite o produto")
    seraExcluido.setAttribute("id", "seraExcluido")
    button_ir.setAttribute("type", "button")
    button_ir.setAttribute("value", "Ir")
    button_ir.setAttribute("onclick", `excluirProduto(${'document.getElementById("seraExcluido").value.toLowerCase()'})`)

    div.innerHTML = div.innerHTML + "<br>"
    div.appendChild(seraExcluido)
    div.innerHTML = div.innerHTML + " "
    div.appendChild(button_ir)
}

function excluirProduto(nome_produto) {
    if (nome_produto == "") {
        window.alert("Nenhum produto foi digitado =(")
    } else {
        var achou = procura(nome_produto, dic_produtos)

        if (achou) {
            var tbody = document.getElementById("tbody")
            var tr = document.getElementById(`tr_${nome_produto}`)
            var td_total = document.getElementById("td_total_tudo")

            tbody.removeChild(tr)

            var total_produto = dic_produtos[nome_produto][2]
            var indice = lista_totais.indexOf(total_produto)

            lista_totais.splice(indice, 1)
            delete (dic_produtos[nome_produto])

            td_total.innerText = ""
            td_total.innerText = d3.sum(lista_totais)

            if (Object.keys(dic_produtos).length !== 0) { //verificando se o dic ficou vazio após a exclusão
                min = 0
                max = 0
                guarda_nome_barato = ""
                guarda_nome_caro = ""
                minMax()
            }
        } else {
            window.alert("Este produto ainda não foi cadastrado!!")
        }
    }

    document.getElementById("div_excluir").innerHTML = ""
}