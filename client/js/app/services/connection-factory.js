const ConnectionFactory = (() => {
    const nomeBanco = 'aluraframe';
    const stores = ['negociacoes'];
    const versaoBanco = 4;
    
    let conexao = null;
    let close = null;
    
    return class ConnectionFactory {
    
        constructor() {
            throw new Error('Não é possível criar instancias de ConnectionFactory');
        }
    
        static getConnection() {
            return new Promise((resolve, reject) => {
                let requisicao = window.indexedDB.open(nomeBanco, versaoBanco);
    
                requisicao.onupgradeneeded = e => {
                    ConnectionFactory._createStores(e.target.result);
                }
    
                requisicao.onsuccess = e => {
                    if(!conexao){
                        conexao = e.target.result;
                        close = conexao.close.bind(conexao);
                        conexao.close = () => {
                            throw new Error('Não é permitido fechar a conexão a partir do método close.');
                        }
                    }
    
                    resolve(conexao);
                }
    
                requisicao.onerror = e => {
                    console.log(e.target.error);
                    reject(e.target.error.name);
                }
            });
        }

        static closeConnection(){
            if(conexao){
                close();
                conexao = null;
            }
        }

        static _createStores(conexao) {
            stores.forEach(store => {
                if (conexao.objectStoreNames.contains(store))
                    conexao.deleteObjectStore(store);
    
                conexao.createObjectStore(store, { autoIncrement: true });
            })
        }
    }
})()