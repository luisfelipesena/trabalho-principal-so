# Simulador de Escalonamento de Processos e Gerenciamento de Memória

## Visão Geral

Este projeto é um simulador interativo de escalonamento de processos e gerenciamento de memória, desenvolvido em React e TypeScript. Ele permite aos usuários experimentar diferentes algoritmos de escalonamento e substituição de páginas, visualizando os resultados em tempo real.

## Funcionalidades

1. **Entrada de Processos**: Os usuários podem adicionar processos com tempo de chegada, tempo de execução, deadline e número de páginas.

2. **Algoritmos de Escalonamento**:
   - FIFO (First-In-First-Out)
   - SJF (Shortest Job First)
   - Round Robin
   - EDF (Earliest Deadline First)

3. **Algoritmos de Substituição de Páginas**:
   - FIFO (First-In-First-Out)
   - LRU (Least Recently Used)

4. **Visualizações**:
   - Lista de Processos
   - Gráfico de Gantt
   - Gráfico de Uso de Memória

## Como Usar

1. Clone o repositório
2. Instale as dependências com `npm install`
3. Execute o projeto com `npm start`
4. Acesse o simulador no navegador em `http://localhost:5173`

## Estrutura do Projeto

- `src/components`: Componentes React
- `src/algorithms`: Implementações dos algoritmos de escalonamento e substituição de páginas
- `src/models`: Definições de tipos para Process e Page
- `src/utils`: Constantes e funções auxiliares

## Componentes Principais

- `ProcessInput`: Permite a entrada de novos processos
- `ProcessList`: Exibe a lista de processos adicionados
- `Scheduler`: Gerencia o escalonamento de processos
- `PageReplacement`: Gerencia a substituição de páginas
- `GanttChart`: Visualiza o escalonamento de processos
- `MemoryUsageChart`: Visualiza o uso de memória (RAM vs. Disco)

## Algoritmos

### Escalonamento
- `FIFO`: Executa os processos na ordem de chegada
- `SJF`: Prioriza processos com menor tempo de execução
- `RoundRobin`: Alterna entre processos em intervalos de tempo fixos
- `EDF`: Prioriza processos com deadline mais próximo

### Substituição de Páginas
- `FIFO`: Substitui a página mais antiga na memória
- `LRU`: Substitui a página menos recentemente usada

## Testes

O projeto inclui testes unitários para os algoritmos. Execute-os com `npm test`.

## Inputs de teste

(FIFO)
Processo 1 - Tempo de chegada: 0 - Tempo de execução: 10 - Deadline: 20
Processo 2 - Tempo de chegada: 2 - Tempo de execução: 5 - Deadline: 15
Processo 3 - Tempo de chegada: 4 - Tempo de execução: 8 - Deadline: 25