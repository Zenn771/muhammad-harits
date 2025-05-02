
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TypewriterText from './TypewriterText';
import { Terminal } from 'lucide-react';

interface CodeTerminalProps {
  className?: string;
}

const CodeTerminal: React.FC<CodeTerminalProps> = ({ className }) => {
  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0);
  
  // AI/ML code snippets to display in the terminal
  const codeSnippets = [
    `# Neural Network in Python
import tensorflow as tf

model = tf.keras.Sequential([
  tf.keras.layers.Dense(128, activation='relu'),
  tf.keras.layers.Dropout(0.2),
  tf.keras.layers.Dense(10, activation='softmax')
])`,
    `# Machine Learning Model Training
from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier()
model.fit(X_train, y_train)
predictions = model.predict(X_test)`,
    `# Deep Learning with PyTorch
import torch
import torch.nn as nn

class NeuralNetwork(nn.Module):
  def __init__(self):
    super().__init__()
    self.flatten = nn.Flatten()
    self.linear_stack = nn.Sequential(
      nn.Linear(28*28, 512),
      nn.ReLU(),
      nn.Linear(512, 10)
    )
    
  def forward(self, x):
    x = self.flatten(x)
    return self.linear_stack(x)`
  ];

  // Automatically cycle through code snippets
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSnippetIndex(prev => (prev + 1) % codeSnippets.length);
    }, 15000); // Change snippet every 15 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className={`bg-gray-900/90 rounded-lg p-3 border border-gray-700 shadow-lg ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 border-b border-gray-700 pb-2 mb-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs font-mono text-gray-400 flex items-center gap-1.5">
          <Terminal size={12} />
          <span>ai-model-training.py</span>
        </div>
      </div>
      
      {/* Terminal Content */}
      <div className="font-mono text-xs md:text-sm overflow-hidden">
        <TypewriterText
          text={codeSnippets[currentSnippetIndex]}
          delay={0.2}
          speed={20}
          repeat={false}
          className="text-green-400 whitespace-pre-wrap"
        />
      </div>
      
      {/* Terminal Prompt */}
      <div className="mt-2 font-mono text-xs flex items-center gap-1.5">
        <span className="text-green-500">$</span>
        <motion.span 
          className="h-3 w-3 bg-green-500 inline-block"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
      </div>
    </motion.div>
  );
};

export default CodeTerminal;
