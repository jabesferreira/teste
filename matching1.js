// Jogo de Correspondência - Termos Financeiros

const matchingPairs = [
    {
        term: "Liquidez",
        definition: "Facilidade de converter um ativo em dinheiro rapidamente"
    },
    {
        term: "Dividendos",
        definition: "Parte do lucro de uma empresa distribuída aos acionistas"
    },
    {
        term: "Volatilidade",
        definition: "Medida de variação do preço de um ativo ao longo do tempo"
    },
    {
        term: "Spread",
        definition: "Diferença entre o preço de compra e venda de um ativo"
    },
    {
        term: "Bull Market",
        definition: "Período de alta prolongada nos preços dos ativos"
    },
    {
        term: "Bear Market",
        definition: "Período de queda prolongada nos preços dos ativos"
    },
    {
        term: "P/L (Preço/Lucro)",
        definition: "Indicador que mostra quantos anos levaria para recuperar o investimento"
    },
    {
        term: "ROI",
        definition: "Retorno sobre Investimento - percentual de ganho ou perda"
    },
    {
        term: "Day Trade",
        definition: "Compra e venda de ativos no mesmo dia"
    },
    {
        term: "Stop Loss",
        definition: "Ordem automática para vender um ativo quando atinge determinado preço"
    }
];

// Estado do jogo
let gameState = {
    selectedTerm: null,
    selectedDefinition: null,
    correctMatches: 0,
    totalAttempts: 0,
    startTime: null,
    gameTimer: null,
    matchedPairs: new Set(),
    shuffledTerms: [],
    shuffledDefinitions: []
};

// Inicializar jogo
function initGame() {
    gameState = {
        selectedTerm: null,
        selectedDefinition: null,
        correctMatches: 0,
        totalAttempts: 0,
        startTime: Date.now(),
        gameTimer: null,
        matchedPairs: new Set(),
        shuffledTerms: [],
        shuffledDefinitions: []
    };
    
    // Embaralhar itens
    shuffleItems();
    
    // Criar elementos do jogo
    createGameElements();
    
    // Iniciar timer
    startGameTimer();
    
    // Atualizar estatísticas
    updateStats();
}

// Embaralhar itens
function shuffleItems() {
    // Criar arrays separados para termos e definições
    gameState.shuffledTerms = [...matchingPairs].sort(() => Math.random() - 0.5);
    gameState.shuffledDefinitions = [...matchingPairs].sort(() => Math.random() - 0.5);
}

// Criar elementos do jogo
function createGameElements() {
    const termsContainer = document.getElementById('termsContainer');
    const definitionsContainer = document.getElementById('definitionsContainer');
    
    // Limpar containers
    termsContainer.innerHTML = '';
    definitionsContainer.innerHTML = '';
    
    // Criar termos
    gameState.shuffledTerms.forEach((pair, index) => {
        const termElement = document.createElement('div');
        termElement.className = 'match-item term-item';
        termElement.textContent = pair.term;
        termElement.dataset.id = matchingPairs.indexOf(pair);
        termElement.onclick = () => selectTerm(termElement);
        termsContainer.appendChild(termElement);
    });
    
    // Criar definições
    gameState.shuffledDefinitions.forEach((pair, index) => {
        const definitionElement = document.createElement('div');
        definitionElement.className = 'match-item definition-item';
        definitionElement.textContent = pair.definition;
        definitionElement.dataset.id = matchingPairs.indexOf(pair);
        definitionElement.onclick = () => selectDefinition(definitionElement);
        definitionsContainer.appendChild(definitionElement);
    });
}

// Selecionar termo
function selectTerm(element) {
    if (element.classList.contains('correct') || element.classList.contains('disabled')) {
        return;
    }
    
    // Remover seleção anterior
    document.querySelectorAll('.term-item.selected').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Selecionar novo termo
    element.classList.add('selected');
    gameState.selectedTerm = element;
    
    // Verificar se há definição selecionada
    if (gameState.selectedDefinition) {
        checkMatch();
    }
}

