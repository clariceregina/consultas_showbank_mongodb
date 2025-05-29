// verificar versão do MongoDB
db.version()

// obter informações do host em que o servidor está instalado
db.hostInfo()

// buscar o nome do banco de dados atual
db.getName()

// obter informações do status do banco de dados
db.stats()

// lista detalhada de todos os comandos nativos do MongoDB
db.listCommands()

// Mostra comandos básicos de uso do db
db.help()

// importar arquivo .csv e .json utilizando mongoimport pela linha de comando (após baixar MongoDB Command Line Database Tools Download e acessar diretório em que está o arquivo mongoimport)
C:\Program Files\MongoDB\Tools\bin>mongoimport.exe --db=showbank --collection=Contas --type=csv --headerline --file=C:\Curso\Contas.csv

C:\Program Files\MongoDB\Tools\bin>mongoimport.exe --db=showbank --collection=Clientes --file=C:\Curso\Clientes.json --jsonArray //arquivos .json não precisa especificar o type porque já são o padrão do MongoDB

// filtrar primeiro documento da coleção Clientes
db.Clientes.findOne()

// renomear a coleção Endereço para padronizar as coleções
db.Endereco.renameCollection("Enderecos")

// operadores de comparação ($eq, $ne, $gt, $gte, $lt, $lte, $in, $nin)

// filtrar na coleção Clientes apenas documentos com "gênero" igual a "masculino"
db.Clientes.find({"genero": "Masculino"})
db.Clientes.find({"genero": {$eq: "Masculino"}})

// filtrar na coleção Contas apenas documentos com "valor" maior que 9000
db.Contas.find({"valor": {$gt: 9000}})

// filtrar na coleção Contas apenas documentos com "valor" menor que 1000
db.Contas.find({"valor": {$lt: 1000}})

// filtrar na coleção Clientes documentos com "status_civil" igual a "Viúvo(a)" ou "Casado(a)"
db.Clientes.find({"status_civil": {$in: ["Viúvo(a)", "Casado(a)"]}})

// filtrar na coleção Contas somente documentos com "valor" maior que 5000 e menor que 8000
db.Contas.find({"valor": {$gt: 5000, $lt: 8000}})

// operadores lógicos ($and, $or, $nor, $not)

// filtrar na coleção Contas somente documentos com "tipo" igual a "Conta salário" e "valor" maior que 9000
db.Contas.find({$and: [{"tipo": {$eq: "Conta salário"}}, {"valor": {$gt: 9000}}]})

// filtrar na coleção Contas somente documentos com "tipo" igual a "Conta salário" ou "valor" maior que 9000
db.Contas.find({$or: [{"tipo": {$eq: "Conta salário"}}, {"valor": {$gt: 9000}}]})

// filtrar na coleção Enderecos somente documentos com estado diferente de SP
db.Enderecos.find({"estado": {$not: {$eq: "SP"}}})

// operadores de elemento ($exists, $type)

// filtrar na coleção Clientes somente documentos que não contenham "dependentes"
db.Clientes.find({"dependentes": {$exists: false}})

// filtrar na coleção Clientes somente documentos que contenham "dependentes"
db.Clientes.find({"dependentes": {$exists: true}})

// filtrar na coleção Clientes somente documentos que contenham "seguros" de tipo string (2)
db.Clientes.find({"seguros": {$type: 2}})

// operadores de matriz ($all, $elemMatch, $size, $, $[], $[<ident>])

// filtrar na coleção Clientes somente documentos que contenham "seguros" com os valores "seguro de vida" e "seguro para carro"
db.Clientes.find({"seguros": {$all: ["seguro de vida", "seguro para carro"]}})

// filtrar na coleção Clientes somente documentos que contenham em "dependentes" uma matriz de dependência (array) com dois elementos
db.Clientes.find({"dependentes": {$size: 2}})

// filtrar os clientes que possuem dois dependentes e projetar que apenas um dependente seja retornado
db.Clientes.find({"dependentes": {$size: 2}}, {"dependentes": {$slice: 1}})

// retornar somente os campos "tipo", "cpf" e "valor" das contas com valor maior ou igual a 2500
db.contas.find({"valor": {$gte: 2500}}, {"cpf": 1, "tipo": 1, "valor": 1, "_id":0})

// ------

// retornar somente 5 resultados da coleção contas
db.contas.find().limit(5)

// solicitar que os 200 primeiros resultados sejam pulados
db.contas.find().skip(200)

