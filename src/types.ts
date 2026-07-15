export interface FirstAidStep {
  id: number;
  text: string;
  detail?: string;
  type?: 'do' | 'dont' | 'info' | 'warning';
}

export interface AgeSpecificSteps {
  adult: FirstAidStep[];
  child: FirstAidStep[];
  infant: FirstAidStep[];
}

export interface FirstAidTopic {
  id: string;
  title: string;
  category: 'trauma' | 'medical' | 'environmental' | 'resuscitation';
  icon: string; // Lucide icon name
  severity: 'mild' | 'moderate' | 'critical';
  shortDesc: string;
  quickAction: string; // The immediate action to take in 1 sentence
  steps: FirstAidStep[];
  ageSpecific?: AgeSpecificSteps;
  donts?: string[];
  signs?: string[];
  callAmbulanceImmediately?: boolean;
}

export interface EmergencyContact {
  name: string;
  number: string;
  description: string;
  icon: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  category: string;
}

export interface TriageNode {
  id: string;
  question: string;
  options: {
    text: string;
    nextId?: string; // If leads to another question
    topicId?: string; // If points directly to a topic treatment
    advice?: string; // Quick advice
    critical?: boolean;
  }[];
}
