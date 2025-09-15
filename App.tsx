import React, { useState } from 'react';
import { analyzeContent } from './services/geminiService';
import { AnalysisResult, Tab } from './types';
import { Loader } from './components/Loader';
import { MermaidChart } from './components/MermaidChart';
import { DataChart } from './components/DataChart';
import { 
  BrainCircuitIcon, 
  SparklesIcon, 
  HelpCircleIcon,
  BookOpenIcon,
  MessageSquareQuestionIcon,
  FlowchartIcon,
  ChartIcon,
} from './components/Icons';

const initialText = `🔋 CURTAILMENT: O Guia Completo para Entender o Excedente Energético Global

## 📋 Índice
1. [O que é Curtailment para "Idiotas"](#o-que-é-curtailment-para-idiotas)
2. [Glossário Essencial](#glossário-essencial)
3. [Os Três Tipos de Curtailment](#os-três-tipos-de-curtailment)
4. [Excedente Global 2025-2030](#excedente-global-2025-2030)
5. [Interligação Global](#interligação-global)
6. [Perguntas Críticas](#perguntas-críticas)
7. [Soluções e Oportunidades](#soluções-e-oportunidades)

---

## 🤔 O que é Curtailment para "Idiotas"

Imagine que você tem uma **torneira que não para de pingar** (energia renovável) mas seu **balde já está cheio** (demanda atendida). O **curtailment** é quando você tem que:

- 🚰 **"Fechar a torneira"** temporariamente
- 💸 **Jogar água fora** porque não tem onde armazenar
- 🔌 **Desconectar** a fonte para não sobrecarregar o sistema

### Analogia da Padaria
É como uma padaria que faz 1000 pães por dia, mas só vende 600:
- **400 pães "sobram"** (excesso de produção)
- **Não pode guardar** todos (falta armazenamento)
- **Tem que descartar** (curtailment)
- **Perde dinheiro** no processo

---

## 📚 Glossário Essencial

| Termo | Significado Simples | Significado Técnico |
|-------|-------------------|-------------------|
| **Curtailment** | "Desligar" energia renovável | Redução forçada da geração renovável |
| **TWh** | Terawatt-hora | 1 trilhão de watts por hora |
| **GW** | Gigawatt | 1 bilhão de watts |
| **Merit Order** | "Fila de prioridade" | Ordem de despacho por custo |
| **TSO** | "Controlador da rede" | Transmission System Operator |
| **BESS** | "Bateria gigante" | Battery Energy Storage System |
| **V2G** | "Carro vira bateria" | Vehicle-to-Grid |
| **MMGD** | "Energia caseira" | Micro e Minigeração Distribuída |
| **aFRR** | "Ajuste automático" | automatic Frequency Restoration Reserve |
| **Preços Negativos** | "Te pagam para consumir" | Preços abaixo de zero no mercado |

---

## ⚡ Os Três Tipos de Curtailment

### 1️⃣ **Curtailment Econômico** 💰
**O que é:** Sobrou energia, preços ficaram negativos
**Exemplo Real:** Holanda pagou -7,45€/MWh (te pagavam para usar energia)
**Quem ganha:** Quem consome energia
**Quem perde:** Quem produz energia

### 2️⃣ **Curtailment Técnico** ⚡
**O que é:** A rede não aguenta, precisa desligar para não quebrar
**Exemplo:** Cabo de energia "entupido", precisa reduzir fluxo
**Decisão:** Operador do sistema (ONS no Brasil)
**Prioridade:** Segurança da rede

### 3️⃣ **Curtailment Flexível** 🔄
**O que é:** Usa o "corte" como serviço para equilibrar a rede
**Inovação:** Transforma problema em oportunidade de lucro
**Mercado:** Serviços ancilares, balanceamento
**Resultado:** Ganha dinheiro cortando energia

---

## 🌍 Excedente Global 2025-2030: Os Números Brutais

### **Crescimento Explosivo da Capacidade**
- **2025:** Renováveis representarão 35% da geração global
- **2030:** Capacidade renovável vai **triplicar** (11 TW globalmente)
- **Realidade:** Crescimento de 5.500 GW entre 2024-2030

### **Demanda vs. Oferta: O Descompasso**

| Ano | Demanda Global | Capacidade Renovável | **Excedente Potencial** |
|-----|---------------|---------------------|------------------------|
| **2025** | ~31.000 TWh | ~40.000 TWh | **9.000 TWh** (29%) |
| **2030** | ~38.000 TWh | ~65.000 TWh | **27.000 TWh** (71%) |
---
`;