// retornar somente 25 resultados da coleção contas a partir do documento 150
db.contas.find().skip(150).limit(25)

// retornar a consulta acima ordenada pelos valores em ordem crescente e decrescente
db.contas.find().sort({ "valor":1 }).skip(150).limit(25)
db.contas.find().sort({ "valor":-1 }).skip(150).limit(25)

// contar quantos documentos a coleção clientes possui
db.clientes.countDocuments() //forma moderna
db.clientes.count()
db.clientes.find().count()

// retornar, de forma distinta, quais tipos de contas existem
db.contas.distinct("tipo")

// Considerando a tabela de clientes, execute uma consulta onde será retornado apenas os clientes onde o status civil seja igual a "Separado(a)"
db.clientes.find({"status_civil": "Separado(a)"})

// Execute uma consulta na coleção de contas, onde apenas os documentos que não possuem o campo de valor sejam retornados.
db.contas.find({"valor": {$exists: false}})

// Realize uma consulta na coleção de clientes, onde será retornado apenas os documentos onde o campo de dependentes possua apenas 1 elemento; desse modo, retornando apenas os 5 primeiros documentos que corresponderem ao filtro.
db.clientes.find({"dependentes": {$size: 1}}).limit(5)

// Execute uma consulta na coleção de contas, onde apenas os documentos que possuem o tipo da conta igual a conta salário ou conta poupança, ou o valor seja maior ou igual a 8500 sejam retornados.
db.contas.find({
  $or: [
    { "tipo": { $in: ["Conta salário", "Conta poupança"] } },
    { "valor": { $gte: 8500 } }
  ]
})

// Busque os documentos na coleção de clientes, onde o status civil seja igual a "Solteiro(a)" e o cliente possua algum tipo de seguro. No final, ordene a saída dos documentos de forma crescente pelo nome.
db.clientes.find({
    $and: [
        {"status_civil": "Solteiro(a)"},
        {"seguros": {$exists: true}}
    ]
}).sort({"nome" : 1 })

// utilizar o método aggregate() com o estágio $count para contar a quantidade de documentos da coleção clientes
db.clientes.aggregate({$count: "contagem de clientes"})

// utilizar o estágio $group com o método aggregate() para  agrupar os documentos de acordo com uma chave de grupo ("tipo")
db.contas.aggregate({$group: { _id: "$tipo"}})

// realizar uma contagem dos documentos existentes e agrupar a contagem pelo tipo
db.contas.aggregate({$group: { _id: "$tipo", contagem: {$count: {}}}})

// contar quantas contas há em cada agência na coleção contas
db.contas.aggregate({
    $group: { 
        _id: "$agencia",
        quantidade: {$count: {}}
    }
}).sort({"quantidade": -1})

// utilizar aggregate com o estágio $limit para limitar o retorno aos 5 primeiros documentos
db.contas.aggregate({$limit: 5})

// utilizar aggregate com o estágio $skip para pular os 10 primeiros documentos
db.contas.aggregate({$skip: 10})

// utilizar aggregate com o estágio $sort para ordenar de forma crescente
db.contas.aggregate([{
    $sort: {valor: 1}
}])

// utilizar aggregate com o estágio $skip para pular os 10 primeiros documentos e $limit para limitar o retorno aos 5 primeiros 
db.contas.aggregate([
    {$skip: 10},
    {$limit: 5}
])

// utilizar aggregate com o estágio $skip para pular os 10 primeiros documentos, $limit para limitar o retorno aos 5 primeiros e $sort para ordenar em ordem decrescente
db.contas.aggregate([
    {$sort: {valor: -1}},
    {$skip: 10},
    {$limit: 5}
])

// "retirar" as informações sobre seguros dos clientes de dentro do array
db.clientes.aggregate([{$unwind:"$seguros"}])

// "retirar" as informações sobre seguros dos clientes de dentro do array e realizar uma contagem por gênero utilizando $sortByCount, mesmo que uma só pessoa possa ter mais de um seguro
db.clientes.aggregate([
    {$unwind: "$seguros"},
    {$sortByCount: "$genero"}
])

// retornar da coleção de endereço apenas os endereços em que a cidade seja Recife
db.enderecos.aggregate([
    {$match: {"cidade": "Recife"}}
])

// retornar apenas os documentos cujo tipo seja conta salário e o valor maior que 3500 da coleção contas
db.contas.aggregate([
    {$match: {
        $and: [
            {"tipo": "Conta salário"},
            {"valor": {$gt: 3500}}
            ]
    }}
])

