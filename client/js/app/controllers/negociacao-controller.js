class NegociacaoController{
    
    constructor(){
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._listaNegociacoes = new ListaNegociacoes();
        this._negociacaoView = new NegociacaoView($('#negociacoes-view'));

        this._negociacaoView.update();
    }

    adicionar(event){
        event.preventDefault();      

        let data = new Date(this._inputData.value.replace(/-/g, ','));
        let negociacao = new Negociacao(data, this._inputQuantidade.value, this._inputValor.value);
        
        this._listaNegociacoes.adicionar(negociacao);
        this._limpaFormulario();

        console.log(this._listaNegociacoes.negociacoes);        
    }

    _limpaFormulario(){
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0;

        this._inputData.focus();
    }
}