function App() {
  const [inputText, setInputText] = useState<string>(initialText);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('refined');

  const handleAnalyzeClick = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text to analyze.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeContent(inputText);
      setAnalysisResult(result);
      setActiveTab('refined'); // Reset to the first tab on new analysis
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderTabContent = () => {
    if (!analysisResult) return null;

    switch (activeTab) {
      case 'refined':
        return (
          <div className="prose prose-invert max-w-none prose-p:text-slate-300 prose-headings:text-sky-400">
            <h3 className="text-xl font-semibold mb-4 text-sky-400">Refined Content</h3>
            <p className="whitespace-pre-wrap">{analysisResult.refinedContent}</p>
          </div>
        );
      case 'questions':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-sky-400">Generated Questions</h3>
            <ul className="space-y-3 list-disc list-inside">
              {analysisResult.generatedQuestions.map((q, i) => (
                <li key={i} className="text-slate-300">{q}</li>
              ))}
            </ul>
          </div>
        );
      case 'glossary':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-sky-400">Glossary</h3>
            <dl className="space-y-4">
              {analysisResult.glossary.map((item, i) => (
                <div key={i}>
                  <dt className="font-semibold text-sky-400">{item.term}</dt>
                  <dd className="text-slate-300 pl-4">{item.definition}</dd>
                </div>
              ))}
            </dl>
          </div>
        );
        case 'answers':
            return (
              <div>
                <h3 className="text-xl font-semibold mb-4 text-sky-400">Answers to Your Questions</h3>
                <div className="space-y-4">
                  {analysisResult.userAnswers.map((ua, i) => (
                    <div key={i} className="p-4 bg-slate-800 rounded-lg">
                      <p className="font-semibold text-slate-300">{ua.question}</p>
                      <p className="mt-2 text-sky-300">{ua.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
        case 'flows':
          return (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-sky-400">Energy Flowcharts</h3>
              <div className="p-4 bg-slate-900 rounded-lg flex justify-center">
                 <MermaidChart chartData={analysisResult.energyFlows} />
              </div>
            </div>
          );
        case 'viz':
          return (
             <div>
                <h3 className="text-xl font-semibold mb-4 text-sky-400">Data Visualization</h3>
                <div className="h-96 w-full p-4 bg-slate-900 rounded-lg">
                  <DataChart data={analysisResult.chartData} />
                </div>
            </div>
          );
      default:
        return null;
    }
  };

  const tabs: { id: Tab; label: string; icon: React.FC<{className?: string}> }[] = [
    { id: 'refined', label: 'Refined', icon: SparklesIcon },
    { id: 'questions', label: 'Questions', icon: HelpCircleIcon },
    { id: 'glossary', label: 'Glossary', icon: BookOpenIcon },
    { id: 'answers', label: 'Answers', icon: MessageSquareQuestionIcon },
    { id: 'flows', label: 'Flows', icon: FlowchartIcon },
    { id: 'viz', label: 'Viz', icon: ChartIcon },
  ];

  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 font-sans p-4 sm:p-8">
      <main className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-4">
            <BrainCircuitIcon className="w-12 h-12 text-sky-400" />
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-100">AI Content Analysis Engine</h1>
          </div>
          <p className="text-slate-400 mt-2">
            Paste your text below to refine it, generate insights, and visualize data with Gemini.
          </p>
        </header>

        <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
          <label htmlFor="content-input" className="block text-sm font-medium text-slate-300 mb-2">
            Your content
          </label>
          <textarea
            id="content-input"
            rows={10}
            className="w-full bg-slate-900 border border-slate-700 rounded-md p-3 text-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-150"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to analyze..."
          />
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleAnalyzeClick}
              disabled={isLoading}
              className="px-6 py-2 bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-700 disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center gap-2 transition-colors duration-200"
            >
              {isLoading ? 'Analyzing...' : 'Analyze Content'}
            </button>
          </div>
        </div>

        <div className="mt-8">
          {isLoading && (
            <div className="flex justify-center items-center p-12">
              <Loader />
            </div>
          )}
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg text-center">
              <p><strong>Error:</strong> {error}</p>
            </div>
          )}
          {analysisResult && (
            <div className="bg-slate-800 rounded-lg shadow-xl overflow-hidden">
              <div className="border-b border-slate-700">
                <nav className="flex flex-wrap -mb-px px-4" aria-label="Tabs">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        ${activeTab === tab.id
                          ? 'border-sky-500 text-sky-400'
                          : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-500'
                        }
                        group inline-flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 mr-4
                      `}
                    >
                      <tab.icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
              <div className="p-6">
                {renderTabContent()}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;