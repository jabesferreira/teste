// Flashcards 1 - Conceitos Financeiros Básicos

const flashcards1Data = [
    {
        term: "Orçamento",
        definition: "Planejamento detalhado de receitas e despesas para um período específico, permitindo controle financeiro efetivo.",
        example: "Exemplo: Listar todos os ganhos mensais (salário, freelances) e todos os gastos (aluguel, alimentação, transporte) para saber quanto sobra para poupança."
    },
    {
        term: "Reserva de Emergência",
        definition: "Quantia guardada especificamente para situações imprevistas e urgentes, sem comprometer outros objetivos financeiros.",
        example: "Exemplo: Ter 6 meses de gastos essenciais guardados para casos como desemprego, problemas de saúde ou reparos urgentes na casa."
    },
    {
        term: "Juros Compostos",
        definition: "Juros calculados sobre o valor inicial mais os juros já acumulados, gerando crescimento exponencial do dinheiro ao longo do tempo.",
        example: "Exemplo: R$ 1.000 a 10% ao ano vira R$ 1.100 no 1º ano, R$ 1.210 no 2º ano (juros sobre R$ 1.100), e assim por diante."
    },
    {
        term: "Inflação",
        definition: "Aumento generalizado dos preços na economia, reduzindo o poder de compra do dinheiro ao longo do tempo.",
        example: "Exemplo: Se a inflação é 5% ao ano, algo que custa R$ 100 hoje custará R$ 105 no próximo ano."
    },
    {
        term: "Renda Passiva",
        definition: "Dinheiro recebido regularmente com pouco ou nenhum esforço contínuo, geralmente proveniente de investimentos ou negócios automatizados.",
        example: "Exemplo: Dividendos de ações, aluguel de imóveis, royalties de livros ou cursos online, juros de investimentos."
    },
    {
        term: "Diversificação",
        definition: "Estratégia de distribuir investimentos em diferentes tipos de ativos para reduzir riscos e otimizar retornos.",
        example: "Exemplo: Investir parte em ações, parte em renda fixa, parte em fundos imobiliários, em vez de colocar tudo em um só lugar."
    },
    {
        term: "Liquidez",
        definition: "Facilidade e rapidez com que um ativo pode ser convertido em dinheiro sem perda significativa de valor.",
        example: "Exemplo: Poupança tem alta liquidez (saque imediato), imóveis têm baixa liquidez (demora para vender)."
    },
    {
        term: "Score de Crédito",
        definition: "Pontuação que indica a probabilidade de uma pessoa pagar suas dívidas em dia, influenciando aprovação de crédito e taxas de juros.",
        example: "Exemplo: Score alto (800+) facilita empréstimos com juros baixos; score baixo (300-) dificulta aprovação de crédito."
    },
    {
        term: "Aporte",
        definition: "Valor adicional investido regularmente para aumentar o patrimônio e acelerar o crescimento dos investimentos.",
        example: "Exemplo: Investir R$ 500 mensais em um fundo de investimento, além do valor inicial aplicado."
    },
    {
        term: "Rentabilidade",
        definition: "Percentual de ganho ou perda de um investimento em relação ao valor aplicado, em um período determinado.",
        example: "Exemplo: Investir R$ 1.000 e receber R$ 1.100 após um ano representa 10% de rentabilidade anual."
    },
    {
        term: "Cartão de Crédito",
        definition: "Meio de pagamento que permite compras a prazo, com cobrança de juros altos se não pago integralmente na data de vencimento.",
        example: "Exemplo: Comprar R$ 500 e pagar apenas o mínimo pode gerar juros de 300% ao ano sobre o valor restante."
    },
    {
        term: "Planejamento Financeiro",
        definition: "Processo de definir objetivos financeiros e criar estratégias para alcançá-los de forma organizada e sustentável.",
        example: "Exemplo: Definir meta de comprar casa em 5 anos, calcular valor necessário e planejar poupança mensal para atingir o objetivo."
    },
    {
        term: "Fluxo de Caixa",
        definition: "Registro detalhado de todas as entradas e saídas de dinheiro, permitindo visualizar a saúde financeira real.",
        example: "Exemplo: Anotar todos os recebimentos (salário, vendas) e pagamentos (contas, compras) para saber se sobra ou falta dinheiro."
    },
    {
        term: "Investimento",
        definition: "Aplicação de dinheiro em ativos com expectativa de obter retorno financeiro superior à inflação no futuro.",
        example: "Exemplo: Comprar ações de empresas, títulos do governo, fundos imobiliários ou abrir um negócio próprio."
    },
    {
        term: "Endividamento",
        definition: "Situação de ter dívidas que comprometem a capacidade de pagamento e a saúde financeira pessoal.",
        example: "Exemplo: Gastar mais de 30% da renda com parcelas de empréstimos, financiamentos e cartões de crédito."
    }
];

