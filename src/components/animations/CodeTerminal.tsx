
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TypewriterText from './TypewriterText';
import { Terminal } from 'lucide-react';

interface CodeTerminalProps {
  className?: string;
}

const CodeTerminal: React.FC<CodeTerminalProps> = ({ className }) => {
  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0);
  
  // Enhanced code snippets with syntax highlighting classes
  const codeSnippets = [
    `<span class="keyword">import</span> tensorflow <span class="keyword">as</span> tf

<span class="comment"># Create sequential neural network</span>
model = tf.keras.<span class="function">Sequential</span>([
  tf.keras.layers.<span class="class">Dense</span>(<span class="number">128</span>, <span class="string">'relu'</span>),
  tf.keras.layers.<span class="class">Dropout</span>(<span class="number">0.2</span>),
  tf.keras.layers.<span class="class">Dense</span>(<span class="number">10</span>, <span class="string">'softmax'</span>)
])`,

    `<span class="keyword">from</span> sklearn <span class="keyword">import</span> ensemble
<span class="keyword">import</span> numpy <span class="keyword">as</span> np

<span class="comment"># Random forest classifier</span>
model = ensemble.<span class="class">RandomForestClassifier</span>(
  n_estimators=<span class="number">100</span>,
  max_depth=<span class="number">5</span>
)
model.<span class="function">fit</span>(X_train, y_train)`,

    `<span class="keyword">import</span> torch
<span class="keyword">import</span> torch.nn <span class="keyword">as</span> nn

<span class="comment"># PyTorch neural network</span>
<span class="keyword">class</span> <span class="class">NeuralNet</span>(nn.Module):
  <span class="keyword">def</span> <span class="function">__init__</span>(<span class="param">self</span>):
    <span class="param">super</span>().<span class="function">__init__</span>()
    <span class="param">self</span>.linear = nn.<span class="class">Linear</span>(<span class="number">784</span>, <span class="number">10</span>)`
  ];

  // Automatically cycle through code snippets with deletion effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSnippetIndex(prev => (prev + 1) % codeSnippets.length);
    }, 8000); // Change snippet every 8 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className={`bg-gray-900/90 rounded-lg p-2 border border-gray-700/80 shadow-lg ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      {/* Terminal Header with enhanced styling */}
      <div className="flex items-center gap-2 border-b border-gray-700/80 pb-1 mb-1">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs font-mono text-gray-400 flex items-center gap-1">
          <Terminal size={10} />
          <span>ai-model.py</span>
        </div>
      </div>
      
      {/* Terminal Content - With VSCode-like syntax highlighting */}
      <div className="font-mono text-xs overflow-hidden max-h-[120px] code-terminal-content">
        <TypewriterText
          text={codeSnippets[currentSnippetIndex]}
          delay={0.2}
          speed={30}
          repeat={true}
          className="whitespace-pre-wrap"
          useRawHTML={true}
        />
      </div>
      
      {/* Terminal Prompt */}
      <div className="mt-1 font-mono text-xs flex items-center gap-1 text-green-400">
        <span>$</span>
        <motion.span 
          className="h-2.5 w-2.5 bg-green-400 inline-block"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
      </div>
    </motion.div>
  );
};

export default CodeTerminal;
