// Jogo da Memória - Conceitos Financeiros

const memoryPairs = [
    { icon: "💰", text: "Dinheiro" },
    { icon: "📈", text: "Investimento" },
    { icon: "🏦", text: "Banco" },
    { icon: "💳", text: "Cartão" },
    { icon: "📊", text: "Gráfico" },
    { icon: "🎯", text: "Meta" },
    { icon: "⏰", text: "Tempo" },
    { icon: "🔒", text: "Segurança" },
    { icon: "💎", text: "Valor" },
    { icon: "🚀", text: "Crescimento" },
    { icon: "⚖️", text: "Equilíbrio" },
    { icon: "🎲", text: "Risco" }
];

// Estado do jogo
let gameState = {
    difficulty: 'easy', // easy = 4x4, hard = 4x6
    cards: [],
    flippedCards: [],
    matchedPairs: 0,
    attempts: 0,
    matches: 0,
    startTime: null,
    gameTimer: null,
    isProcessing: false
};

// Inicializar jogo
function initGame() {
    gameState = {
        difficulty: gameState.difficulty, // Manter dificuldade selecionada
        cards: [],
        flippedCards: [],
        matchedPairs: 0,
        attempts: 0,
        matches: 0,
        startTime: Date.now(),
        gameTimer: null,
        isProcessing: false
    };
    
    createGameBoard();
    startGameTimer();
    updateStats();
}

// Criar tabuleiro do jogo
function createGameBoard() {
    const board = document.getElementById('memoryBoard');
    const totalPairs = gameState.difficulty === 'easy' ? 8 : 12;
    
    // Configurar grid
    board.className = `memory-board ${gameState.difficulty}`;
    
    // Selecionar pares para o jogo
    const selectedPairs = memoryPairs.slice(0, totalPairs);
    
    // Criar array de cartas (cada par aparece duas vezes)
    const cards = [];
    selectedPairs.forEach((pair, index) => {
        cards.push({ ...pair, id: index, type: 'icon' });
        cards.push({ ...pair, id: index, type: 'text' });
    });
    
    // Embaralhar cartas
    gameState.cards = shuffleArray(cards);
    
    // Limpar tabuleiro
    board.innerHTML = '';
    
    // Criar elementos das cartas
    gameState.cards.forEach((card, index) => {
        const cardElement = createCardElement(card, index);
        board.appendChild(cardElement);
    });
}

// Criar elemento de carta
function createCardElement(card, index) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'memory-card';
    cardDiv.dataset.index = index;
    cardDiv.onclick = () => flipCard(index);
    
    const cardInner = document.createElement('div');
    cardInner.className = 'card-inner';
    
    const cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    cardFront.textContent = '?';
    
    const cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    cardBack.textContent = card.type === 'icon' ? card.icon : card.text;
    
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    cardDiv.appendChild(cardInner);
    
    return cardDiv;
}

// Embaralhar array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Virar carta
function flipCard(index) {
    if (gameState.isProcessing || 
        gameState.flippedCards.length >= 2 || 
        gameState.flippedCards.includes(index)) {
        return;
    }
    
    const cardElement = document.querySelector(`[data-index="${index}"]`);
    if (cardElement.classList.contains('matched')) {
        return;
    }
    
    // Virar carta
    cardElement.classList.add('flipped');
    gameState.flippedCards.push(index);
    
    // Verificar se duas cartas foram viradas
    if (gameState.flippedCards.length === 2) {
        gameState.attempts++;
        gameState.isProcessing = true;
        
        setTimeout(() => {
            checkMatch();
        }, 1000);
    }
    
    updateStats();
}

// Verificar correspondência
function checkMatch() {
    const [index1, index2] = gameState.flippedCards;
    const card1 = gameState.cards[index1];
    const card2 = gameState.cards[index2];
    
    const element1 = document.querySelector(`[data-index="${index1}"]`);
    const element2 = document.querySelector(`[data-index="${index2}"]`);
    
    if (card1.id === card2.id && card1.type !== card2.type) {
        // Correspondência correta
        element1.classList.add('matched');
        element2.classList.add('matched');
        gameState.matchedPairs++;
        gameState.matches++;
        
        // Verificar se o jogo terminou
        const totalPairs = gameState.difficulty === 'easy' ? 8 : 12;
        if (gameState.matchedPairs === totalPairs) {
            setTimeout(() => {
                completeGame();
            }, 1000);
        }
    } else {
        // Correspondência incorreta
        element1.classList.add('wrong');
        element2.classList.add('wrong');
        
        setTimeout(() => {
            element1.classList.remove('flipped', 'wrong');
            element2.classList.remove('flipped', 'wrong');
        }, 1000);
    }
    
    // Resetar estado
    gameState.flippedCards = [];
    gameState.isProcessing = false;
    updateStats();
}

