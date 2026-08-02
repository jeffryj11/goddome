'use client';

import React, { createContext, useContext, useState } from 'react';
import FaithAssistantModal from './FaithAssistantModal';

interface FaithAssistantContextType {
  isOpen: boolean;
  openAssistant: (initialPrompt?: string) => void;
  closeAssistant: () => void;
}

const FaithAssistantContext = createContext<FaithAssistantContextType>({
  isOpen: false,
  openAssistant: () => {},
  closeAssistant: () => {},
});

export const useFaithAssistant = () => useContext(FaithAssistantContext);

export function FaithAssistantProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialPrompt, setInitialPrompt] = useState('');

  const openAssistant = (prompt?: string) => {
    if (prompt) setInitialPrompt(prompt);
    setIsOpen(true);
  };

  const closeAssistant = () => {
    setIsOpen(false);
  };

  return (
    <FaithAssistantContext.Provider value={{ isOpen, openAssistant, closeAssistant }}>
      {children}
      <FaithAssistantModal isOpen={isOpen} onClose={closeAssistant} initialPrompt={initialPrompt} />
    </FaithAssistantContext.Provider>
  );
}