// Selecionar definição
function selectDefinition(element) {
    if (element.classList.contains('correct') || element.classList.contains('disabled')) {
        return;
    }
    
    // Remover seleção anterior
    document.querySelectorAll('.definition-item.selected').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Selecionar nova definição
    element.classList.add('selected');
    gameState.selectedDefinition = element;
    
    // Verificar se há termo selecionado
    if (gameState.selectedTerm) {
        checkMatch();
    }
}

// Verificar correspondência
function checkMatch() {
    const termId = parseInt(gameState.selectedTerm.dataset.id);
    const definitionId = parseInt(gameState.selectedDefinition.dataset.id);
    
    gameState.totalAttempts++;
    
    if (termId === definitionId) {
        // Correspondência correta
        handleCorrectMatch();
    } else {
        // Correspondência incorreta
        handleIncorrectMatch();
    }
    
    updateStats();
}

// Lidar com correspondência correta
function handleCorrectMatch() {
    const termElement = gameState.selectedTerm;
    const definitionElement = gameState.selectedDefinition;
    
    // Marcar como correto
    termElement.classList.remove('selected');
    termElement.classList.add('correct');
    definitionElement.classList.remove('selected');
    definitionElement.classList.add('correct');
    
    // Adicionar aos pares correspondidos
    gameState.matchedPairs.add(parseInt(termElement.dataset.id));
    gameState.correctMatches++;
    
    // Criar linha de conexão visual
    createConnectionLine(termElement, definitionElement);
    
    // Limpar seleções
    gameState.selectedTerm = null;
    gameState.selectedDefinition = null;
    
    // Verificar se o jogo terminou
    if (gameState.correctMatches === matchingPairs.length) {
        setTimeout(() => {
            completeGame();
        }, 1000);
    }
}

// Lidar com correspondência incorreta
function handleIncorrectMatch() {
    const termElement = gameState.selectedTerm;
    const definitionElement = gameState.selectedDefinition;
    
    // Marcar como incorreto temporariamente
    termElement.classList.remove('selected');
    termElement.classList.add('incorrect');
    definitionElement.classList.remove('selected');
    definitionElement.classList.add('incorrect');
    
    // Remover marcação após animação
    setTimeout(() => {
        termElement.classList.remove('incorrect');
        definitionElement.classList.remove('incorrect');
    }, 1000);
    
    // Limpar seleções
    gameState.selectedTerm = null;
    gameState.selectedDefinition = null;
}

// Criar linha de conexão visual
function createConnectionLine(termElement, definitionElement) {
    const line = document.createElement('div');
    line.className = 'connection-line';
    
    // Calcular posição e tamanho da linha
    const termRect = termElement.getBoundingClientRect();
    const definitionRect = definitionElement.getBoundingClientRect();
    const containerRect = document.querySelector('.game-board').getBoundingClientRect();
    
    const startX = termRect.right - containerRect.left;
    const startY = termRect.top + termRect.height / 2 - containerRect.top;
    const endX = definitionRect.left - containerRect.left;
    const endY = definitionRect.top + definitionRect.height / 2 - containerRect.top;
    
    const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
    
    line.style.left = startX + 'px';
    line.style.top = startY + 'px';
    line.style.width = length + 'px';
    line.style.transform = `rotate(${angle}deg)`;
    line.style.transformOrigin = '0 50%';
    
    document.querySelector('.game-board').appendChild(line);
}

