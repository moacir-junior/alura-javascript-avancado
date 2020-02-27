class NegociacaoDao{

    constructor(conexao){
        this._conexao = conexao;
        this._store = 'negociacoes';
    }

    adicionar(negociacao){
        return new Promise((resolve, reject) => {
            let transacao = this._conexao.transaction([this._store], 'readwrite');
            let store = transacao.objectStore(this._store);
            
            let request = store.add(negociacao);

            request.onsuccess = e => {
                resolve();
            };

            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível adicionar a negociação.');
            };
        });
    }

    buscarTudo(){
        return new Promise((resolve, reject) => {
            let transacao = this._conexao.transaction([this._store], 'readwrite');
            let store = transacao.objectStore(this._store);
            let cursor = store.openCursor();

            let negociacoes = [];

            cursor.onsuccess = e => {
                let atual = e.target.result;
                
                if(atual){
                    let dado = atual.value;
                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));

                    atual.continue();
                }else{
                    resolve(negociacoes);
                }
            };

            cursor.onerror = e => {
                console.log(e.target.error);
                reject('Não foi posível carregar as negociações gravadas.');
            };
        });
    }

    removerTudo(){
        return new Promise((resolve, reject) => {
            let transacao = this._conexao.transaction([this._store], 'readwrite');
            let store = transacao.objectStore(this._store);
            
            let requisicao = store.clear();

            requisicao.onsuccess = e => {
                resolve('Negociações apagadas com sucesso.');
            }

            requisicao.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível apagar as negociações gravadas.');
            }
        });
    }
}