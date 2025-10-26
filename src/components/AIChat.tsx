'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Bot, X, Send } from 'lucide-react'

interface Message {
  id: string
  sender: 'user' | 'ai'
  content: string
  timestamp: Date
}

interface AIChatProps {
  isOpen: boolean
  onClose: () => void
}

export default function AIChat({ isOpen, onClose }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      content: 'Bonjour ! Je suis votre assistant IA. Comment puis-je vous aider avec votre document aujourd\'hui ?',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    // Simuler une réponse de l'IA
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: getAIResponse(inputMessage),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)
    }, 1000)
  }

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('cv') || lowerMessage.includes('curriculum')) {
      return 'Pour votre CV, je vous suggère d\'utiliser des verbes d\'action forts comme "développé", "géré", "optimisé". N\'oubliez pas de quantifier vos réalisations avec des chiffres précis.'
    }
    
    if (lowerMessage.includes('expérience') || lowerMessage.includes('travail')) {
      return 'Dans la section expérience, mettez en avant vos réalisations plutôt que vos tâches. Par exemple : "Augmenté les ventes de 35%" est plus impactant que "Responsable des ventes".'
    }
    
    if (lowerMessage.includes('lettre') || lowerMessage.includes('motivation')) {
      return 'Votre lettre de motivation doit être personnalisée pour chaque entreprise. Mentionnez des points spécifiques qui vous attirent chez eux et comment vos compétences correspondent à leurs besoins.'
    }
    
    if (lowerMessage.includes('formation') || lowerMessage.includes('études')) {
      return 'Listez vos formations par ordre chronologique inverse. Mentionnez les diplômes obtenus, les dates et les établissements. Si vous êtes récemment diplômé, mettez cette section en avant.'
    }
    
    if (lowerMessage.includes('compétence') || lowerMessage.includes('skill')) {
      return 'Classez vos compétences par catégories : techniques, linguistiques, et interpersonnelles. Soyez honnête sur votre niveau et adaptez-les au poste visé.'
    }
    
    return 'Je suis là pour vous aider ! N\'hésitez pas à me poser des questions spécifiques sur votre document, que ce soit pour le contenu, la structure ou la mise en forme.'
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-t-2xl flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="font-semibold">Coach DocAfrik</div>
            <div className="text-xs opacity-90 flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>En ligne</span>
            </div>
          </div>
        </div>
        <Button variant="ghost" onClick={onClose} className="text-white/80 hover:text-white p-0">
          <X className="w-5 h-5" />
        </Button>
      </div>
      
      <div className="h-96 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex space-x-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
            {message.sender === 'ai' && (
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-blue-600" />
              </div>
            )}
            
            <div className={`max-w-[80%] ${
              message.sender === 'user' 
                ? 'bg-blue-600 text-white rounded-2xl rounded-tr-none px-4 py-3 ml-8' 
                : 'bg-gray-50 rounded-2xl rounded-tl-none px-4 py-3'
            }`}>
              <p className={`text-sm ${message.sender === 'user' ? 'text-white' : 'text-gray-700'}`}>
                {message.content}
              </p>
              <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                {message.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            
            {message.sender === 'user' && (
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-medium text-gray-600">U</span>
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-blue-600" />
            </div>
            <div className="bg-gray-50 rounded-2xl rounded-tl-none px-4 py-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <Input 
            type="text" 
            placeholder="Posez votre question..." 
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm" 
          />
          <Button 
            onClick={sendMessage} 
            disabled={isLoading}
            className="bg-blue-600 text-white p-2.5 rounded-lg hover:bg-blue-700"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}