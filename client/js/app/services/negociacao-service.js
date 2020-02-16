class NegociacaoService{

    constructor(){
        this._httpService = new HttpService();
    }

    obterNegociacoesSemana(){
        return new Promise((resolve, reject) => {
            this._httpService.get('negociacoes/semana')
            .then(negociacoes => {
                resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
            })
            .catch(erro => {
                console.log(erro);
                reject('Não foi possível obter as negociações da semana.');
            })
        });
    }

    obterNegociacoesSemanaAnterior(){
        return new Promise((resolve, reject) => {
            this._httpService.get('negociacoes/anterior')
            .then(negociacoes => {
                resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
            })
            .catch(erro => {
                console.log(erro);
                reject('Não foi possível obter as negociações da semana anterior.');
            });
        });
    }

    obterNegociacoesSemanaRetrasada(){
        return new Promise((resolve, reject) => {
            this._httpService.get('negociacoes/retrasada')
            .then(negociacoes => {
                resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
            })
            .catch(erro => {
                console.log(erro);
                reject('Não foi possível obter as negociações da semana retrasada.');
            })
        });
    }
}