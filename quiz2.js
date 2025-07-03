// Quiz 2 - Conhecimentos Avançados de Investimentos e Planejamento Financeiro

const quiz2Questions = [
    {
        question: "O que é o CDI (Certificado de Depósito Interbancário)?",
        options: [
            "Um tipo de ação na bolsa de valores",
            "Taxa de juros que os bancos usam para emprestar dinheiro entre si",
            "Um investimento em imóveis",
            "Uma modalidade de financiamento habitacional"
        ],
        correct: 1,
        explanation: "O CDI é a taxa de juros que os bancos usam para emprestar dinheiro entre si, servindo como referência para muitos investimentos de renda fixa."
    },
    {
        question: "Qual é a principal diferença entre ações ordinárias (ON) e preferenciais (PN)?",
        options: [
            "Ações ON dão direito a voto, PN têm preferência na distribuição de dividendos",
            "Ações PN são mais caras que ON",
            "Ações ON são mais seguras que PN",
            "Não há diferença entre elas"
        ],
        correct: 0,
        explanation: "Ações ordinárias (ON) dão direito a voto nas assembleias, enquanto preferenciais (PN) têm preferência na distribuição de dividendos."
    },
    {
        question: "O que é diversificação de carteira?",
        options: [
            "Investir todo dinheiro em um único ativo",
            "Distribuir investimentos em diferentes tipos de ativos para reduzir riscos",
            "Comprar apenas ações de empresas brasileiras",
            "Investir somente em renda fixa"
        ],
        correct: 1,
        explanation: "Diversificação é distribuir investimentos em diferentes tipos de ativos (ações, renda fixa, fundos, etc.) para reduzir riscos."
    },
    {
        question: "O que é o Tesouro Direto?",
        options: [
            "Um banco digital do governo",
            "Programa que permite pessoas físicas comprarem títulos públicos federais",
            "Um tipo de conta poupança",
            "Uma corretora de valores"
        ],
        correct: 1,
        explanation: "O Tesouro Direto é um programa que permite pessoas físicas comprarem títulos públicos federais diretamente do governo."
    },
    {
        question: "O que significa 'alavancagem' em investimentos?",
        options: [
            "Usar dinheiro emprestado para amplificar potenciais ganhos (e perdas)",
            "Investir apenas com dinheiro próprio",
            "Diversificar a carteira de investimentos",
            "Comprar ações de empresas grandes"
        ],
        correct: 0,
        explanation: "Alavancagem é usar dinheiro emprestado para investir, amplificando tanto os potenciais ganhos quanto as perdas."
    },
    {
        question: "O que é o Índice Bovespa (Ibovespa)?",
        options: [
            "Uma ação específica da bolsa",
            "Índice que mede o desempenho das ações mais negociadas na B3",
            "Um tipo de investimento em renda fixa",
            "Uma corretora de valores"
        ],
        correct: 1,
        explanation: "O Ibovespa é um índice que mede o desempenho médio das ações mais negociadas na bolsa brasileira (B3)."
    },
    {
        question: "Qual é a diferença entre renda fixa e renda variável?",
        options: [
            "Renda fixa tem rentabilidade previsível, renda variável tem rentabilidade incerta",
            "Renda fixa é sempre melhor que renda variável",
            "Renda variável não tem riscos",
            "São exatamente iguais"
        ],
        correct: 0,
        explanation: "Renda fixa tem rentabilidade mais previsível (CDB, Tesouro), enquanto renda variável tem rentabilidade incerta (ações, fundos)."
    },
    {
        question: "O que é um fundo de investimento?",
        options: [
            "Uma conta bancária especial",
            "Aplicação coletiva onde recursos de vários investidores são reunidos",
            "Um tipo de empréstimo bancário",
            "Uma modalidade de financiamento"
        ],
        correct: 1,
        explanation: "Fundo de investimento é uma aplicação coletiva onde recursos de vários investidores são reunidos e geridos profissionalmente."
    },
    {
        question: "O que é 'come-cotas' em fundos de investimento?",
        options: [
            "Taxa de administração do fundo",
            "Antecipação do Imposto de Renda sobre os rendimentos",
            "Valor mínimo para investir no fundo",
            "Prazo de carência para resgatar"
        ],
        correct: 1,
        explanation: "Come-cotas é a antecipação do Imposto de Renda que incide sobre os rendimentos de fundos de investimento."
    },
    {
        question: "O que significa P/L (Preço/Lucro) de uma ação?",
        options: [
            "Preço da ação dividido pelo lucro por ação da empresa",
            "Percentual de lucro da empresa",
            "Preço mínimo da ação",
            "Lucro máximo possível"
        ],
        correct: 0,
        explanation: "P/L é um indicador que divide o preço da ação pelo lucro por ação, mostrando quantos anos levaria para recuperar o investimento."
    },
    {
        question: "O que é 'day trade'?",
        options: [
            "Investimento de longo prazo",
            "Compra e venda de ativos no mesmo dia",
            "Tipo de conta bancária",
            "Modalidade de financiamento"
        ],
        correct: 1,
        explanation: "Day trade é a operação de compra e venda de ativos financeiros no mesmo dia, buscando lucrar com variações de preço."
    },
    {
        question: "O que é planejamento sucessório?",
        options: [
            "Plano para aumentar a renda",
            "Organização do patrimônio para transmissão aos herdeiros",
            "Estratégia de investimento em ações",
            "Método para quitar dívidas"
        ],
        correct: 1,
        explanation: "Planejamento sucessório é a organização do patrimônio para facilitar e otimizar a transmissão aos herdeiros."
    }
];