// Estado dos flashcards
let currentCardIndex = 0;
let isFlipped = false;
let studiedCards = new Set();
let cardDifficulties = {};
let shuffledOrder = [];

// Inicializar flashcards
function initFlashcards() {
    currentCardIndex = 0;
    isFlipped = false;
    studiedCards.clear();
    cardDifficulties = {};
    shuffledOrder = Array.from({length: flashcards1Data.length}, (_, i) => i);
    
    showCard();
    updateStats();
    updateNavigation();
}

// Mostrar cartão atual
function showCard() {
    const card = flashcards1Data[shuffledOrder[currentCardIndex]];
    const flashcard = document.getElementById('flashcard');
    
    // Resetar flip
    if (isFlipped) {
        flipCard();
    }
    
    // Atualizar conteúdo
    document.getElementById('cardNumber').textContent = currentCardIndex + 1;
    document.getElementById('cardTerm').textContent = card.term;
    document.getElementById('cardDefinition').textContent = card.definition;
    
    // Atualizar exemplo se existir
    const exampleElement = document.getElementById('cardExample');
    if (card.example) {
        exampleElement.innerHTML = `
            <h4>💡 Exemplo:</h4>
            <p>${card.example}</p>
        `;
        exampleElement.style.display = 'block';
    } else {
        exampleElement.style.display = 'none';
    }
    
    // Atualizar progresso
    document.getElementById('progressText').textContent = `Cartão ${currentCardIndex + 1} de ${flashcards1Data.length}`;
    const progress = ((currentCardIndex + 1) / flashcards1Data.length) * 100;
    document.getElementById('flashcardProgress').style.width = progress + '%';
    
    // Mostrar indicador de dificuldade se já foi marcado
    showDifficultyIndicator();
    
    // Animação de entrada
    flashcard.classList.add('slide-in');
    setTimeout(() => {
        flashcard.classList.remove('slide-in');
    }, 600);
    
    // Atualizar estado dos botões de dificuldade
    updateDifficultyButtons();
}

// Virar cartão
function flipCard() {
    const flashcard = document.getElementById('flashcard');
    isFlipped = !isFlipped;
    
    if (isFlipped) {
        flashcard.classList.add('flipped');
        // Marcar como estudado quando vira para ver a definição
        studiedCards.add(shuffledOrder[currentCardIndex]);
        updateStats();
    } else {
        flashcard.classList.remove('flipped');
    }
}

// Marcar dificuldade
function markDifficulty(difficulty) {
    const cardId = shuffledOrder[currentCardIndex];
    cardDifficulties[cardId] = difficulty;
    
    // Adicionar feedback visual
    const buttons = document.querySelectorAll('.difficulty');
    buttons.forEach(btn => btn.classList.remove('selected'));
    document.getElementById(difficulty + 'Btn').classList.add('selected');
    
    // Mostrar indicador de dificuldade
    showDifficultyIndicator();
    updateStats();
    
    // Auto-avançar após marcar dificuldade
    setTimeout(() => {
        if (currentCardIndex < flashcards1Data.length - 1) {
            nextCard();
        } else {
            checkCompletion();
        }
    }, 1000);
}