// Atualizar estatísticas
function updateStats() {
    const totalPairs = gameState.difficulty === 'easy' ? 8 : 12;
    
    document.getElementById('foundPairs').textContent = `${gameState.matchedPairs}/${totalPairs}`;
    document.getElementById('attempts').textContent = gameState.attempts;
    document.getElementById('matches').textContent = gameState.matches;
    
    // Atualizar progresso
    document.getElementById('progressText').textContent = 
        `${gameState.matchedPairs} de ${totalPairs} pares encontrados`;
    
    const progress = (gameState.matchedPairs / totalPairs) * 100;
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

// Definir dificuldade
function setDifficulty(difficulty) {
    gameState.difficulty = difficulty;
    
    // Atualizar botões
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-difficulty="${difficulty}"]`).classList.add('active');
    
    // Reiniciar jogo com nova dificuldade
    if (gameState.gameTimer) {
        clearInterval(gameState.gameTimer);
    }
    initGame();
}

// Mostrar prévia das cartas
function showPreview() {
    const board = document.getElementById('memoryBoard');
    board.classList.add('preview');
    
    // Desabilitar cliques
    gameState.isProcessing = true;
    
    // Remover prévia após 3 segundos
    setTimeout(() => {
        board.classList.remove('preview');
        gameState.isProcessing = false;
    }, 3000);
}

// Reiniciar jogo
function resetGame() {
    if (confirm('Tem certeza que deseja reiniciar o jogo?')) {
        if (gameState.gameTimer) {
            clearInterval(gameState.gameTimer);
        }
        
        document.getElementById('completionModal').style.display = 'none';
        initGame();
    }
}

// Completar jogo
function completeGame() {
    clearInterval(gameState.gameTimer);
    
    const totalTime = Math.floor((Date.now() - gameState.startTime) / 1000);
    const totalPairs = gameState.difficulty === 'easy' ? 8 : 12;
    const accuracy = gameState.attempts > 0 ? Math.round((gameState.matches / gameState.attempts) * 100) : 100;
    const score = calculateScore(totalTime, accuracy, gameState.difficulty);
    
    // Atualizar modal de conclusão
    document.getElementById('finalPairs').textContent = `${gameState.matchedPairs}/${totalPairs}`;
    document.getElementById('finalAttempts').textContent = gameState.attempts;
    document.getElementById('finalAccuracy').textContent = accuracy + '%';
    document.getElementById('finalTime').textContent = formatTime(totalTime);
    
    // Mensagem personalizada
    let message;
    if (accuracy >= 90 && totalTime <= 120) {
        message = "🧠 Incrível! Você tem uma memória excepcional para conceitos financeiros!";
        document.getElementById('memoryBadge').style.display = 'block';
    } else if (accuracy >= 80) {
        message = "🎉 Excelente! Sua memória está afiada para finanças!";
    } else if (accuracy >= 60) {
        message = "👍 Muito bem! Continue praticando para melhorar sua memória!";
    } else {
        message = "📚 Bom esforço! A prática leva à perfeição na memória financeira!";
    }
    
    document.getElementById('completionMessage').innerHTML = `<p>${message}</p>`;
    document.getElementById('completionModal').style.display = 'block';
}

// Calcular pontuação
function calculateScore(timeInSeconds, accuracy, difficulty) {
    let score = accuracy * 10; // Base: precisão
    
    // Bônus por velocidade
    const timeLimit = difficulty === 'easy' ? 180 : 300; // 3 ou 5 minutos
    if (timeInSeconds <= timeLimit * 0.5) score += 200;
    else if (timeInSeconds <= timeLimit * 0.7) score += 150;
    else if (timeInSeconds <= timeLimit) score += 100;
    else score += 50;
    
    // Bônus por dificuldade
    if (difficulty === 'hard') score += 200;
    
    // Bônus por eficiência
    if (accuracy === 100) score += 150;
    else if (accuracy >= 90) score += 100;
    else if (accuracy >= 80) score += 50;
    
    return Math.round(score);
}

// Completar fase da memória (finalizar jogo completo)
function completeMemoryPhase() {
    const totalTime = Math.floor((Date.now() - gameState.startTime) / 1000);
    const accuracy = gameState.attempts > 0 ? Math.round((gameState.matches / gameState.attempts) * 100) : 100;
    const score = calculateScore(totalTime, accuracy, gameState.difficulty);
    
    // Salvar pontuação e completar fase final
    if (typeof completePhase === 'function') {
        completePhase(5, score);
    }
    
    // Mostrar mensagem de conclusão do jogo completo
    alert('🎉 Parabéns! Você completou todas as fases do Jogo de Saúde Financeira! 🏆');
    
    // Voltar ao menu principal
    setTimeout(() => {
        window.location.href = '../index.html';
    }, 2000);
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
    // Prévia com P
    if (e.key.toLowerCase() === 'p') {
        showPreview();
    }
    
    // Reiniciar com R
    if (e.key.toLowerCase() === 'r') {
        resetGame();
    }
    
    // Alternar dificuldade com D
    if (e.key.toLowerCase() === 'd') {
        const newDifficulty = gameState.difficulty === 'easy' ? 'hard' : 'easy';
        setDifficulty(newDifficulty);
    }
    
    // Voltar ao menu com Escape
    if (e.key === 'Escape') {
        returnToMenu();
    }
});

// Fechar modal clicando fora
window.onclick = function(event) {
    const completionModal = document.getElementById('completionModal');
    if (event.target === completionModal) {
        completionModal.style.display = 'none';
    }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    initGame();
});

// Exportar funções para uso global
window.flipCard = flipCard;
window.setDifficulty = setDifficulty;
window.showPreview = showPreview;
window.resetGame = resetGame;
window.completeMemoryPhase = completeMemoryPhase;
window.returnToMenu = returnToMenu;

