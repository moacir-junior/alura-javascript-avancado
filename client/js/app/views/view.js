class View{
    
    constructor(elemento){
        this._elemento = elemento;
    }

    template(model){
        throw new Error('O método _template deve ser sobrescrito nas classes filhas.');
    }

    update(model){
        this._elemento.innerHTML = this.template(model);
    }
}