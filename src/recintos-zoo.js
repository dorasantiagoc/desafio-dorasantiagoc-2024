class RecintosZoo {
    static recintos = [
        { numero: 1, bioma: ['savana'], tamanhoTotal: 10, animais: ['MACACO'], quantidade: [3], espacoDisponivel: 7 },
        { numero: 2, bioma: ['floresta'], tamanhoTotal: 5, animais: [''], quantidade: [0], espacoDisponivel: 5 },
        { numero: 3, bioma: ['savana', 'rio'], tamanhoTotal: 7, animais: ['GAZELA'], quantidade: [1], espacoDisponivel: 6 },
        { numero: 4, bioma: ['rio'], tamanhoTotal: 8, animais: [''], quantidade: [0], espacoDisponivel: 8 },
        { numero: 5, bioma: ['savana'], tamanhoTotal: 9, animais: ['LEAO'], quantidade: [1], espacoDisponivel: 8 }
    ];

    static animais = [
        { especie: 'LEAO', tamanho: 3, bioma: ['savana'], carnivoro: true },
        { especie: 'LEOPARDO', tamanho: 2, bioma: ['savana'], carnivoro: true },
        { especie: 'CROCODILO', tamanho: 3, bioma: ['rio'], carnivoro: true },
        { especie: 'MACACO', tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },
        { especie: 'GAZELA', tamanho: 2, bioma: ['savana'], carnivoro: false },
        { especie: 'HIPOPOTAMO', tamanho: 4, bioma: ['savana', 'rio'], carnivoro: false }
    ];

    calculaEspacoInicial() {
        for (let i = 0; i < RecintosZoo.recintos.length; i++) {
            let a;
            for (a = 0; a < RecintosZoo.animais.length; a++) {
                if (RecintosZoo.recintos[i].animais == RecintosZoo.animais[a].especie) {
                    break;
                } else if (a == (RecintosZoo.animais.length - 1)) {
                    break;
                }
            }
            RecintosZoo.recintos[i].espacoDisponivel = RecintosZoo.recintos[i].tamanhoTotal - (RecintosZoo.recintos[i].quantidade * RecintosZoo.animais[a].tamanho);
        }
    }

    verificaCarnivoro() {
        let recintosComCarnivoros = [];
        for (let i = 0; i < RecintosZoo.recintos.length; i++) {
            for (let a = 0; a < RecintosZoo.animais.length; a++) {
                if (RecintosZoo.recintos[i].animais == RecintosZoo.animais[a].especie) {
                    if (RecintosZoo.animais[a].carnivoro) {
                        recintosComCarnivoros.push(RecintosZoo.recintos[i])
                    }
                }
            }
        }

        return recintosComCarnivoros;
    }

    verificaRecintoHipopotamo() {
        let recintosPossiveis = [];
        for (let i = 0; i < RecintosZoo.recintos.length; i++) {

            if (RecintosZoo.recintos[i].animais != 'HIPOPOTAMO' && RecintosZoo.recintos[i].numero == 3) {
                recintosPossiveis.push(RecintosZoo.recintos[i]);
            }

            if (RecintosZoo.recintos[i].animais == 'HIPOPOTAMO' || RecintosZoo.recintos[i].animais == '') {
                recintosPossiveis.push(RecintosZoo.recintos[i]);
            }
        }

        return recintosPossiveis;
    }

    verificaRecintoMacaco(quantidadeAnimais) {
        let recintosPossiveis = [];
        for (let i = 0; i < RecintosZoo.recintos.length; i++) {

            if (RecintosZoo.recintos[i].quantidade != 0 || quantidadeAnimais > 1) {
                recintosPossiveis.push(RecintosZoo.recintos[i]);
            }
        }

        return recintosPossiveis;
    }

    contabilizaEspacoRecinto(animalNovo, quantidadeAnimais) {

        let recintosPossiveis = [];
        for (let i = 0; i < RecintosZoo.animais.length; i++) {

            if (animalNovo == RecintosZoo.animais[i].especie) {

                for (let a = 0; a < RecintosZoo.recintos.length; a++) {

                    for (let k = 0; k < RecintosZoo.animais[i].bioma.length; k++) {
                        for (let l = 0; l < RecintosZoo.recintos[a].bioma.length; l++) {

                            if (RecintosZoo.animais[i].bioma[k] == RecintosZoo.recintos[a].bioma[l]) {

                                if (RecintosZoo.recintos[a].animais == animalNovo || RecintosZoo.recintos[a].animais == '') {

                                    if (quantidadeAnimais * RecintosZoo.animais[i].tamanho <= RecintosZoo.recintos[a].espacoDisponivel) {
                                        RecintosZoo.recintos[a].espacoDisponivel -= (quantidadeAnimais * RecintosZoo.animais[i].tamanho);
                                        recintosPossiveis.push(RecintosZoo.recintos[a]);
                                    }

                                } else if (RecintosZoo.recintos[a].animais != animalNovo) {

                                    if (quantidadeAnimais * RecintosZoo.animais[i].tamanho <= (RecintosZoo.recintos[a].espacoDisponivel - 1)) {
                                        RecintosZoo.recintos[a].espacoDisponivel--;
                                        RecintosZoo.recintos[a].espacoDisponivel -= (quantidadeAnimais * RecintosZoo.animais[i].tamanho);
                                        recintosPossiveis.push(RecintosZoo.recintos[a]);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return (recintosPossiveis);
    }

    analisaRecintos(animal, quantidade) {

        new RecintosZoo().calculaEspacoInicial();

        let resultado = {
            erro: null,
            recintosViaveis: []
        };

        let aux = false;

        for (let i = 0; i < RecintosZoo.animais.length; i++) {

            if (animal == RecintosZoo.animais[i].especie) {

                aux = true;

                if (quantidade > 0) {

                    let recintosComEspaco = new RecintosZoo().contabilizaEspacoRecinto(animal, quantidade);
                    let recintosComCarnivoros = new RecintosZoo().verificaCarnivoro();

                    let haRecintosViaveis = false;

                    if (animal == 'MACACO') {

                        const recintosPossiveis = [];

                        let recintosParaMacacos = new RecintosZoo().verificaRecintoMacaco(quantidade);

                        for (let a = 0; a < recintosComCarnivoros.length; a++) {
                            for (let k = 0; k < recintosComEspaco.length; k++) {
                                if (recintosComCarnivoros[a].numero != recintosComEspaco[k].numero) {
                                    recintosPossiveis.push(recintosComEspaco[k]);
                                }
                            }
                        }

                        for (let a = 0; a < recintosPossiveis.length; a++) {
                            for (let k = 0; k < recintosParaMacacos.length; k++) {

                                if (recintosPossiveis[a].numero == recintosParaMacacos[k].numero) {
                                    haRecintosViaveis = true;
                                    resultado.recintosViaveis.push("Recinto " + recintosPossiveis[a].numero + " (espaço livre: " + recintosPossiveis[a].espacoDisponivel + " total: " + recintosPossiveis[a].tamanhoTotal + ")");
                                    console.log("Recinto " + recintosPossiveis[a].numero + " (espaço livre: " + recintosPossiveis[a].espacoDisponivel + " total: " + recintosPossiveis[a].tamanhoTotal + ")");
                                }
                            }
                        }

                    } else if (animal == 'HIPOPOTAMO') {

                        const recintosPossiveis = [];

                        let recintosParaHipopotamos = new RecintosZoo().verificaRecintoHipopotamo();

                        for (let a = 0; a < recintosComCarnivoros.length; a++) {
                            for (let k = 0; k < recintosComEspaco.length; k++) {
                                if (recintosComCarnivoros[a].numero != recintosComEspaco[k].numero) {
                                    recintosPossiveis.push(recintosComEspaco[k]);
                                }
                            }
                        }

                        for (let a = 0; a < recintosPossiveis.length; a++) {
                            for (let k = 0; k < recintosParaHipopotamos.length; k++) {
                                if (recintosPossiveis[a].numero == recintosParaHipopotamos[k].numero) {
                                    haRecintosViaveis = true;
                                    resultado.recintosViaveis.push("Recinto " + recintosPossiveis[a].numero + " (espaço livre: " + recintosPossiveis[a].espacoDisponivel + " total: " + recintosPossiveis[a].tamanhoTotal + ")");
                                    console.log("Recinto " + recintosPossiveis[a].numero + " (espaço livre: " + recintosPossiveis[a].espacoDisponivel + " total: " + recintosPossiveis[a].tamanhoTotal + ")");
                                }
                            }
                        }

                    } else if (animal == 'GAZELA') {

                        for (let a = 0; a < recintosComCarnivoros.length; a++) {
                            for (let k = 0; k < recintosComEspaco.length; k++) {
                                if (recintosComCarnivoros[a].numero != recintosComEspaco[k].numero) {
                                    haRecintosViaveis = true;
                                    resultado.recintosViaveis.push("Recinto " + recintosComEspaco[k].numero + " (espaço livre: " + recintosComEspaco[k].espacoDisponivel + " total: " + recintosComEspaco[k].tamanhoTotal + ")");
                                    console.log("Recinto " + recintosComEspaco[k].numero + " (espaço livre: " + recintosComEspaco[k].espacoDisponivel + " total: " + recintosComEspaco[k].tamanhoTotal + ")");
                                }
                            }
                        }

                    } else {

                        for (let a = 0; a < recintosComEspaco.length; a++) {
                            if (recintosComEspaco[a].animais == animal || recintosComEspaco[a].animais == '') {
                                haRecintosViaveis = true;
                                resultado.recintosViaveis.push("Recinto " + recintosComEspaco[a].numero + " (espaço livre: " + recintosComEspaco[a].espacoDisponivel + " total: " + recintosComEspaco[a].tamanhoTotal + ")");
                                console.log("Recinto " + recintosComEspaco[a].numero + " (espaço livre: " + recintosComEspaco[a].espacoDisponivel + " total: " + recintosComEspaco[a].tamanhoTotal + ")");
                            }
                        }
                    }

                    if (!haRecintosViaveis) {
                        resultado.recintosViaveis = null;
                        resultado.erro = "Não há recinto viável";
                        console.log("Não há recinto viável");
                    }

                } else {
                    resultado.recintosViaveis = null;
                    resultado.erro = "Quantidade inválida";
                    console.log("Quantidade inválida");
                }
            }
        }

        if (!aux) {
            resultado.recintosViaveis = null;
            resultado.erro = "Animal inválido";
            console.log("Animal inválido");
        }

        return resultado;
    }

}

const argumentos = process.argv.slice(2);
new RecintosZoo().analisaRecintos(argumentos[0], argumentos[1]);

export { RecintosZoo as RecintosZoo };