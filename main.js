// Estado do jogo
let gameState = {
    completedPhases: 0,
    totalScore: 0,
    currentPhase: 1,
    phaseScores: {
        quiz1: 0,
        quiz2: 0,
        flashcards1: 0,
        flashcards2: 0,
        calculator1: 0,
        calculator2: 0,
        matching1: 0,
        matching2: 0,
        memory1: 0,
        memory2: 0
    },
    unlockedPhases: [1] // Fase 1 sempre desbloqueada
};

// Carregar estado do localStorage
function loadGameState() {
    const saved = localStorage.getItem('financialGameState');
    if (saved) {
        gameState = { ...gameState, ...JSON.parse(saved) };
    }
    updateUI();
}

// Salvar estado no localStorage
function saveGameState() {
    localStorage.setItem('financialGameState', JSON.stringify(gameState));
}

// Atualizar interface
function updateUI() {
    // Atualizar barra de progresso
    const progressFill = document.getElementById('progressFill');
    const progress = (gameState.completedPhases / 5) * 100;
    progressFill.style.width = progress + '%';

    // Atualizar estatísticas
    document.getElementById('completedPhases').textContent = `${gameState.completedPhases}/5`;
    document.getElementById('totalScore').textContent = gameState.totalScore;
    
    // Atualizar nível do jogador
    const level = getPlayerLevel(gameState.totalScore);
    document.getElementById('playerLevel').textContent = level;

    // Atualizar estado das fases
    updatePhaseCards();
}

// Determinar nível do jogador
function getPlayerLevel(score) {
    if (score >= 1000) return 'Expert';
    if (score >= 750) return 'Avançado';
    if (score >= 500) return 'Intermediário';
    if (score >= 250) return 'Básico';
    return 'Iniciante';
}

// Atualizar cards das fases
function updatePhaseCards() {
    const phaseCards = document.querySelectorAll('.phase-card');
    
    phaseCards.forEach((card, index) => {
        const phaseNumber = index + 1;
        const button = card.querySelector('.phase-btn');
        
        // Remover classes anteriores
        card.classList.remove('completed', 'locked', 'current');
        
        if (phaseNumber <= gameState.completedPhases) {
            // Fase concluída
            card.classList.add('completed');
            button.textContent = 'Concluída ✓';
            button.disabled = false;
        } else if (phaseNumber === gameState.currentPhase) {
            // Fase atual
            card.classList.add('current');
            button.textContent = 'Iniciar';
            button.disabled = false;
        } else if (phaseNumber > gameState.currentPhase) {
            // Fase bloqueada
            card.classList.add('locked');
            button.textContent = 'Bloqueada 🔒';
            button.disabled = true;
        }
    });
}

// Iniciar uma fase
function startPhase(phaseType) {
    const phaseMap = {
        'quiz1': { file: 'quiz1.html', phase: 1 },
        'flashcards1': { file: 'flashcards1.html', phase: 2 },
        'calculator1': { file: 'calculator1.html', phase: 3 },
        'matching1': { file: 'matching1.html', phase: 4 },
        'memory1': { file: 'memory1.html', phase: 5 }
    };

    const phase = phaseMap[phaseType];
    if (phase && phase.phase <= gameState.currentPhase) {
        window.location.href = `html/${phase.file}`;
    }
}

// Completar uma fase
function completePhase(phaseNumber, score) {
    if (phaseNumber === gameState.currentPhase) {
        gameState.completedPhases++;
        gameState.currentPhase++;
        gameState.totalScore += score;
        
        // Adicionar bônus por completar fase
        gameState.totalScore += 50;
        
        saveGameState();
        updateUI();
        
        // Mostrar celebração
        showCelebration(phaseNumber, score);
    }
}