// Mostrar indicador de dificuldade
function showDifficultyIndicator() {
    const cardId = shuffledOrder[currentCardIndex];
    const difficulty = cardDifficulties[cardId];
    
    // Remover indicador anterior
    const existingIndicator = document.querySelector('.difficulty-indicator');
    if (existingIndicator) {
        existingIndicator.remove();
    }
    
    if (difficulty) {
        const indicator = document.createElement('div');
        indicator.className = `difficulty-indicator ${difficulty} show`;
        document.querySelector('.flashcard-front').appendChild(indicator);
    }
}

// Atualizar botões de dificuldade
function updateDifficultyButtons() {
    const cardId = shuffledOrder[currentCardIndex];
    const difficulty = cardDifficulties[cardId];
    
    const buttons = document.querySelectorAll('.difficulty');
    buttons.forEach(btn => btn.classList.remove('selected'));
    
    if (difficulty) {
        document.getElementById(difficulty + 'Btn').classList.add('selected');
    }
}

// Próximo cartão
function nextCard() {
    if (currentCardIndex < flashcards1Data.length - 1) {
        currentCardIndex++;
        showCard();
        updateNavigation();
    } else {
        checkCompletion();
    }
}

// Cartão anterior
function previousCard() {
    if (currentCardIndex > 0) {
        currentCardIndex--;
        showCard();
        updateNavigation();
    }
}

// Atualizar navegação
function updateNavigation() {
    document.getElementById('prevBtn').disabled = currentCardIndex === 0;
    document.getElementById('nextBtn').disabled = currentCardIndex === flashcards1Data.length - 1;
    
    if (currentCardIndex === flashcards1Data.length - 1) {
        document.getElementById('nextBtn').textContent = '🏁 Finalizar';
        document.getElementById('nextBtn').onclick = checkCompletion;
    } else {
        document.getElementById('nextBtn').textContent = 'Próximo ➡️';
        document.getElementById('nextBtn').onclick = nextCard;
    }
}

// Atualizar estatísticas
function updateStats() {
    document.getElementById('studiedCards').textContent = `${studiedCards.size}/${flashcards1Data.length}`;
    
    const easyCount = Object.values(cardDifficulties).filter(d => d === 'easy').length;
    const mediumCount = Object.values(cardDifficulties).filter(d => d === 'medium').length;
    const hardCount = Object.values(cardDifficulties).filter(d => d === 'hard').length;
    
    document.getElementById('easyCount').textContent = easyCount;
    document.getElementById('mediumCount').textContent = mediumCount;
    document.getElementById('hardCount').textContent = hardCount;
}

// Embaralhar cartões
function shuffleCards() {
    if (confirm('Embaralhar os cartões? Isso irá resetar seu progresso atual.')) {
        // Embaralhar array
        for (let i = shuffledOrder.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledOrder[i], shuffledOrder[j]] = [shuffledOrder[j], shuffledOrder[i]];
        }
        
        currentCardIndex = 0;
        showCard();
        updateNavigation();
    }
}

// Revisar cartões difíceis
function reviewDifficult() {
    const difficultCards = Object.keys(cardDifficulties)
        .filter(id => cardDifficulties[id] === 'hard')
        .map(id => parseInt(id));
    
    if (difficultCards.length === 0) {
        alert('Nenhum cartão foi marcado como difícil ainda!');
        return;
    }
    
    if (confirm(`Revisar ${difficultCards.length} cartões marcados como difíceis?`)) {
        shuffledOrder = difficultCards;
        currentCardIndex = 0;
        showCard();
        updateNavigation();
    }
}

// Verificar conclusão
function checkCompletion() {
    if (studiedCards.size === flashcards1Data.length) {
        showCompletionModal();
    } else {
        const remaining = flashcards1Data.length - studiedCards.size;
        if (confirm(`Ainda restam ${remaining} cartões não estudados. Deseja continuar mesmo assim?`)) {
            showCompletionModal();
        }
    }
}