// retornar apenas os documentos cujo tipo seja conta salário e o valor maior que 8500 da coleção contas. Por fim, realizar a contagem por tipo
db.contas.aggregate([
    {$match: {
        $and: [
            {"tipo": "Conta salário"},
            {"valor": {$gt: 8500}}
            ]
    }},
    {$group: { _id: "$tipo", contagem: {$sum: 1}}}
])

// consultar na coleção clientes a quantidade de "seguro de vida" na matriz(array) "seguros"
db.clientes.aggregate([
    {$unwind: "$seguros"},
    {$match: {"seguros": "seguro de vida"}},
    {$count: "contagem"}
])

// juntar as informações da coleção clientes e da coleção contas
db.clientes.aggregate([
    {$lookup: {
           from: "contas",
           localField: "cpf",
           foreignField: "cpf",
           as: "clientes_contas"
         }}
])

// juntar as informações da coleção clientes e da coleção contas, retirar os campos de id, data de nascimento, gênero e profissão e retornar os 5 primeiros resultados
db.clientes.aggregate([
    {$lookup: {
           from: "contas",
           localField: "cpf",
           foreignField: "cpf",
           as: "clientes_contas"
    }},
    {$project: {"_id": 0, "data_nascimento": 0, "genero": 0, "profissao": 0}},
    {$limit: 5}
])

// juntar em um fluxo contínuo as tabelas clientes e contas (nesse caso, como clientes e contas têm estruturas diferentes, o resultado final será uma mistura de campos diferentes)

db.clientes.aggregate([
  { $project: { _id: 0 } },
  { $unionWith: "contas" }
])

// Utilizando a coleção de endereços, busque os documentos onde a cidade seja igual a Aracaju.
db.enderecos.aggregate([
    {$match: {"cidade": "Aracaju"}}
])

// Busque na coleção de contas, os 5 primeiros documentos onde o tipo da conta é igual a conta corrente.
db.contas.aggregate([
    {$match: {"tipo": "Conta corrente"}},
    {$limit: 5}
])

// Dada a coleção de clientes, crie uma consulta que calcule a quantidade de pessoas que possuem a profissão "Analista de sistemas".
db.clientes.aggregate( [
  { $match: { profissao:{ $eq:"Analista de sistemas"}} },
  {$group:{_id:"$profissao",contagem:{$count:{}}}}
] )

// Execute uma consulta na coleção de clientes, onde serão retornados os campos de nome e status civil para os 5 primeiros documentos onde o status civil é igual a solteiro(a). Sendo que a saída deve ser ordenada pelo nome dos clientes. (utilize a ordem de estágios em um pipeline de agregação)
db.clientes.aggregate([
    {$match: {"status_civil": "Solteiro(a)"}},
    {$sort: {"nome": 1}}
    {$limit: 5},
    {$project: {"nome": 1, "status_civil": 1, "_id": 0}}
])

// Realize uma consulta na coleção de contas, buscando os documentos que possuírem o tipo igual a conta salário ou o valor seja menor que 2000, retornando apenas o campo de cpf, tipo e valor ordenados pelo campo de valor.
db.contas.aggregate([
    {$match: {
        $or:
        [
            {"tipo": "Conta salário"},
            {"valor": {$lt: 2000}}
        ]
    }},
    {$project: {"_id": 0, "cpf": 1, "tipo": 1, "valor": 1}},
    {$sort: {"valor": 1}}
])

// criar um campo que retorne diversos documentos com o campo de "valor" com um número aleatório entre 0 e 1
db.clientes.aggregate([{
    $project: {_id: 0, "valor": {$rand: {}}}
}])

// criar um campo que retorne diversos valores aleatórios entre 0 e 1 e sortear somente 5 documentos para mostrar
db.clientes.aggregate([
  { $addFields: { randomValue: { $rand: {} } } },
  { $sort: { randomValue: 1 } },
  { $limit: 5 },
  { $project: { randomValue: 0 } }
])

// retornar um documento para cada cliente da coleção, contendo apenas um campo chamado valorRound que arredonda $rand para 1 ou 0
db.clientes.aggregate({
    $project: {
        _id: 0,
        valorRound: {$round: {$rand: {}}}
    }
})

// retornar um documento para cada cliente da coleção, contendo apenas um campo chamado valorRound que arredonda $rand para 3 casas decimais
db.clientes.aggregate({
    $project: {
        _id: 0,
        valorRound: {$round: [{$rand: {}},3]}
    }
})

