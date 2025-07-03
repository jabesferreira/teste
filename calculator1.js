// Calculadora de Juros Compostos

// Cenários pré-definidos
const scenarios = {
    conservative: {
        initialAmount: 1000,
        monthlyContribution: 300,
        annualRate: 6,
        timePeriod: 10,
        name: "Conservador"
    },
    moderate: {
        initialAmount: 2000,
        monthlyContribution: 500,
        annualRate: 10,
        timePeriod: 15,
        name: "Moderado"
    },
    aggressive: {
        initialAmount: 5000,
        monthlyContribution: 1000,
        annualRate: 15,
        timePeriod: 20,
        name: "Arrojado"
    }
};

let calculationResults = null;

// Carregar cenário pré-definido
function loadScenario(scenarioType) {
    const scenario = scenarios[scenarioType];
    
    document.getElementById('initialAmount').value = scenario.initialAmount;
    document.getElementById('monthlyContribution').value = scenario.monthlyContribution;
    document.getElementById('annualRate').value = scenario.annualRate;
    document.getElementById('timePeriod').value = scenario.timePeriod;
    
    // Feedback visual
    const buttons = document.querySelectorAll('.scenario-btn');
    buttons.forEach(btn => btn.style.background = 'rgba(255, 255, 255, 0.1)');
    event.target.style.background = 'rgba(0, 128, 255, 0.3)';
    
    // Calcular automaticamente
    setTimeout(() => {
        calculateCompoundInterest();
    }, 500);
}

// Calcular juros compostos
function calculateCompoundInterest() {
    // Obter valores dos inputs
    const initialAmount = parseFloat(document.getElementById('initialAmount').value) || 0;
    const monthlyContribution = parseFloat(document.getElementById('monthlyContribution').value) || 0;
    const annualRate = parseFloat(document.getElementById('annualRate').value) || 0;
    const timePeriod = parseInt(document.getElementById('timePeriod').value) || 0;
    
    // Validar inputs
    if (!validateInputs(initialAmount, monthlyContribution, annualRate, timePeriod)) {
        return;
    }
    
    // Calcular
    const results = performCalculation(initialAmount, monthlyContribution, annualRate, timePeriod);
    calculationResults = results;
    
    // Mostrar resultados
    displayResults(results);
    
    // Mostrar painel de resultados
    document.getElementById('resultsPanel').style.display = 'block';
    
    // Scroll para resultados
    document.getElementById('resultsPanel').scrollIntoView({ behavior: 'smooth' });
}

// Validar inputs
function validateInputs(initial, monthly, rate, time) {
    let isValid = true;
    
    // Limpar erros anteriores
    document.querySelectorAll('.input-group').forEach(group => {
        group.classList.remove('error');
    });
    
    if (initial < 0) {
        showInputError('initialAmount', 'Valor inicial não pode ser negativo');
        isValid = false;
    }
    
    if (monthly < 0) {
        showInputError('monthlyContribution', 'Aporte mensal não pode ser negativo');
        isValid = false;
    }
    
    if (rate < 0 || rate > 100) {
        showInputError('annualRate', 'Taxa deve estar entre 0% e 100%');
        isValid = false;
    }
    
    if (time < 1 || time > 50) {
        showInputError('timePeriod', 'Período deve estar entre 1 e 50 anos');
        isValid = false;
    }
    
    if (initial === 0 && monthly === 0) {
        showInputError('initialAmount', 'Informe pelo menos um valor inicial ou aporte mensal');
        isValid = false;
    }
    
    return isValid;
}

// Mostrar erro no input
function showInputError(inputId, message) {
    const inputGroup = document.getElementById(inputId).closest('.input-group');
    inputGroup.classList.add('error');
    inputGroup.querySelector('small').textContent = message;
}

// Realizar cálculo
function performCalculation(initial, monthly, rate, years) {
    const monthlyRate = rate / 100 / 12;
    const totalMonths = years * 12;
    
    let yearlyData = [];
    let currentAmount = initial;
    let totalInvested = initial;
    
    for (let year = 1; year <= years; year++) {
        for (let month = 1; month <= 12; month++) {
            // Adicionar aporte mensal
            currentAmount += monthly;
            totalInvested += monthly;
            
            // Aplicar juros
            currentAmount *= (1 + monthlyRate);
        }
        
        yearlyData.push({
            year: year,
            amount: currentAmount,
            invested: totalInvested,
            interest: currentAmount - totalInvested
        });
    }
    
    const finalAmount = currentAmount;
    const totalInterest = finalAmount - totalInvested;
    const multiplication = totalInvested > 0 ? finalAmount / totalInvested : 0;
    
    return {
        finalAmount,
        totalInvested,
        totalInterest,
        multiplication,
        yearlyData,
        parameters: { initial, monthly, rate, years }
    };
}

