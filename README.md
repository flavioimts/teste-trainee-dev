# Relatório Técnico

## Visão Geral

Este relatório técnico apresenta uma análise detalhada do projeto de desenvolvimento de um sistema de gerenciamento de tarefas. O objetivo principal deste projeto é criar uma plataforma que permita aos usuários criar, gerenciar e acompanhar tarefas de forma eficiente.

O trabalho foi dividido em três etapas principais:

1. **Erro de Inicialização**: Nesta etapa, foram identificados e corrigidos erros que impediam o funcionamento adequado do sistema.
2. **Correção de Erros**: Nesta etapa, foram identificados e corrigidos erros no código existente, garantindo a estabilidade e a funcionalidade do sistema.
3. **Implementação de Melhorias**: Nesta etapa, foram implementadas melhorias no código existente, incluindo a adição de novos recursos e a otimização da interface do usuário.

## Como executar a aplicação

Clone o repositório:
```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
```

Instale as dependências:
```bash
npm install
```

Inicie a aplicação:
```bash
npm start
```

Acesse a aplicação em seu navegador:
`http://localhost:4200/`

## Correções para o erro de inicialização

**1. Ausência do script "start" no package.json**
* **Descrição:** O arquivo package.json não continha o script "start" na seção de "scripts".
* **Correção:** Adicionei a linha "start": "ng serve" ao objeto de scripts, configurando o comando padrão do Angular para iniciar a aplicação.

**2. Dependências não instaladas ou com referências incorretas**
* **Descrição:** O processo de build apresentava falhas ao tentar localizar bibliotecas (como fontawesome-free) que não estavam instaladas ou cujos caminhos no arquivo angular.json estavam incorretos.
* **Correção:** Instalei as dependências faltantes via npm install e corrigi os caminhos na seção styles do angular.json para garantir que os arquivos CSS fossem encontrados corretamente pelo compilador.

**3. Nome incorreto da classe no HeaderComponent**
* **Descrição:** No arquivo header.component.ts, a classe estava nomeada erroneamente como "HeadeComponent", impedindo o Angular de reconhecer e compilar o componente.
* **Correção:** Ajustei o nome da classe para "HeaderComponent", alinhando-o às convenções e às referências usadas no projeto.

**4. Falta de importação do TodoService em new-task.component.ts**
* **Descrição:** O componente NewTaskComponent utilizava o serviço TodoService para adicionar tarefas, porém o serviço não estava importado, causando erro de referência.
* **Correção:** Implementei a importação correta do TodoService no início do arquivo e realizei a injeção do serviço via construtor, solucionando a dependência.

## Correções para erros no código existente (QA)

**1. Método 'addTodo' duplicado**

* Erro: Existiam duas implementações do método addTodo no código, causando conflito e comportamento imprevisível.

* Solução: Removida a duplicação, mantendo apenas uma implementação consistente e funcional do método addTodo.

**2. Variável 'count' interferindo na adição de tarefas**

* Erro: A variável count era utilizada para controle, porém sua remoção junto ao incremento e a verificação if(this.count > 0) return impedia a adição de novas tarefas.

* Solução: Eliminada a variável count e a condição que bloqueava a adição, permitindo que novas tarefas sejam adicionadas normalmente.

**3. Alteração no texto de retorno do método 'labelClearAll'**

* Erro: O texto retornado pelo método labelClearAll estava inadequado ou incorreto.

* Solução: Ajustado o texto para refletir corretamente a ação ou o estado esperado, melhorando a clareza da interface.

**4 e 5. Alteração na lógica de exibição do texto do botão**

* Erro: O texto do botão não refletia corretamente o estado ou ação disponível, causando confusão no usuário.

* Solução: Revisada e ajustada a lógica para que o texto do botão seja dinâmico e coerente com o contexto atual (ex: “Limpar todas” vs “Limpar concluídas”).

**6. Confirmação para limpar tarefas concluídas**

* Erro: Não havia confirmação ao usuário ao limpar tarefas concluídas, o que poderia causar exclusão acidental.

* Solução: Implementado um diálogo de confirmação para que o usuário confirme antes da remoção definitiva das tarefas concluídas.

**7. Correção na lógica para limpar somente tarefas concluídas**

* Erro: A função responsável por limpar tarefas apagava todas as tarefas, não apenas as concluídas.

* Solução: Ajustada a lógica para que apenas as tarefas com status concluído sejam removidas, preservando as demais.

**8. Implementação do recurso de edição de tarefas**

* Erro: O sistema não permitia editar o texto das tarefas após a criação.

* Solução: Adicionado recurso que possibilita ao usuário editar o título das tarefas já criadas, melhorando a usabilidade.

**9. Alinhamento dos botões de ações**

* Erro: Os botões de ação estavam desalinhados, prejudicando a estética e usabilidade da interface.

* Solução: Ajustado o CSS para alinhar corretamente os botões, proporcionando uma interface mais limpa e organizada.

**10. Remoção do estilo inline da cor preta no botão de exclusão**

* Erro: O botão de exclusão tinha um estilo inline fixo que definia a cor preta, dificultando customizações via CSS.

* Solução: Removido o estilo inline para permitir controle total da aparência pelo CSS externo, facilitando ajustes futuros.

**11. Definição da propriedade 'overflow-y: auto' na classe 'todo-list_container'**

* Erro: A lista de tarefas não estava com rolagem automática, o que podia prejudicar a visualização quando a lista fosse longa.

* Solução: Adicionado overflow-y: auto para permitir rolagem vertical quando o conteúdo ultrapassa o tamanho do container.

**12 e 13. Impedir adição de tarefas com título vazio**

* Erro: Era possível adicionar tarefas sem título, causando registros inválidos.

* Solução: Implementada validação para impedir a criação de tarefas com título vazio ou em branco, garantindo a integridade dos dados.

## Melhorias aplicadas

**1. Ordenação das tarefas de A a Z**

* Melhoria: As tarefas passaram a ser exibidas em ordem alfabética crescente, facilitando a localização e organização visual dos itens na lista.

* Benefício: Usuários encontram tarefas rapidamente e a interface ganha uma aparência mais limpa e organizada.

**2. Adicionar tarefa pressionando a tecla 'Enter'**

* Melhoria: Implementado atalho para criação de uma nova tarefa ao pressionar a tecla Enter enquanto o campo de entrada está ativo.

* Benefício: Aumenta a fluidez e agilidade no uso da aplicação, tornando a interação mais intuitiva e rápida.

**3. Substituição dos alertas e confirmações nativas pela biblioteca 'SweetAlert'**

* Melhoria: Todos os diálogos de alerta e confirmação do sistema foram trocados pelas janelas estilizadas e personalizáveis da biblioteca SweetAlert.

* Benefício: A interface ganhou uma melhor experiência do usuário, com mensagens mais claras e esteticamente agradáveis.