// retornar um documento para cada cliente da coleção, contendo apenas um campo chamado valorTrunc que trunca $rand na 3a casa decimal
db.clientes.aggregate({
    $project: {
        _id: 0,
        valorTrunc: {$trunc: [{$rand: {}},3]}
    }
})

// verificar os tipos de dados do campo valor na coleção contas
db.contas.aggregate([
  {
    $project: {
      valor: 1,
      tipo: { $type: "$valor" }
    }
  }
])

// selecionar o campo valor e criar campo com valor dividido por 2
db.contas.aggregate([
  {
    $match: {
      valor: { $type: "double" } // Garante que só entra número
    }
  },
  {
    $project: {
      _id: 0,
      valor: 1,
      dividido: { $divide: ["$valor", 2] }
    }
  }
])

// operadores aritméticos ($multiply, $divide, $round)

// selecionar o campo valor e criar campo com valor multiplicado por 2
db.contas.aggregate([
{
    $match: {
    valor: { $type: "double" } // Garante que só entra número
  }},
  {
    $project: {
      _id: 0,
      valor: 1,
      multiplicado: { $multiply: ["$valor", 2] }
    }
  }
])

// concatenar as strings nome e cpf da coleção clientes
db.clientes.aggregate([
    {$project: {
        descricao: {$concat: ["$nome"," - ", "$cpf" ]}
        }
    }
])

// operadores de string ($split, $toLower, $toUpper, $concat)

// separar a string "nome" em uma matriz
db.clientes.aggregate([
    {$project: {
        descricao: {$split: ["$nome"," "]}
        }
    }
])

// converter as letras de "nome" para minúsculas
db.clientes.aggregate([
    {$project: {
        descricao: {$toLower: ["$nome"]}
        }
    }
])

// converter as letras de "nome" para MAIÚSCULAS
db.clientes.aggregate([
    {$project: {
        descricao: {$toUpper: ["$nome"]}
        }
    }
])

// converter o campo "valor" de double para string
db.contas.aggregate({
   $project:{
         valor:{
                 $toString:"$valor"
             }
      }
})

// concatenar tipos diferentes de dados
db.contas.aggregate({
   $project:{
         "descrição":{
                 $concat:[
                     "O cliente de CPF ", "$cpf", " possui o valor de R$ ", {$toString: "$valor"}, " na " "$tipo"
                 ]
             }
      }
})

// operadores de datas ($year, $month, $dayOfWeek)

// extrair o ano das datas de nascimento
db.clientes.aggregate([{
    $project: {
        "ano": {$year: "$data_nascimento"}
    }
}])

// extrair o mês das datas de nascimento
db.clientes.aggregate([{
    $project: {
        "nome": 1,
        "mês": {$month: "$data_nascimento"}
    }
}])

// extrair o dia da semana das datas de nascimento
db.clientes.aggregate([{
    $project: {
        "nome": 1,
        "dia_semana": {$dayOfWeek: "$data_nascimento"}
    }
}])

// extrair a data em partes das datas de nascimento
db.clientes.aggregate([{
    $project: {
        "nome": 1,
        "data": {
            $dateToParts: {date: "$data_nascimento"}
        }
    }
}])

// operadores acumuladores ($avg, $max, $min, $sum)

// calcule a média de valores das contas de acordo com o tipo de conta
db.contas.aggregate([{
    $group: { 
        _id: "$tipo",
        media:{
            $avg: "$valor"
        }
    }
}])

// calcule o valor máximo de valores das contas de acordo com o tipo de conta
db.contas.aggregate([{
    $group: { 
        _id: "$tipo",
        valor_maximo:{
            $max: "$valor"
        }
    }
}])

// calcule o valor mínimo de valores das contas de acordo com o tipo de conta
db.contas.aggregate([{
    $group: { 
        _id: "$tipo",
        valor_minimo:{
            $min: "$valor"
        }
    }
}])

// realizar contagem das contas existentes por tipo
db.contas.aggregate([{
    $group: { 
        _id: "$tipo",
        contagem:{
            $count: {}
        }
    }
}])

db.contas.aggregate([{
    $group: { 
        _id: "$tipo",
        contagem:{
            $sum: 1
        }
    }
}])

// retornar o valor total por tipo de conta
db.contas.aggregate([{
    $group: { 
        _id: "$tipo",
        total:{
            $sum: "$valor"
        }
    }
}])