// Mostrar modal de conclusão
function showCompletionModal() {
    const easyCount = Object.values(cardDifficulties).filter(d => d === 'easy').length;
    const mediumCount = Object.values(cardDifficulties).filter(d => d === 'medium').length;
    const hardCount = Object.values(cardDifficulties).filter(d => d === 'hard').length;
    
    document.getElementById('finalStudied').textContent = `${studiedCards.size}/${flashcards1Data.length}`;
    document.getElementById('finalEasy').textContent = easyCount;
    document.getElementById('finalMedium').textContent = mediumCount;
    document.getElementById('finalHard').textContent = hardCount;
    
    // Mensagem personalizada
    let message;
    const studyPercentage = (studiedCards.size / flashcards1Data.length) * 100;
    const easyPercentage = (easyCount / Math.max(1, easyCount + mediumCount + hardCount)) * 100;
    
    if (studyPercentage === 100 && easyPercentage >= 70) {
        message = "🏆 Excelente! Você dominou os conceitos básicos de finanças. Está pronto para conceitos mais avançados!";
    } else if (studyPercentage === 100 && easyPercentage >= 50) {
        message = "🎉 Muito bem! Você estudou todos os conceitos. Continue praticando os que marcou como difíceis.";
    } else if (studyPercentage >= 80) {
        message = "👍 Bom trabalho! Você estudou a maioria dos conceitos. Considere revisar os que não viu ainda.";
    } else {
        message = "📚 Continue estudando! Quanto mais conceitos você dominar, melhor será sua educação financeira.";
    }
    
    document.getElementById('completionMessage').innerHTML = `<p>${message}</p>`;
    document.getElementById('completionModal').style.display = 'block';
}

// Reiniciar flashcards
function restartFlashcards() {
    document.getElementById('completionModal').style.display = 'none';
    initFlashcards();
}

// Completar fase dos flashcards
function completeFlashcardPhase() {
    const score = calculateFlashcardScore();
    
    // Salvar pontuação e completar fase
    if (typeof completePhase === 'function') {
        completePhase(2, score);
    }
    
    // Ir para próxima fase
    setTimeout(() => {
        window.location.href = 'calculator1.html';
    }, 1000);
}

// Calcular pontuação dos flashcards
function calculateFlashcardScore() {
    const studyBonus = studiedCards.size * 10; // 10 pontos por cartão estudado
    const easyCount = Object.values(cardDifficulties).filter(d => d === 'easy').length;
    const mediumCount = Object.values(cardDifficulties).filter(d => d === 'medium').length;
    const hardCount = Object.values(cardDifficulties).filter(d => d === 'hard').length;
    
    const difficultyBonus = (easyCount * 15) + (mediumCount * 10) + (hardCount * 5);
    const completionBonus = studiedCards.size === flashcards1Data.length ? 100 : 0;
    
    return studyBonus + difficultyBonus + completionBonus;
}

// Voltar ao menu principal
function returnToMenu() {
    if (confirm('Tem certeza que deseja voltar ao menu? Seu progresso será perdido.')) {
        window.location.href = '../index.html';
    }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    initFlashcards();
});

// Eventos de teclado
document.addEventListener('keydown', function(e) {
    // Virar cartão com Espaço ou Enter
    if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        flipCard();
    }
    
    // Navegar com setas
    if (e.key === 'ArrowLeft' && currentCardIndex > 0) {
        previousCard();
    }
    if (e.key === 'ArrowRight' && currentCardIndex < flashcards1Data.length - 1) {
        nextCard();
    }
    
    // Marcar dificuldade com números
    if (e.key === '1') markDifficulty('easy');
    if (e.key === '2') markDifficulty('medium');
    if (e.key === '3') markDifficulty('hard');
    
    // Embaralhar com S
    if (e.key.toLowerCase() === 's') {
        shuffleCards();
    }
    
    // Voltar ao menu com Escape
    if (e.key === 'Escape') {
        returnToMenu();
    }
});

// Fechar modal clicando fora
window.onclick = function(event) {
    const modal = document.getElementById('completionModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Exportar funções para uso global
window.flipCard = flipCard;
window.markDifficulty = markDifficulty;
window.nextCard = nextCard;
window.previousCard = previousCard;
window.shuffleCards = shuffleCards;
window.reviewDifficult = reviewDifficult;
window.restartFlashcards = restartFlashcards;
window.completeFlashcardPhase = completeFlashcardPhase;
window.returnToMenu = returnToMenu;

