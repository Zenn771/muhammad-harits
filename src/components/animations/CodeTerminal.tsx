
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TypewriterText from './TypewriterText';
import { Terminal } from 'lucide-react';

interface CodeTerminalProps {
  className?: string;
}

const CodeTerminal: React.FC<CodeTerminalProps> = ({ className }) => {
  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0);
  
  // Shorter AI/ML code snippets to prevent layout distortion
  const codeSnippets = [
    `# Neural Network in Python
import tensorflow as tf

model = tf.keras.Sequential([
  tf.keras.layers.Dense(128, 'relu'),
  tf.keras.layers.Dropout(0.2),
  tf.keras.layers.Dense(10, 'softmax')
])`,
    `# Machine Learning Model
import sklearn
from sklearn import ensemble

model = ensemble.RandomForestClassifier()
model.fit(X_train, y_train)`,
    `# PyTorch Deep Learning
import torch.nn as nn

class NeuralNet(nn.Module):
  def __init__(self):
    super().__init__()
    self.linear = nn.Linear(784, 10)
    
  def forward(self, x):
    return self.linear(x.view(-1, 784))`
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
      className={`bg-gray-900/90 rounded-lg p-2 border border-gray-700 shadow-lg ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 border-b border-gray-700 pb-1 mb-1">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs font-mono text-gray-400 flex items-center gap-1">
          <Terminal size={10} />
          <span>ai-model.py</span>
        </div>
      </div>
      
      {/* Terminal Content - More compact with smaller text */}
      <div className="font-mono text-xs overflow-hidden max-h-[100px]">
        <TypewriterText
          text={codeSnippets[currentSnippetIndex]}
          delay={0.2}
          speed={30}
          repeat={true}
          className="text-green-400 whitespace-pre-wrap"
        />
      </div>
      
      {/* Terminal Prompt */}
      <div className="mt-1 font-mono text-xs flex items-center gap-1">
        <span className="text-green-500">$</span>
        <motion.span 
          className="h-2 w-2 bg-green-500 inline-block"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
      </div>
    </motion.div>
  );
};

export default CodeTerminal;
