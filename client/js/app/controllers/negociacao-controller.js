class NegociacaoController{
    
    constructor(){
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacaoView($('#negociacoes-view')), 'adicionar', 'esvaziar');
        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagem-view')), 'texto');

         ConnectionFactory.getConnection().then(conexao => {
             new NegociacaoDao(conexao).buscarTudo()
             .then(negociacoes => {
                 negociacoes.forEach(negociacao => {
                    this._listaNegociacoes.adicionar(negociacao);
                 });
             })
             .catch(erro => {
                 console.log(erro);
                 this._mensagem = 'Não foi possível obter as negociações.';
             });
         });
    }

    adicionar(event){
        event.preventDefault();      
        
        ConnectionFactory.getConnection().then(conexao => {
            let data = new Date(this._inputData.value.replace(/-/g, ','));
            let negociacao = new Negociacao(data, parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));

           new NegociacaoDao(conexao).adicionar(negociacao)
           .then(() => {
               this._listaNegociacoes.adicionar(negociacao);
               this._mensagem.texto = 'Negociação adicionada com sucesso.';
               this._limpaFormulario();
           })
           .catch(erro => {
               this._mensagem.texto = erro;
           })
        });
    }

    importarNegociacoes(){
        let service = new NegociacaoService();

        let promise = Promise.all(Array(service.obterNegociacoesSemana(), service.obterNegociacoesSemanaAnterior(), service.obterNegociacoesSemanaRetrasada()));
        promise.then(negociacoes => {
            negociacoes.reduce((vetorAchatado, vetor) => vetorAchatado.concat(vetor), Array()).forEach(negociacao => this._listaNegociacoes.adicionar(negociacao));
            this._mensagem.texto = 'Negociações importadas com sucesso.';
        });
        promise.catch(erro => this._mensagem.texto = erro);
    }

    apagar(){
        ConnectionFactory.getConnection().then(conexao => {
            new NegociacaoDao(conexao).removerTudo()
            .then(mensagem => {
                this._mensagem = mensagem;
                this._listaNegociacoes.esvazia();
            })
            .catch(mensagem => {
                this._mensagem = mensagem;
            });
        });
    }

    _limpaFormulario(){
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0;
        this._inputData.focus();
    }
}