// Estado do quiz
let currentQuestion = 0;
let correctAnswers = 0;
let currentScore = 0;
let selectedOption = null;
let startTime = Date.now();
let timer = null;

// Inicializar quiz
function initQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    currentScore = 0;
    selectedOption = null;
    startTime = Date.now();
    
    startTimer();
    showQuestion();
    updateStats();
}

// Mostrar pergunta atual
function showQuestion() {
    const question = quiz2Questions[currentQuestion];
    
    // Atualizar elementos da interface
    document.getElementById('questionNumber').textContent = currentQuestion + 1;
    document.getElementById('questionText').textContent = question.question;
    document.getElementById('progressText').textContent = `Pergunta ${currentQuestion + 1} de ${quiz2Questions.length}`;
    
    // Atualizar barra de progresso
    const progress = ((currentQuestion + 1) / quiz2Questions.length) * 100;
    document.getElementById('quizProgress').style.width = progress + '%';
    
    // Criar opções
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionBtn = document.createElement('button');
        optionBtn.className = 'option-btn';
        optionBtn.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
        optionBtn.onclick = () => selectOption(index);
        optionsContainer.appendChild(optionBtn);
    });
    
    // Resetar estado
    selectedOption = null;
    document.getElementById('nextBtn').disabled = true;
    
    // Animação de entrada
    const quizCard = document.getElementById('quizCard');
    quizCard.classList.add('slide-in');
    setTimeout(() => {
        quizCard.classList.remove('slide-in');
    }, 500);
}

// Selecionar opção
function selectOption(index) {
    if (selectedOption !== null) return; // Já selecionou uma opção
    
    selectedOption = index;
    const question = quiz2Questions[currentQuestion];
    const options = document.querySelectorAll('.option-btn');
    
    // Desabilitar todas as opções
    options.forEach(btn => btn.classList.add('disabled'));
    
    // Marcar opção selecionada
    options[index].classList.add('selected');
    
    // Mostrar resposta correta/incorreta após um delay
    setTimeout(() => {
        options[question.correct].classList.add('correct');
        options[question.correct].classList.add('pulse');
        
        if (index !== question.correct) {
            options[index].classList.add('incorrect');
            options[index].classList.add('shake');
        } else {
            correctAnswers++;
            currentScore += calculateScore();
        }
        
        // Habilitar botão próxima
        document.getElementById('nextBtn').disabled = false;
        updateStats();
        
        // Mostrar explicação
        showExplanation(question.explanation);
    }, 500);
}

// Mostrar explicação
function showExplanation(explanation) {
    const explanationDiv = document.createElement('div');
    explanationDiv.className = 'explanation';
    explanationDiv.innerHTML = `
        <div class="explanation-content">
            <h4>💡 Explicação:</h4>
            <p>${explanation}</p>
        </div>
    `;
    
    // Adicionar estilos inline para a explicação
    explanationDiv.style.cssText = `
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        padding: 15px;
        margin-top: 20px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        animation: fadeIn 0.5s ease;
    `;
    
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.appendChild(explanationDiv);
}

// Calcular pontuação (mais pontos para quiz avançado)
function calculateScore() {
    const baseScore = 150; // Mais pontos para quiz avançado
    const timeBonus = Math.max(0, 75 - Math.floor((Date.now() - startTime) / 1000 / 15)); // Bônus por velocidade
    return baseScore + timeBonus;
}

// Próxima pergunta
function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < quiz2Questions.length) {
        showQuestion();
    } else {
        finishQuiz();
    }
}

