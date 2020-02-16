class ProxyFactory{

    static create(objeto, propriedades, acao){
        return new Proxy(objeto, {
            get(target, prop, receiver){
                if(propriedades.includes(prop) && ProxyFactory._testarFuncao(target[prop])){
                    return function(){
                        Reflect.apply(target[prop], target, arguments);
                        return acao(target);
                    }
                }
                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, value, receiver){
                if(propriedades.includes(prop)){
                    acao(target);
                    target[prop] = value;
                }
                return Reflect.set(target, prop, value, receiver);
            }
        });
    }

    static _testarFuncao(funcao){
        return typeof(funcao) == typeof(Function);
    }
}