// Mostrar celebração
function showCelebration(phaseNumber, score) {
    const celebration = document.createElement('div');
    celebration.className = 'celebration';
    celebration.innerHTML = `
        <div class="celebration-content">
            <h2>🎉 Parabéns!</h2>
            <p>Você completou a Fase ${phaseNumber}!</p>
            <p>Pontuação: ${score} pontos</p>
            <p>Bônus: +50 pontos</p>
            <button onclick="closeCelebration()" class="modal-btn">Continuar</button>
        </div>
    `;
    
    document.body.appendChild(celebration);
    
    // Remover após 5 segundos se não for clicado
    setTimeout(() => {
        if (celebration.parentNode) {
            closeCelebration();
        }
    }, 5000);
}

// Fechar celebração
function closeCelebration() {
    const celebration = document.querySelector('.celebration');
    if (celebration) {
        celebration.remove();
    }
}

// Mostrar instruções
function showInstructions() {
    document.getElementById('instructionsModal').style.display = 'block';
}

// Fechar modal
function closeModal() {
    document.getElementById('instructionsModal').style.display = 'none';
}

// Resetar progresso
function resetProgress() {
    if (confirm('Tem certeza que deseja resetar todo o progresso? Esta ação não pode ser desfeita.')) {
        localStorage.removeItem('financialGameState');
        gameState = {
            completedPhases: 0,
            totalScore: 0,
            currentPhase: 1,
            phaseScores: {
                quiz1: 0,
                quiz2: 0,
                flashcards1: 0,
                flashcards2: 0,
                calculator1: 0,
                calculator2: 0,
                matching1: 0,
                matching2: 0,
                memory1: 0,
                memory2: 0
            },
            unlockedPhases: [1]
        };
        updateUI();
    }
}

// Adicionar estilos para celebração
const celebrationStyles = `
.celebration {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
    animation: fadeIn 0.3s ease;
}

.celebration-content {
    background: linear-gradient(135deg, #1e3c72, #2a5298);
    padding: 40px;
    border-radius: 20px;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    animation: slideIn 0.5s ease;
}

.celebration-content h2 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: #ffffff;
}

.celebration-content p {
    font-size: 1.2rem;
    margin-bottom: 15px;
    color: #e6f3ff;
}

@keyframes slideIn {
    from {
        transform: translateY(-50px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}
`;

// Adicionar estilos ao documento
const styleSheet = document.createElement('style');
styleSheet.textContent = celebrationStyles;
document.head.appendChild(styleSheet);

// Eventos do teclado
document.addEventListener('keydown', function(e) {
    // Fechar modal com ESC
    if (e.key === 'Escape') {
        closeModal();
        closeCelebration();
    }
    
    // Mostrar instruções com F1
    if (e.key === 'F1') {
        e.preventDefault();
        showInstructions();
    }
    
    // Resetar com Ctrl+R
    if (e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        resetProgress();
    }
});

// Fechar modal clicando fora
window.onclick = function(event) {
    const modal = document.getElementById('instructionsModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    loadGameState();
    
    // Adicionar efeitos de hover nos cards
    const phaseCards = document.querySelectorAll('.phase-card');
    phaseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('locked')) {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Adicionar animação de entrada
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Função para voltar ao menu principal (usada pelas outras páginas)
function returnToMenu() {
    window.location.href = '../index.html';
}

// Função para ir para próxima fase (usada pelas outras páginas)
function goToNextPhase() {
    const nextPhaseMap = {
        1: 'flashcards1.html',
        2: 'calculator1.html',
        3: 'matching1.html',
        4: 'memory1.html',
        5: '../index.html'
    };
    
    const nextPage = nextPhaseMap[gameState.currentPhase - 1];
    if (nextPage) {
        window.location.href = nextPage;
    }
}

// Exportar funções para uso global
window.startPhase = startPhase;
window.completePhase = completePhase;
window.showInstructions = showInstructions;
window.closeModal = closeModal;
window.closeCelebration = closeCelebration;
window.resetProgress = resetProgress;
window.returnToMenu = returnToMenu;
window.goToNextPhase = goToNextPhase;