// Finalizar quiz
function finishQuiz() {
    clearInterval(timer);
    const totalTime = Math.floor((Date.now() - startTime) / 1000);
    const percentage = (correctAnswers / quiz2Questions.length) * 100;
    
    // Atualizar modal de resultado
    document.getElementById('finalCorrect').textContent = `${correctAnswers}/${quiz2Questions.length}`;
    document.getElementById('finalScore').textContent = currentScore;
    document.getElementById('finalTime').textContent = formatTime(totalTime);
    
    // Determinar desempenho
    let performance, message, achievement = null;
    if (percentage >= 90) {
        performance = "Expert Financeiro! 🏆";
        message = "Impressionante! Você domina conceitos avançados de finanças e investimentos. Você está pronto para decisões financeiras complexas!";
        achievement = "Mestre dos Investimentos";
    } else if (percentage >= 75) {
        performance = "Investidor Avançado! 🎯";
        message = "Excelente! Você tem conhecimento sólido sobre investimentos e planejamento financeiro. Continue aprimorando!";
        achievement = "Investidor Experiente";
    } else if (percentage >= 60) {
        performance = "Bom Conhecimento! 📈";
        message = "Muito bem! Você entende conceitos importantes de finanças. Continue estudando para se tornar um expert!";
    } else if (percentage >= 40) {
        performance = "Conhecimento Básico 📚";
        message = "Você tem uma base, mas ainda há muito para aprender sobre investimentos avançados. Continue estudando!";
    } else {
        performance = "Precisa Estudar Mais 🎓";
        message = "Este quiz é desafiador! Não desanime, continue estudando conceitos de investimentos e tente novamente.";
    }
    
    document.getElementById('performance').textContent = performance;
    document.getElementById('resultMessage').innerHTML = `
        <h3>${performance}</h3>
        <p>${message}</p>
    `;
    
    // Mostrar conquista se aplicável
    if (achievement) {
        document.getElementById('achievementBadge').style.display = 'block';
        document.getElementById('achievementText').textContent = achievement;
    }
    
    // Mostrar modal
    document.getElementById('resultModal').style.display = 'block';
}

// Atualizar estatísticas
function updateStats() {
    document.getElementById('correctAnswers').textContent = correctAnswers;
    document.getElementById('currentScore').textContent = currentScore;
}

// Timer
function startTimer() {
    timer = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        document.getElementById('timeElapsed').textContent = formatTime(elapsed);
    }, 1000);
}

// Formatar tempo
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Reiniciar quiz
function restartQuiz() {
    document.getElementById('resultModal').style.display = 'none';
    initQuiz();
}

// Completar fase do quiz
function completeQuizPhase() {
    // Salvar pontuação e completar fase
    if (typeof completePhase === 'function') {
        completePhase(2, currentScore); // Fase 2 do quiz
    }
    
    // Ir para próxima fase ou menu
    setTimeout(() => {
        window.location.href = '../index.html';
    }, 1000);
}

// Voltar ao menu principal
function returnToMenu() {
    if (confirm('Tem certeza que deseja voltar ao menu? Seu progresso será perdido.')) {
        window.location.href = '../index.html';
    }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    initQuiz();
    
    // Adicionar estilos para explicação e conquista
    const additionalStyles = `
        .explanation {
            animation: fadeIn 0.5s ease;
        }
        
        .explanation-content h4 {
            color: #87ceeb;
            margin-bottom: 10px;
            font-size: 1.1rem;
        }
        
        .explanation-content p {
            color: #e6f3ff;
            line-height: 1.5;
            margin: 0;
        }
        
        .achievement-badge {
            background: linear-gradient(45deg, #ffd700, #ffed4e);
            color: #1e3c72;
            border-radius: 15px;
            padding: 20px;
            margin: 20px 0;
            display: flex;
            align-items: center;
            gap: 15px;
            border: 2px solid #ffd700;
            animation: achievementPulse 2s ease infinite;
        }
        
        .badge-icon {
            font-size: 2rem;
            animation: bounce 1s ease infinite;
        }
        
        .badge-text h3 {
            margin: 0 0 5px 0;
            font-size: 1.2rem;
            font-weight: bold;
        }
        
        .badge-text p {
            margin: 0;
            font-size: 1rem;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes achievementPulse {
            0%, 100% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.3); }
            50% { box-shadow: 0 0 30px rgba(255, 215, 0, 0.6); }
        }
        
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);
});

// Eventos de teclado
document.addEventListener('keydown', function(e) {
    // Selecionar opções com teclas A, B, C, D
    if (selectedOption === null && currentQuestion < quiz2Questions.length) {
        const key = e.key.toLowerCase();
        if (['a', 'b', 'c', 'd'].includes(key)) {
            const index = key.charCodeAt(0) - 97; // a=0, b=1, c=2, d=3
            if (index < quiz2Questions[currentQuestion].options.length) {
                selectOption(index);
            }
        }
    }
    
    // Próxima pergunta com Enter ou Espaço
    if ((e.key === 'Enter' || e.key === ' ') && !document.getElementById('nextBtn').disabled) {
        e.preventDefault();
        nextQuestion();
    }
    
    // Voltar ao menu com Escape
    if (e.key === 'Escape') {
        returnToMenu();
    }
});

// Exportar funções para uso global
window.selectOption = selectOption;
window.nextQuestion = nextQuestion;
window.restartQuiz = restartQuiz;
window.completeQuizPhase = completeQuizPhase;
window.returnToMenu = returnToMenu;