// Atualizar estatísticas
function updateStats() {
    document.getElementById('correctMatches').textContent = gameState.correctMatches;
    document.getElementById('totalAttempts').textContent = gameState.totalAttempts;
    
    const accuracy = gameState.totalAttempts > 0 ? 
        Math.round((gameState.correctMatches / gameState.totalAttempts) * 100) : 100;
    document.getElementById('accuracy').textContent = accuracy + '%';
    
    // Atualizar progresso
    document.getElementById('progressText').textContent = 
        `${gameState.correctMatches} de ${matchingPairs.length} correspondências`;
    
    const progress = (gameState.correctMatches / matchingPairs.length) * 100;
    document.getElementById('gameProgress').style.width = progress + '%';
}

// Timer do jogo
function startGameTimer() {
    gameState.gameTimer = setInterval(() => {
        const elapsed = Math.floor((Date.now() - gameState.startTime) / 1000);
        document.getElementById('gameTime').textContent = formatTime(elapsed);
    }, 1000);
}

// Formatar tempo
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Mostrar dica
function showHint() {
    // Encontrar um par não correspondido
    const unmatchedPairs = matchingPairs.filter((_, index) => 
        !gameState.matchedPairs.has(index)
    );
    
    if (unmatchedPairs.length === 0) {
        alert('Todas as correspondências já foram feitas!');
        return;
    }
    
    const randomPair = unmatchedPairs[Math.floor(Math.random() * unmatchedPairs.length)];
    const pairIndex = matchingPairs.indexOf(randomPair);
    
    // Destacar o par
    const termElement = document.querySelector(`.term-item[data-id="${pairIndex}"]`);
    const definitionElement = document.querySelector(`.definition-item[data-id="${pairIndex}"]`);
    
    termElement.classList.add('hint-highlight');
    definitionElement.classList.add('hint-highlight');
    
    // Mostrar modal com dica
    document.getElementById('hintContent').innerHTML = `
        <h4>💡 Dica para: "${randomPair.term}"</h4>
        <p>${getHintForTerm(randomPair.term)}</p>
    `;
    document.getElementById('hintModal').style.display = 'block';
    
    // Remover destaque após 5 segundos
    setTimeout(() => {
        termElement.classList.remove('hint-highlight');
        definitionElement.classList.remove('hint-highlight');
    }, 5000);
}

// Obter dica para termo
function getHintForTerm(term) {
    const hints = {
        "Liquidez": "Pense em quão rápido você consegue 'derreter' um ativo e transformá-lo em dinheiro.",
        "Dividendos": "É como receber uma 'fatia do bolo' dos lucros de uma empresa.",
        "Volatilidade": "Imagine uma montanha-russa - quanto mais 'louca', maior a volatilidade.",
        "Spread": "É a 'margem' ou diferença entre dois preços.",
        "Bull Market": "Touros atacam para cima - mercado em alta!",
        "Bear Market": "Ursos atacam para baixo - mercado em queda!",
        "P/L (Preço/Lucro)": "Quantos anos você levaria para 'recuperar' seu investimento?",
        "ROI": "Sigla em inglês para 'Return on Investment' - seu retorno.",
        "Day Trade": "Comprar e vender no mesmo 'dia' - daí o nome!",
        "Stop Loss": "Uma ordem para 'parar' as perdas automaticamente."
    };
    
    return hints[term] || "Este é um termo importante em finanças!";
}

// Fechar modal de dica
function closeHintModal() {
    document.getElementById('hintModal').style.display = 'none';
}

// Reiniciar jogo
function resetGame() {
    if (confirm('Tem certeza que deseja reiniciar o jogo?')) {
        // Limpar timer
        if (gameState.gameTimer) {
            clearInterval(gameState.gameTimer);
        }
        
        // Limpar linhas de conexão
        document.querySelectorAll('.connection-line').forEach(line => line.remove());
        
        // Fechar modais
        document.getElementById('completionModal').style.display = 'none';
        document.getElementById('hintModal').style.display = 'none';
        
        // Reinicializar
        initGame();
    }
}

