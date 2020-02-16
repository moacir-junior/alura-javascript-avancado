class HttpService{
    get(diretorio){
        return new Promise((resolve, reject) => {
            let xmlHttpRequest = new XMLHttpRequest();
            xmlHttpRequest.open('GET', diretorio);
    
            xmlHttpRequest.onreadystatechange = () => {
                /*0: Requisição ainda não iniciada
                  1: Conexão com o servidor estabelecida
                  2: Requisição recebida
                  3: Processando requisição
                  4: Requisição concluída e resposta pronta.*/
                if(xmlHttpRequest.readyState == 4){
                    if(xmlHttpRequest.status == 200){
                        resolve(JSON.parse(xmlHttpRequest.responseText));
                    }else{
                        reject(xmlHttpRequest.responseText);
                    }
                }
            };
    
            xmlHttpRequest.send();
        });
    }
}