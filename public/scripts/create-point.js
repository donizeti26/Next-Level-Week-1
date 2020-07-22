function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")// Buscar informações na pahgina
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados") 
    .then(res => res.json()) 
   .then (states =>{ // var states = res.value;

        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
  
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    
    const ufValue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex /*o que eu escolhi*/
    stateInput.value = event.target.options[indexOfSelectedState].text /*pegou o que eu escolhi*/
    // <input type="hidden" value="">

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    citySelect.innerHTML="<option value>Selecione a Cidade</option> "
    citySelect.disabled = true
    fetch(url)
        .then (res => res.json())
        .then(cities => {
            
            for(const city of cities){
                citySelect.innerHTML += `<option value= "${city.nome}">${city.nome}</option>`
            }
            citySelect.disabled = false
        })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)/*passando por referencia (falando para ela que mudaram)*/
    
    // <option value="${state.id}">Bahia</option> -> getCites(state.id)
    // state->BA->29



    /*ITEMS DE COLETA*/

//PEGAR TODOS OS LI S

const ItemsToCollect = document.querySelectorAll(".items-grid li")

for(const items of ItemsToCollect){
    items.addEventListener("click", handleSelectedItem)

}

const colletedItems = document.querySelector("input[name=items]")

//
let selectedItems =[2,3]

function handleSelectedItem(event){
    const itemLi=event.target
    // adicionar ou remover uma classe com java script
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id
    
    
    //verificar se existe items selecionados , se sim
    //pegar os items selecionados
    const alreadySelected = selectedItems.findIndex( item =>{
        const itemFound = item == itemId // isso será true ou false
        return itemFound
    })

    //se já estiver selecionado, tirar da seleção
    if(alreadySelected >= 0){
        // tirar da seleção
        const filteredItems = selectedItems.filter( item =>{
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
//se não estiver selecionado, adicionar  a seleção
    }else{
        selectedItems.push(itemId)
    }
    colletedItems.value = selectedItems
    //atualizar o campo escondido com os dados selecionados
}