// retornar apenas as informações agregadas do campo valor, de modo que retorne as informações de soma, média, o valor máximo, o valor mínimo dos valores armazenados neste campo
db.contas.aggregate([
    {$group:{
        _id:null,
        Soma:{$sum:"$valor"},
        Media:{$avg:"$valor"},
        Maximo:{$max:"$valor"},
        Minimo:{$min:"$valor"}
    }
},{
    $project: {
      _id: 0    }  }
])

// operadores de condicional ($cond, $ifNull, $switch)

// retorne verdadeiro quando o valor for maior ou igual a 8000 e falso quando o valor for menor
db.contas.aggregate([{
    $project: {
        cpf: 1,
        tipo: 1,
        "valores": {
            $cond: [{
                $gte: ["$valor", 8000]}, true, false
                ]
            }
        }
    }
}])

// retornar "não especificado" para os valores null
db.contas.aggregate([{
    $project: {
        "valor": {
            $ifNull: [ "$valor", "Não especificado" ]
        }
    }
}])

// aplique algumas condições com relação aos valores da coleção contas: 
// valor <= 3000 -> valor abaixo do esperado
// 6000 =< valor > 3000 -> valor na média
// valor > 6000 -> valor acima do esperado
db.contas.aggregate([
  {
    $project: {
      valor: 1,
      condição: {
        $switch: {
          branches: [
            {
              case: { $lte: ["$valor", 3000] },
              then: "valor abaixo do esperado"
            },
            {
              case: { $and: [ { $gt: ["$valor", 3000] }, { $lte: ["$valor", 6000] } ] },
              then: "valor na média"
            }
          ],
          default: "valor acima do esperado"
        }
      }
    }
  }
])

// inserir um campo de seguro para um cliente que não possuia
db.clientes.updateOne(
    {"_id": 1},
    {$push: {"seguros": "seguro de vida"}}
)

// alterar nome do campo cpf para CPF
db.clientes.updateMany({}, {$rename: {"cpf": "CPF"}})

// remover o valor de 2000 do campo "valor" de determinado cliente na coleção contas
db.contas.updateOne({"cpf":"410.436.439-82"},{$inc: {"valor": -2000}})

// remover o campo "valor" de determinado cliente
db.contas.updateOne(
    {_id:34},
    {$unset: {"valor": ""}
)

db.contas.findAndModify(
    {query:{_id:34}, 
    update:{$unset:{valor:""}},
}) // retorna documento antigo

db.contas.findAndModify(
    {query:{_id:34}, 
    update:{$unset:{valor:""}},
    new:true // retorna documento atualizado
})

// acrescentar o campo valor a determinado cliente
db.contas.findAndModify(
    {query:{_id:34}, 
    update:{$inc:{valor:1200}},
    new:true
})

// ordenar os valores e selecionar o primeiro deles para atualizar o valor (útil quando é necessário atualizar um único documento sendo que vários correspondem à consulta)
db.contas.findAndModify({
    query:{valor:{$lt:500}},
    sort:{valor:1},
    update:{$inc:{valor:1000}},
    new:true
})

// modificar o valor do campo valor de determinado cliente e retornar o novo documento
db.contas.findOneAndUpdate(
    {_id:34},
    {$set:{valor:5145.86}},
    {returnNewDocument:true}
)

// substituir todas as informações de determinado documento
db.clientes.findOneAndReplace(
    {_id:4},
    {"nome": "Geraldo Benedito Ian",
    "data_nascimento": ISODate("1977-06-02T18:00:00.000-03:00"),
    "genero": "Masculino",
    "profissao": "Operador",
    "status_civil": "Viúvo(a)",
    "CPF": "845.939.560-05"})

db.clientes.findOneAndReplace(
    {_id:4},
    {"nome": "Geraldo Benedito Ian",
    "data_nascimento": ISODate("1977-06-02T18:00:00.000-03:00"),
    "genero": "Masculino",
    "profissao": "Operador",
    "status_civil": "Viúvo(a)",
    "CPF": "845.939.560-05"},
    {projection:{nome:1, profissao:1},
    returnNewDocument:true
    })

// buscar determinado documento e excluí-lo
db.contas.find({valor:{$lt:100}}).sort({valor:1}) // para verificar que estamos selecionando corretamente

db.contas.findOneAndDelete({valor:{$lt:100}},{sort:{valor:1}})Cop
