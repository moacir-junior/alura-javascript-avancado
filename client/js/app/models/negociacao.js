class Negociacao{
    
    constructor(data, quantidade, valor){
        this._data = new Date(data.getTime());
        this._quantidade = quantidade;
        this._valor = valor;
        this._volume = this.calcularVolume();
        Object.freeze(this);
    }

    calcularVolume(){
        return this._quantidade * this.valor;
    }

    get data(){
        return new Date(this._data.getTime());
    }

    get quantidade(){
        return this._quantidade;
    }

    get valor(){
        return this._valor;
    }

    get volume(){
        return this._volume;
    }
}