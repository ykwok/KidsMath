import { useState, useCallback, useRef, useEffect } from 'react';
import type { VoiceState } from '@/types';

// TypeScript declarations for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

const isSpeechSupported = () => 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
const isSynthesisSupported = () => 'speechSynthesis' in window;

export function useSpeech() {
  const [state, setState] = useState<VoiceState>({
    isSupported: isSpeechSupported(),
    isListening: false,
    isSpeaking: false,
    transcript: '',
    confidence: 0,
  });

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (isSynthesisSupported()) {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const startListening = useCallback((): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!isSpeechSupported()) {
        reject(new Error('Speech recognition not supported'));
        return;
      }

      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'zh-CN';
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setState((s) => ({ ...s, isListening: true, transcript: '' }));
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const result = event.results[0][0];
        setState((s) => ({
          ...s,
          transcript: result.transcript,
          confidence: result.confidence,
        }));
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        setState((s) => ({ ...s, isListening: false }));
        reject(new Error(event.error));
      };

      recognition.onend = () => {
        setState((s) => {
          resolve(s.transcript);
          return { ...s, isListening: false };
        });
      };

      recognitionRef.current = recognition;
      recognition.start();
    });
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setState((s) => ({ ...s, isListening: false }));
  }, []);

  const speak = useCallback((text: string): Promise<void> => {
    return new Promise((resolve) => {
      if (!isSynthesisSupported() || !synthRef.current) {
        resolve();
        return;
      }
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.9;
      utterance.pitch = 1.2;

      // Try to find a child-like voice
      const voices = synthRef.current.getVoices();
      const zhVoice = voices.find((v) => v.lang.startsWith('zh') && v.name.includes('Female'))
        || voices.find((v) => v.lang.startsWith('zh'))
        || voices[0];
      if (zhVoice) utterance.voice = zhVoice;

      utterance.onstart = () => setState((s) => ({ ...s, isSpeaking: true }));
      utterance.onend = () => {
        setState((s) => ({ ...s, isSpeaking: false }));
        resolve();
      };
      utterance.onerror = () => {
        setState((s) => ({ ...s, isSpeaking: false }));
        resolve();
      };

      synthRef.current.speak(utterance);
    });
  }, []);

  const cancelSpeech = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setState((s) => ({ ...s, isSpeaking: false }));
  }, []);

  return {
    ...state,
    startListening,
    stopListening,
    speak,
    cancelSpeech,
  };
}
