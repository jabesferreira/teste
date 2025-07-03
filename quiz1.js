// Quiz 1 - Conhecimentos Básicos de Finanças Pessoais

const quiz1Questions = [
    {
        question: "O que é uma reserva de emergência?",
        options: [
            "Dinheiro guardado para comprar coisas que você quer",
            "Valor guardado para situações imprevistas e urgentes",
            "Investimento de alto risco para ganhar dinheiro rápido",
            "Dinheiro emprestado do banco para emergências"
        ],
        correct: 1,
        explanation: "A reserva de emergência é um valor guardado especificamente para situações imprevistas como desemprego, problemas de saúde ou reparos urgentes."
    },
    {
        question: "Qual é o valor ideal para uma reserva de emergência?",
        options: [
            "1 mês de gastos",
            "3 a 6 meses de gastos essenciais",
            "1 ano de salário",
            "Não é necessário ter reserva"
        ],
        correct: 1,
        explanation: "O ideal é ter entre 3 a 6 meses de gastos essenciais guardados, podendo variar conforme a estabilidade do seu emprego."
    },
    {
        question: "O que significa 'viver dentro do orçamento'?",
        options: [
            "Gastar todo o dinheiro que você ganha",
            "Gastar menos do que você ganha",
            "Usar o cartão de crédito para tudo",
            "Não se preocupar com gastos"
        ],
        correct: 1,
        explanation: "Viver dentro do orçamento significa gastar menos do que você ganha, permitindo poupar e investir para o futuro."
    },
    {
        question: "Qual é a regra 50-30-20 para organização financeira?",
        options: [
            "50% gastos essenciais, 30% desejos, 20% poupança/investimentos",
            "50% poupança, 30% gastos, 20% investimentos",
            "50% investimentos, 30% gastos essenciais, 20% desejos",
            "50% cartão de crédito, 30% dinheiro, 20% pix"
        ],
        correct: 0,
        explanation: "A regra 50-30-20 sugere destinar 50% da renda para gastos essenciais, 30% para desejos e 20% para poupança e investimentos."
    },
    {
        question: "O que são juros compostos?",
        options: [
            "Juros que só incidem sobre o valor inicial",
            "Juros que incidem sobre o valor inicial + juros anteriores",
            "Juros que diminuem com o tempo",
            "Juros que só existem em empréstimos"
        ],
        correct: 1,
        explanation: "Juros compostos são 'juros sobre juros' - incidem sobre o valor inicial mais os juros já acumulados, gerando crescimento exponencial."
    },
    {
        question: "Qual é a principal diferença entre débito e crédito?",
        options: [
            "Não há diferença, são iguais",
            "Débito desconta na hora, crédito é uma dívida para pagar depois",
            "Crédito é mais seguro que débito",
            "Débito tem juros e crédito não"
        ],
        correct: 1,
        explanation: "No débito o dinheiro sai imediatamente da sua conta, no crédito você está pegando emprestado para pagar depois."
    },
    {
        question: "O que é inflação?",
        options: [
            "Aumento geral dos preços na economia",
            "Diminuição dos preços dos produtos",
            "Aumento do salário mínimo",
            "Redução das taxas de juros"
        ],
        correct: 0,
        explanation: "Inflação é o aumento generalizado dos preços na economia, fazendo com que o dinheiro perca poder de compra ao longo do tempo."
    },
    {
        question: "Por que é importante diversificar investimentos?",
        options: [
            "Para ganhar mais dinheiro rapidamente",
            "Para reduzir riscos distribuindo o dinheiro em diferentes tipos de investimento",
            "Para pagar menos impostos",
            "Para impressionar outras pessoas"
        ],
        correct: 1,
        explanation: "Diversificar investimentos ajuda a reduzir riscos, pois se um investimento vai mal, outros podem compensar as perdas."
    },
    {
        question: "O que é score de crédito?",
        options: [
            "Quantidade de dinheiro na conta",
            "Pontuação que indica sua probabilidade de pagar dívidas em dia",
            "Número de cartões de crédito que você tem",
            "Valor máximo que você pode gastar"
        ],
        correct: 1,
        explanation: "Score de crédito é uma pontuação que indica para bancos e empresas qual a probabilidade de você pagar suas dívidas em dia."
    },
    {
        question: "Qual é a melhor estratégia para sair das dívidas?",
        options: [
            "Pegar mais empréstimos para quitar tudo",
            "Ignorar as dívidas até elas desaparecerem",
            "Listar todas as dívidas, negociar e pagar as de maior juros primeiro",
            "Pagar apenas o mínimo de cada dívida"
        ],
        correct: 2,
        explanation: "A melhor estratégia é mapear todas as dívidas, negociar condições melhores e priorizar o pagamento das que têm maiores juros."
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
    const question = quiz1Questions[currentQuestion];
    
    // Atualizar elementos da interface
    document.getElementById('questionNumber').textContent = currentQuestion + 1;
    document.getElementById('questionText').textContent = question.question;
    document.getElementById('progressText').textContent = `Pergunta ${currentQuestion + 1} de ${quiz1Questions.length}`;
    
    // Atualizar barra de progresso
    const progress = ((currentQuestion + 1) / quiz1Questions.length) * 100;
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
    const question = quiz1Questions[currentQuestion];
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

// Calcular pontuação
function calculateScore() {
    const baseScore = 100;
    const timeBonus = Math.max(0, 50 - Math.floor((Date.now() - startTime) / 1000 / 10)); // Bônus por velocidade
    return baseScore + timeBonus;
}

// Próxima pergunta
function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < quiz1Questions.length) {
        showQuestion();
    } else {
        finishQuiz();
    }
}