// Exibir resultados
function displayResults(results) {
    // Atualizar resumo
    document.getElementById('finalAmount').textContent = formatCurrency(results.finalAmount);
    document.getElementById('totalInvested').textContent = formatCurrency(results.totalInvested);
    document.getElementById('interestEarned').textContent = formatCurrency(results.totalInterest);
    document.getElementById('multiplication').textContent = results.multiplication.toFixed(2) + 'x';
    
    // Criar gráfico
    createChart(results.yearlyData);
    
    // Criar tabela de evolução
    createYearlyTable(results.yearlyData);
    
    // Gerar insights
    generateInsights(results);
}

// Criar gráfico simples (usando Canvas)
function createChart(data) {
    const canvas = document.getElementById('growthChart');
    const ctx = canvas.getContext('2d');
    
    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Configurações
    const padding = 40;
    const chartWidth = canvas.width - 2 * padding;
    const chartHeight = canvas.height - 2 * padding;
    
    // Encontrar valores máximos
    const maxAmount = Math.max(...data.map(d => d.amount));
    const maxYear = data.length;
    
    // Desenhar eixos
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();
    
    // Desenhar linha do gráfico
    ctx.strokeStyle = '#00aaff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    data.forEach((point, index) => {
        const x = padding + (index / (maxYear - 1)) * chartWidth;
        const y = canvas.height - padding - (point.amount / maxAmount) * chartHeight;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Adicionar pontos
    ctx.fillStyle = '#0080ff';
    data.forEach((point, index) => {
        const x = padding + (index / (maxYear - 1)) * chartWidth;
        const y = canvas.height - padding - (point.amount / maxAmount) * chartHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
    });
    
    // Adicionar labels
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px Poppins';
    ctx.textAlign = 'center';
    
    // Label do eixo Y (valor final)
    ctx.save();
    ctx.translate(15, canvas.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Valor (R$)', 0, 0);
    ctx.restore();
    
    // Label do eixo X
    ctx.fillText('Anos', canvas.width / 2, canvas.height - 10);
}

// Criar tabela de evolução anual
function createYearlyTable(data) {
    const container = document.getElementById('yearlyBreakdown');
    
    let tableHTML = `
        <table>
            <thead>
                <tr>
                    <th>Ano</th>
                    <th>Valor Total</th>
                    <th>Investido</th>
                    <th>Juros</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    data.forEach(row => {
        tableHTML += `
            <tr>
                <td>${row.year}</td>
                <td>${formatCurrency(row.amount)}</td>
                <td>${formatCurrency(row.invested)}</td>
                <td>${formatCurrency(row.interest)}</td>
            </tr>
        `;
    });
    
    tableHTML += '</tbody></table>';
    container.innerHTML = tableHTML;
}

// Gerar insights
function generateInsights(results) {
    const container = document.getElementById('insightsContent');
    const { parameters, finalAmount, totalInvested, totalInterest, multiplication } = results;
    
    let insights = [];
    
    // Insight sobre multiplicação
    if (multiplication >= 5) {
        insights.push({
            title: "🚀 Crescimento Exponencial",
            text: `Seu dinheiro multiplicou por ${multiplication.toFixed(1)}x! Isso mostra o poder dos juros compostos no longo prazo.`
        });
    } else if (multiplication >= 2) {
        insights.push({
            title: "📈 Bom Crescimento",
            text: `Seu investimento dobrou de valor! Com ${multiplication.toFixed(1)}x de multiplicação, você está no caminho certo.`
        });
    }
    
    // Insight sobre aportes
    if (parameters.monthly > 0) {
        const aporteTotal = parameters.monthly * parameters.years * 12;
        const percentualAporte = (aporteTotal / totalInvested) * 100;
        insights.push({
            title: "💪 Poder dos Aportes",
            text: `Os aportes mensais representam ${percentualAporte.toFixed(0)}% do total investido. Manter a disciplina é fundamental!`
        });
    }
    
    // Insight sobre tempo
    if (parameters.years >= 20) {
        insights.push({
            title: "⏰ Tempo é Seu Aliado",
            text: `Com ${parameters.years} anos de investimento, você aproveitou bem o poder do tempo nos juros compostos.`
        });
    } else if (parameters.years < 10) {
        insights.push({
            title: "⏰ Considere Mais Tempo",
            text: `Aumentar o prazo para 15-20 anos pode multiplicar significativamente seus resultados.`
        });
    }
    
    // Insight sobre rentabilidade
    if (parameters.rate >= 12) {
        insights.push({
            title: "⚠️ Alta Rentabilidade",
            text: `Taxa de ${parameters.rate}% é ambiciosa. Lembre-se: maior retorno geralmente significa maior risco.`
        });
    } else if (parameters.rate < 6) {
        insights.push({
            title: "🛡️ Investimento Conservador",
            text: `Taxa de ${parameters.rate}% é conservadora. Considere diversificar para buscar rentabilidades maiores.`
        });
    }
    
    // Renderizar insights
    let insightsHTML = '';
    insights.forEach(insight => {
        insightsHTML += `
            <div class="insight-item">
                <h4>${insight.title}</h4>
                <p>${insight.text}</p>
            </div>
        `;
    });
    
    container.innerHTML = insightsHTML;
}

// Formatar moeda
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

// Limpar calculadora
function clearCalculator() {
    document.getElementById('initialAmount').value = '';
    document.getElementById('monthlyContribution').value = '';
    document.getElementById('annualRate').value = '';
    document.getElementById('timePeriod').value = '';
    
    document.getElementById('resultsPanel').style.display = 'none';
    
    // Limpar erros
    document.querySelectorAll('.input-group').forEach(group => {
        group.classList.remove('error');
    });
    
    // Resetar cenários
    document.querySelectorAll('.scenario-btn').forEach(btn => {
        btn.style.background = 'rgba(255, 255, 255, 0.1)';
    });
}

// Compartilhar resultados
function shareResults() {
    if (!calculationResults) {
        alert('Faça um cálculo primeiro!');
        return;
    }
    
    const summary = generateShareSummary(calculationResults);
    document.getElementById('shareSummary').innerHTML = summary;
    document.getElementById('shareModal').style.display = 'block';
}

// Gerar resumo para compartilhamento
function generateShareSummary(results) {
    const { parameters, finalAmount, totalInvested, totalInterest, multiplication } = results;
    
    return `
        <h3>💰 Simulação de Investimento</h3>
        <p><strong>Valor Inicial:</strong> ${formatCurrency(parameters.initial)}</p>
        <p><strong>Aporte Mensal:</strong> ${formatCurrency(parameters.monthly)}</p>
        <p><strong>Taxa Anual:</strong> ${parameters.rate}%</p>
        <p><strong>Período:</strong> ${parameters.years} anos</p>
        <hr style="margin: 15px 0; border: 1px solid rgba(255,255,255,0.2);">
        <p><strong>Valor Final:</strong> ${formatCurrency(finalAmount)}</p>
        <p><strong>Total Investido:</strong> ${formatCurrency(totalInvested)}</p>
        <p><strong>Juros Ganhos:</strong> ${formatCurrency(totalInterest)}</p>
        <p><strong>Multiplicação:</strong> ${multiplication.toFixed(2)}x</p>
        <hr style="margin: 15px 0; border: 1px solid rgba(255,255,255,0.2);">
        <p><em>Simulação feita no Jogo de Saúde Financeira</em></p>
    `;
}

// Copiar para clipboard
function copyToClipboard() {
    const text = document.getElementById('shareSummary').innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert('Texto copiado para a área de transferência!');
    });
}

// Download PDF (simulado)
function downloadPDF() {
    alert('Funcionalidade de PDF será implementada em breve!');
}

// Fechar modal de compartilhamento
function closeShareModal() {
    document.getElementById('shareModal').style.display = 'none';
}

// Completar fase da calculadora
function completeCalculatorPhase() {
    const score = calculateCalculatorScore();
    
    // Salvar pontuação e completar fase
    if (typeof completePhase === 'function') {
        completePhase(3, score);
    }
    
    // Ir para próxima fase
    setTimeout(() => {
        window.location.href = 'matching1.html';
    }, 1000);
}

// Calcular pontuação da calculadora
function calculateCalculatorScore() {
    let score = 100; // Pontuação base por usar a calculadora
    
    if (calculationResults) {
        score += 150; // Bônus por fazer cálculo
        
        // Bônus baseado nos parâmetros usados
        const { parameters } = calculationResults;
        if (parameters.years >= 10) score += 50; // Bônus por pensar no longo prazo
        if (parameters.monthly > 0) score += 50; // Bônus por planejar aportes
        if (parameters.rate >= 8 && parameters.rate <= 15) score += 30; // Bônus por taxa realista
    }
    
    return score;
}

// Voltar ao menu principal
function returnToMenu() {
    if (confirm('Tem certeza que deseja voltar ao menu?')) {
        window.location.href = '../index.html';
    }
}

// Eventos de teclado
document.addEventListener('keydown', function(e) {
    // Calcular com Enter
    if (e.key === 'Enter') {
        calculateCompoundInterest();
    }
    
    // Limpar com Delete
    if (e.key === 'Delete') {
        clearCalculator();
    }
    
    // Voltar ao menu com Escape
    if (e.key === 'Escape') {
        returnToMenu();
    }
});

// Fechar modal clicando fora
window.onclick = function(event) {
    const shareModal = document.getElementById('shareModal');
    if (event.target === shareModal) {
        closeShareModal();
    }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar eventos aos inputs para validação em tempo real
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            // Remover erro quando usuário começar a digitar
            this.closest('.input-group').classList.remove('error');
        });
    });
});

// Exportar funções para uso global
window.loadScenario = loadScenario;
window.calculateCompoundInterest = calculateCompoundInterest;
window.clearCalculator = clearCalculator;
window.shareResults = shareResults;
window.copyToClipboard = copyToClipboard;
window.downloadPDF = downloadPDF;
window.closeShareModal = closeShareModal;
window.completeCalculatorPhase = completeCalculatorPhase;
window.returnToMenu = returnToMenu;

