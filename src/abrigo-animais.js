
/*
  Desafio de Código - Adoção de Animais no Abrigo
  Autor: [Nicolas Warnava]
  Data: [09/09/2025]
*/

class AbrigoAnimais {
  constructor() {
    this.animais = [
      { nome: 'Rex', tipo: 'cão', brinquedos: ['RATO', 'BOLA'] },
      { nome: 'Mimi', tipo: 'gato', brinquedos: ['BOLA', 'LASER'] },
      { nome: 'Fofo', tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
      { nome: 'Zero', tipo: 'gato', brinquedos: ['RATO', 'BOLA'] },
      { nome: 'Bola', tipo: 'cão', brinquedos: ['CAIXA', 'NOVELO'] },
      { nome: 'Bebe', tipo: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] },
      { nome: 'Loco', tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] }
    ];
    this.todosBrinquedos = [
      'RATO', 'BOLA', 'LASER', 'CAIXA', 'NOVELO', 'SKATE'
    ];
  }

  encontraPessoas(brinq1, brinq2, ordemStr) {
    // Função para checar duplicidade e brinquedo inválido
    function validaBrinquedos(brinquedos) {
      const arr = brinquedos.split(',').map(b => b.trim());
      const set = new Set(arr);
      for (let b of arr) {
        if (!self.todosBrinquedos.includes(b)) return false;
        //verifica se o brinquedo não existe
      }
        return arr.length === set.size;
       //retorna true se não houver duplicidade
    }
    /////
    // conversão das strings em arrays
    const self = this;
    const brinquedos1 = brinq1.split(',').map(b => b.trim());
    const brinquedos2 = brinq2.split(',').map(b => b.trim());
    const ordem = ordemStr.split(',').map(a => a.trim());
    //validação dos brinquedos recebidos
    if (!validaBrinquedos(brinq1) || !validaBrinquedos(brinq2)) {
      return { erro: 'Brinquedo inválido'};
    }
    // Validação dos animais recebidos
    for (let nome of ordem) {
      const existe = this.animais.find(a => a.nome === nome);
      if (!existe) {
        return { erro: 'Animal inválido' };
      }
      else if (ordem.length !== new Set(ordem).size){
        return { erro: 'Animal inválido' };
      }
      //verifica se o animal existe e se não há duplicidade
    }
    //ordenar em ordem alfabética
    // Resultado da adoção
    let resultado = [];
    let adocoesPessoa1 = 0;
    let adocoesPessoa2 = 0;

    /*
1) O animal vai para a pessoa que mostrar todos seus brinquedos favoritos na ordem desejada
2) Uma pessoa pode intercalar brinquedos que o animal queira ou não, desde que estejam na ordem desejada
3) Gatos não dividem seus brinquedos
4) Se ambas as pessoas tiverem condições de adoção, ninguém fica com o animal (tadinho)
5) Uma pessoa não pode levar mais de três animais para casa
6) Loco não se importa com a ordem dos seus brinquedos desde que tenha outro animal como companhia
    */
let usadosPessoa1 = [];
let usadosPessoa2 = [];
let locoAdotadoPessoa1 = false;
let locoAdotadoPessoa2 = false;
let todosAnimaisVericados = false;
let locoJaVerificado = false;
//variaveis para detectar os brinquedos já usados por cada pessoa
//necessário para o caso dos gatos que não dividem brinquedos
   while(!todosAnimaisVericados){
    for (let nome of ordem) {
      let animal = this.animais.find(a => a.nome === nome);
      //seleciona o animal do array animais que tem o nome igual ao nome da iteração atual
      // Se o animal não existir (verificação extra)
      if (!animal) {
        return { erro: 'Animal inválido' };
      }
   
      if(animal.nome === 'Loco' && !locoJaVerificado){
        // Loco não se importa com a ordem dos seus brinquedos desde que tenha outro animal como companhia
        let pessoa1Tem = this.comparaBrinquedos(brinquedos1, animal.brinquedos);
        let pessoa2Tem = this.comparaBrinquedos(brinquedos2, animal.brinquedos);
          if (pessoa1Tem && pessoa2Tem) {
            resultado.push(`${nome} - abrigo`);
            locoAdotadoPessoa1 = false; // Loco não pode ser adotado se ambos podem adotá-lo
            locoAdotadoPessoa2 = false; // Loco não pode ser adotado se ambos podem adotá-lo
            continue;
          }
          if (pessoa1Tem && adocoesPessoa1 < 3) {
            //resultado.push(`${nome} - pessoa 1`);
            locoAdotadoPessoa1 = true; //marca que loco poderia ser adotado
            //variavel que salva possibilidade de adoção de loco
            adocoesPessoa1++;
            //deve ser incrementado apesar de loco não poder ser adotado no final, mas é necessário para o controle de 3 animais por pessoa
            usadosPessoa1.push(...animal.brinquedos);
          } else if (pessoa2Tem && adocoesPessoa2 < 3) {
            //resultado.push(`${nome} - pessoa 2`);
            locoAdotadoPessoa2 = true; //marca que loco poderia ser adotado
            //variavel que salva possibilidade de adoção de loco
            adocoesPessoa2++;
            //deve ser incrementado apesar de loco não poder ser adotado no final, mas é necessário para o controle de 3 animais por pessoa
            usadosPessoa2.push(...animal.brinquedos);
          } else {
            resultado.push(`${nome} - abrigo`);
            locoAdotadoPessoa1 = false; // Loco não pode ser adotado
            locoAdotadoPessoa2 = false; // Loco não pode ser adotado
          }
          continue;
        }
          // Para gatos -- não dividem brinquedos
        else if (animal.tipo === 'gato') {
          let pessoa1Tem = this.comparaBrinquedos(brinquedos1, animal.brinquedos) && animal.brinquedos.every(b => !usadosPessoa1.includes(b));
          let pessoa2Tem = this.comparaBrinquedos(brinquedos2, animal.brinquedos) && animal.brinquedos.every(b => !usadosPessoa2.includes(b));

          if (pessoa1Tem && pessoa2Tem) {
            resultado.push(`${nome} - abrigo`);
            continue;
          }
          if (pessoa1Tem && adocoesPessoa1 < 3) {
            resultado.push(`${nome} - pessoa 1`);
            adocoesPessoa1++;
            usadosPessoa1.push(...animal.brinquedos);
          } else if (pessoa2Tem && adocoesPessoa2 < 3) {
            resultado.push(`${nome} - pessoa 2`);
            adocoesPessoa2++;
            usadosPessoa2.push(...animal.brinquedos);
          } else {
            resultado.push(`${nome} - abrigo`);
          }
          continue;
        }
        else if(animal.nome !== 'Loco'){
        // Para cães e jabuti (exceto Loco)
          let pessoa1Tem = this.comparaBrinquedos(brinquedos1, animal.brinquedos);
          let pessoa2Tem = this.comparaBrinquedos(brinquedos2, animal.brinquedos);

        if (pessoa1Tem && pessoa2Tem) {
          resultado.push(`${nome} - abrigo`);
          continue;
        }
        if (pessoa1Tem && adocoesPessoa1 < 3) {
          resultado.push(`${nome} - pessoa 1`);
          adocoesPessoa1++;
          usadosPessoa1.push(...animal.brinquedos);
          // Não precisa marcar brinquedos como usados
        } else if (pessoa2Tem && adocoesPessoa2 < 3) {
          resultado.push(`${nome} - pessoa 2`);
          adocoesPessoa2++;
          usadosPessoa2.push(...animal.brinquedos);
          // Não precisa marcar brinquedos como usados
        } else {
          resultado.push(`${nome} - abrigo`);
        }

      }
      if(locoJaVerificado){todosAnimaisVericados = true;}//confima que todos os animais foram verificados
    }
      if(!locoJaVerificado){
          // Após processar todos os animais, verificar Loco
      if ((locoAdotadoPessoa1 || locoAdotadoPessoa2) && (adocoesPessoa1 || adocoesPessoa2)) {
        // Se Loco poderia ser adotado por qualquer pessoa e alguma pessoa adotou outro animal
        if(locoAdotadoPessoa1){
          resultado.push(`Loco - pessoa 1`);  
        }
        if(locoAdotadoPessoa2){
          resultado.push(`Loco - pessoa 2`);
        }
        //se o loco for adotado o loop não deve se repetir
        todosAnimaisVericados = true;
      }
      else{//se loco não pode ser adotado por nenhuma pessoa retorna tira a vaga de adoção reservada para loco
          if (!locoAdotadoPessoa1) adocoesPessoa1=0;
          if (!locoAdotadoPessoa2) adocoesPessoa2=0;
          if (!locoAdotadoPessoa1) usadosPessoa1 = [];
          if (!locoAdotadoPessoa2) usadosPessoa2 = [];
          //zera tudo e testa denovo sem o loco
          todosAnimaisVericados = false;
          resultado = resultado.filter(r => r.startsWith('Loco'));

      }

    }
    locoJaVerificado = true;
  } 
  //se Loco ja foi verificado e todos os animais não foram vcerificados o loop se repete ou seja, o loop só para quando loco for verificado e todos os animais forem verificados.

    resultado.sort(); //ordena a lista em ordem alfabética
    //deve ser feito apenas no final, para não atrapalhar a lógica de adoção, no caso dos gatos que não dividem brinquedos 
    //forem escolhidos primeiro na ordem de adoção serão deletados os brinquedos que já foram usados.
    return { lista: resultado };
  }

  comparaBrinquedos(brinquedosPessoa, brinquedosAnimal) {
    let idx = 0;
  
    for (let b of brinquedosPessoa){
      if (b === brinquedosAnimal[idx]) {
        idx++;
        if (idx === brinquedosAnimal.length) return true;//se todos do animal os brinquedos foram encontrados
      } 
      //se o brinquedo da pessoa não for o próximo do animal
      else if (brinquedosAnimal.includes(b)) {
        continue;
      }
    }
    return false;
  }
}

export { AbrigoAnimais as AbrigoAnimais };