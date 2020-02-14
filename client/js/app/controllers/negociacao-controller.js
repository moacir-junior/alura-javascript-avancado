class NegociacaoController{
    
    constructor(){
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacaoView($('#negociacoes-view')), 'adicionar', 'esvaziar');
        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagem-view')), 'texto');
    }

    adicionar(event){
        event.preventDefault();      
        let data = new Date(this._inputData.value.replace(/-/g, ','));
        let negociacao = new Negociacao(data, this._inputQuantidade.value, this._inputValor.value);
        this._listaNegociacoes.adicionar(negociacao);
        this._mensagem.texto = 'Negociação adicionada com sucesso.';
        this._limpaFormulario();
    }

    apagar(){
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Lista de negociações apagada.';
    }

    _limpaFormulario(){
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0;
        this._inputData.focus();
    }
}