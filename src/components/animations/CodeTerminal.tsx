
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TypewriterText from './TypewriterText';
import { Terminal, ChevronDown, ChevronUp, Maximize, Minimize } from 'lucide-react';

interface CodeTerminalProps {
  className?: string;
}

const CodeTerminal: React.FC<CodeTerminalProps> = ({ className }) => {
  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Enhanced code snippets with syntax highlighting classes and more code content
  const codeSnippets = [
    `<span class="keyword">import</span> torch
<span class="keyword">import</span> torch.nn <span class="keyword">as</span> nn

<span class="comment"># PyTorch neural network</span>
<span class="keyword">class</span> <span class="class">NeuralNet</span>(nn.Module):
  <span class="keyword">def</span> <span class="function">__init__</span>(<span class="param">self</span>):
    <span class="param">super</span>().<span class="function">__init__</span>()
    <span class="param">self</span>.conv1 = nn.<span class="class">Conv2d</span>(<span class="number">1</span>, <span class="number">32</span>, <span class="number">3</span>)
    <span class="param">self</span>.conv2 = nn.<span class="class">Conv2d</span>(<span class="number">32</span>, <span class="number">64</span>, <span class="number">3</span>)`,

    `<span class="keyword">import</span> tensorflow <span class="keyword">as</span> tf

<span class="comment"># Create sequential neural network</span>
model = tf.keras.<span class="function">Sequential</span>([
  tf.keras.layers.<span class="class">Input</span>(shape=(<span class="number">28</span>, <span class="number">28</span>, <span class="number">1</span>)),
  tf.keras.layers.<span class="class">Conv2D</span>(<span class="number">32</span>, kernel_size=(<span class="number">3</span>, <span class="number">3</span>), 
                      activation=<span class="string">'relu'</span>)`,

    `<span class="keyword">from</span> sklearn <span class="keyword">import</span> ensemble
<span class="keyword">import</span> numpy <span class="keyword">as</span> np

<span class="comment"># Random forest classifier</span>
model = ensemble.<span class="class">RandomForestClassifier</span>(
  n_estimators=<span class="number">100</span>,
  max_depth=<span class="number">5</span>,
  random_state=<span class="number">42</span>
)`
  ];

  // Automatically cycle through code snippets with deletion effect
  // Increasing the interval from 8000 (8 seconds) to 10000 (10 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSnippetIndex(prev => (prev + 1) % codeSnippets.length);
    }, 10000); // Change snippet every 10 seconds instead of 8
    
    return () => clearInterval(interval);
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      className={`bg-gray-900/90 rounded-lg p-2 border border-gray-700/80 shadow-lg ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      {/* Terminal Header with enhanced styling */}
      <div className="flex items-center justify-between border-b border-gray-700/80 pb-1 mb-1">
        <div className="flex items-center gap-2">
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
        <button 
          onClick={toggleExpand} 
          className="text-gray-400 hover:text-white transition-colors"
          aria-label={isExpanded ? "Minimize" : "Maximize"}
        >
          {isExpanded ? <Minimize size={12} /> : <Maximize size={12} />}
        </button>
      </div>
      
      {/* Terminal Content - With VSCode-like syntax highlighting */}
      <div 
        className={`font-mono text-xs overflow-hidden code-terminal-content transition-all duration-300`}
        style={{ maxHeight: isExpanded ? '200px' : '130px' }}
      >
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
      <div className="mt-1 font-mono text-xs flex items-center justify-between">
        <div className="flex items-center gap-1 text-green-400">
          <span>$</span>
          <motion.span 
            className="h-2.5 w-2.5 bg-green-400 inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
          />
        </div>
        <button 
          onClick={toggleExpand}
          className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
          aria-label={isExpanded ? "Show less" : "Show more"}
        >
          {isExpanded ? (
            <>Show less <ChevronUp size={12} /></>
          ) : (
            <>Show more <ChevronDown size={12} /></>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default CodeTerminal;
