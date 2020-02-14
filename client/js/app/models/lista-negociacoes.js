class ListaNegociacoes{
    
    constructor(){
        this._negociacoes = Array();
    }

    adicionar(negociacao){
        this._negociacoes.push(negociacao);
    }

    get negociacoes(){
        return Array().concat(this._negociacoes);
    }

    esvazia(){
        this._negociacoes = Array();
    }
}