// Finalizar quiz
function finishQuiz() {
    clearInterval(timer);
    const totalTime = Math.floor((Date.now() - startTime) / 1000);
    const percentage = (correctAnswers / quiz1Questions.length) * 100;
    
    // Atualizar modal de resultado
    document.getElementById('finalCorrect').textContent = `${correctAnswers}/${quiz1Questions.length}`;
    document.getElementById('finalScore').textContent = currentScore;
    document.getElementById('finalTime').textContent = formatTime(totalTime);
    
    // Determinar desempenho
    let performance, message;
    if (percentage >= 90) {
        performance = "Excelente! 🏆";
        message = "Parabéns! Você demonstrou excelente conhecimento em finanças pessoais. Continue assim!";
    } else if (percentage >= 70) {
        performance = "Muito Bom! 🎉";
        message = "Ótimo trabalho! Você tem uma boa base de conhecimentos financeiros. Continue estudando!";
    } else if (percentage >= 50) {
        performance = "Bom! 👍";
        message = "Você está no caminho certo! Continue aprendendo para melhorar ainda mais seus conhecimentos.";
    } else {
        performance = "Precisa Melhorar 📚";
        message = "Não desanime! Este é apenas o começo. Continue estudando e pratique mais para melhorar.";
    }
    
    document.getElementById('performance').textContent = performance;
    document.getElementById('resultMessage').innerHTML = `
        <h3>${performance}</h3>
        <p>${message}</p>
    `;
    
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
        completePhase(1, currentScore);
    }
    
    // Ir para próxima fase ou menu
    setTimeout(() => {
        window.location.href = 'flashcards1.html';
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
    
    // Adicionar estilos para explicação
    const explanationStyles = `
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
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = explanationStyles;
    document.head.appendChild(styleSheet);
});

// Eventos de teclado
document.addEventListener('keydown', function(e) {
    // Selecionar opções com teclas A, B, C, D
    if (selectedOption === null && currentQuestion < quiz1Questions.length) {
        const key = e.key.toLowerCase();
        if (['a', 'b', 'c', 'd'].includes(key)) {
            const index = key.charCodeAt(0) - 97; // a=0, b=1, c=2, d=3
            if (index < quiz1Questions[currentQuestion].options.length) {
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