// Completar jogo
function completeGame() {
    clearInterval(gameState.gameTimer);
    
    const totalTime = Math.floor((Date.now() - gameState.startTime) / 1000);
    const accuracy = Math.round((gameState.correctMatches / gameState.totalAttempts) * 100);
    const score = calculateScore(totalTime, accuracy);
    
    // Atualizar modal de conclusão
    document.getElementById('finalMatches').textContent = `${gameState.correctMatches}/${matchingPairs.length}`;
    document.getElementById('finalAccuracy').textContent = accuracy + '%';
    document.getElementById('finalTime').textContent = formatTime(totalTime);
    document.getElementById('finalScore').textContent = score;
    
    // Mensagem personalizada
    let message;
    if (accuracy === 100 && totalTime <= 120) {
        message = "🏆 Perfeito! Você é um expert em termos financeiros!";
    } else if (accuracy >= 90) {
        message = "🎉 Excelente! Você domina bem os conceitos financeiros!";
    } else if (accuracy >= 70) {
        message = "👍 Muito bem! Continue estudando para melhorar ainda mais!";
    } else {
        message = "📚 Bom esforço! Pratique mais para dominar os termos financeiros!";
    }
    
    document.getElementById('completionMessage').innerHTML = `<p>${message}</p>`;
    document.getElementById('completionModal').style.display = 'block';
}

// Calcular pontuação
function calculateScore(timeInSeconds, accuracy) {
    let score = accuracy * 10; // Base: precisão
    
    // Bônus por velocidade
    if (timeInSeconds <= 60) score += 200;
    else if (timeInSeconds <= 120) score += 150;
    else if (timeInSeconds <= 180) score += 100;
    else score += 50;
    
    // Bônus por eficiência (poucas tentativas)
    const efficiency = gameState.correctMatches / gameState.totalAttempts;
    if (efficiency === 1) score += 100; // Perfeito
    else if (efficiency >= 0.8) score += 50;
    
    return Math.round(score);
}

// Completar fase de correspondência
function completeMatchingPhase() {
    const totalTime = Math.floor((Date.now() - gameState.startTime) / 1000);
    const accuracy = Math.round((gameState.correctMatches / gameState.totalAttempts) * 100);
    const score = calculateScore(totalTime, accuracy);
    
    // Salvar pontuação e completar fase
    if (typeof completePhase === 'function') {
        completePhase(4, score);
    }
    
    // Ir para próxima fase
    setTimeout(() => {
        window.location.href = 'memory1.html';
    }, 1000);
}

// Voltar ao menu principal
function returnToMenu() {
    if (confirm('Tem certeza que deseja voltar ao menu? Seu progresso será perdido.')) {
        if (gameState.gameTimer) {
            clearInterval(gameState.gameTimer);
        }
        window.location.href = '../index.html';
    }
}

// Eventos de teclado
document.addEventListener('keydown', function(e) {
    // Dica com H
    if (e.key.toLowerCase() === 'h') {
        showHint();
    }
    
    // Reiniciar com R
    if (e.key.toLowerCase() === 'r') {
        resetGame();
    }
    
    // Embaralhar com S
    if (e.key.toLowerCase() === 's') {
        shuffleItems();
        createGameElements();
    }
    
    // Voltar ao menu com Escape
    if (e.key === 'Escape') {
        returnToMenu();
    }
});

// Fechar modais clicando fora
window.onclick = function(event) {
    const completionModal = document.getElementById('completionModal');
    const hintModal = document.getElementById('hintModal');
    
    if (event.target === completionModal) {
        completionModal.style.display = 'none';
    }
    if (event.target === hintModal) {
        closeHintModal();
    }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    initGame();
});

// Exportar funções para uso global
window.selectTerm = selectTerm;
window.selectDefinition = selectDefinition;
window.showHint = showHint;
window.closeHintModal = closeHintModal;
window.shuffleItems = shuffleItems;
window.resetGame = resetGame;
window.completeMatchingPhase = completeMatchingPhase;
window.returnToMenu = returnToMenu;

