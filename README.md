# MongoDB Consultas e Comandos Essenciais - ShowBank

Este repositório contém uma coletânea de consultas, comandos e exemplos de operações realizadas no MongoDB. 

## 📁 Conteúdo

O repositório reúne comandos organizados por categorias, incluindo:

### 🔍 Consultas Básicas
- Verificar versão do MongoDB
- Informações do host e banco atual
- Estatísticas do banco
- Filtragens simples com `find()` e operadores de comparação

### 📥 Importação de Dados
- Exemplos de uso do `mongoimport` com arquivos `.csv` e `.json`

### ⚙️ Operadores
- **Comparação**: `$eq`, `$ne`, `$gt`, `$lt`, etc.
- **Lógicos**: `$and`, `$or`, `$not`
- **Elementos**: `$exists`, `$type`
- **Matrizes**: `$all`, `$size`, `$elemMatch`
- **Condicionais**: `$cond`, `$ifNull`, `$switch`

### 📊 Agregações
- Uso do `aggregate()` com estágios como:
  - `$match`, `$group`, `$project`, `$sort`, `$limit`, `$skip`, `$unwind`
- Estatísticas como média, soma, máximo, mínimo
- Operações com datas: `$year`, `$month`, `$dayOfWeek`, `$dateToParts`

### 🧪 Transformações e Cálculos
- Operadores aritméticos: `$multiply`, `$divide`, `$round`, `$trunc`
- Operadores de string: `$concat`, `$split`, `$toUpper`, `$toLower`

### 🔄 Atualizações
- `updateOne()`, `updateMany()`
- `findAndModify()`, `findOneAndUpdate()`, `findOneAndReplace()`
- Adição, modificação, renomeação e remoção de campos

### 🗑️ Exclusões
- `findOneAndDelete()` com filtros e ordenações

### 🔗 Junções de Dados
- `$lookup` para relacionar documentos entre coleções
- `$unionWith` para unir documentos de diferentes coleções
