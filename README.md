# Trabalho Final - Estrutura de Dados

## Revisão do código C++

O programa em `trabalhop final.cpp` está funcional para simular filas por prioridade (V, A, D, B) e possui:
- cadastro de chegada de pacientes;
- atendimento respeitando prioridade;
- exibição de estatísticas básicas;
- relatório no encerramento.

### Pontos positivos
- uso correto de `queue` para manter ordem FIFO em cada prioridade;
- menu simples e direto;
- cálculo de pico de lotação e espera máxima.

### Pontos de atenção
- no relatório final original, o trecho "Por prioridade" mostra **quantidade restante na fila**, não a quantidade de pacientes já atendidos por prioridade;
- não há validação para prioridade inválida no cadastro (se digitar algo diferente de V/A/D/B, paciente não entra em nenhuma fila);
- não há proteção para horários fora de faixa.

## Site (versão web)

Foi criada uma versão web em HTML/CSS/JavaScript que replica a lógica do programa:

- `index.html`: estrutura da interface;
- `styles.css`: estilo visual;
- `app.js`: lógica de filas, atendimento e relatório.

### Como executar

Como é um site estático, você pode abrir o `index.html` diretamente no navegador.

Opcionalmente, use um servidor local:

```bash
python3 -m http.server 8000
```

E acesse:

```text
http://localhost:8000
```
