import { useState } from 'react';
import { FIRST_AID_QUIZ } from '../data/firstAidData';
import { GraduationCap, CheckCircle2, XCircle, Award, RotateCcw, AlertCircle } from 'lucide-react';

export default function InteractiveQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [answersLog, setAnswersLog] = useState<{ questionIndex: number; selectedIndex: number; isCorrect: boolean }[]>([]);

  const currentQuestion = FIRST_AID_QUIZ[currentQuestionIndex];

  const handleOptionSelect = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionIndex(index);
  };

  const handleAnswerSubmit = () => {
    if (selectedOptionIndex === null || isAnswerSubmitted) return;

    const isCorrect = selectedOptionIndex === currentQuestion.answerIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setAnswersLog((prev) => [
      ...prev,
      {
        questionIndex: currentQuestionIndex,
        selectedIndex: selectedOptionIndex,
        isCorrect
      }
    ]);

    setIsAnswerSubmitted(true);
  };

  const handleNext = () => {
    setSelectedOptionIndex(null);
    setIsAnswerSubmitted(false);

    if (currentQuestionIndex < FIRST_AID_QUIZ.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
    setAnswersLog([]);
  };

  const getFeedbackMessage = (finalScore: number) => {
    const ratio = finalScore / FIRST_AID_QUIZ.length;
    if (ratio === 1) return 'Perfect! You are fully equipped with crucial, life-saving knowledge.';
    if (ratio >= 0.7) return 'Great job! You have a solid grasp of fundamental first aid procedures.';
    if (ratio >= 0.4) return 'Good effort. Refreshing your knowledge could help you respond even better in an emergency.';
    return 'We highly recommend reviewing the guides above to ensure you are ready in an emergency.';
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full" id="first-aid-quiz">
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-50 p-2 rounded-xl text-emerald-600">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-lg">First Aid Practice Quiz</h3>
              <p className="text-xs text-slate-500">Test and solidify your emergency readiness</p>
            </div>
          </div>
          {!quizFinished && (
            <span className="text-xs font-mono font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
              Q: {currentQuestionIndex + 1}/{FIRST_AID_QUIZ.length}
            </span>
          )}
        </div>

        {quizFinished ? (
          <div className="text-center py-6 space-y-6 animate-fadeIn">
            <div className="inline-flex p-4 bg-emerald-50 text-emerald-600 rounded-full mb-2">
              <Award className="w-12 h-12" />
            </div>
            <div className="space-y-2">
              <h4 className="text-2xl font-bold text-slate-900">Quiz Completed!</h4>
              <p className="text-3xl font-extrabold text-emerald-600 font-mono">
                {score} / {FIRST_AID_QUIZ.length}
              </p>
              <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                {getFeedbackMessage(score)}
              </p>
            </div>

            <button
              onClick={handleRestart}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium text-sm inline-flex items-center gap-2 cursor-pointer transition-all shadow-sm"
            >
              <RotateCcw className="w-4 h-4" /> Take Quiz Again
            </button>

            {/* Questions Review */}
            <div className="border-t border-slate-100 pt-6 text-left space-y-4">
              <h5 className="font-semibold text-slate-800 text-sm">Review Your Answers:</h5>
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {answersLog.map((log, i) => {
                  const q = FIRST_AID_QUIZ[log.questionIndex];
                  return (
                    <div key={i} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 flex items-start gap-3 text-xs">
                      {log.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      )}
                      <div className="space-y-1">
                        <p className="font-bold text-slate-800">{q.question}</p>
                        <p className="text-slate-500">
                          Your answer:{' '}
                          <span className={log.isCorrect ? 'text-emerald-700 font-medium' : 'text-red-700 font-medium'}>
                            {q.options[log.selectedIndex]}
                          </span>
                        </p>
                        {!log.isCorrect && (
                          <p className="text-slate-500">
                            Correct answer: <span className="text-emerald-700 font-medium">{q.options[q.answerIndex]}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-5 animate-fadeIn">
            {/* Progress Bar */}
            <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${((currentQuestionIndex) / FIRST_AID_QUIZ.length) * 100}%` }}
              />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                {currentQuestion.category}
              </span>
              <h4 className="text-base font-semibold text-slate-800 leading-snug">
                {currentQuestion.question}
              </h4>
            </div>

            <div className="space-y-2.5">
              {currentQuestion.options.map((option, index) => {
                let optionStyle = 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50';

                if (selectedOptionIndex === index && !isAnswerSubmitted) {
                  optionStyle = 'border-emerald-500 bg-emerald-50/30 text-emerald-900';
                }

                if (isAnswerSubmitted) {
                  if (index === currentQuestion.answerIndex) {
                    optionStyle = 'border-emerald-300 bg-emerald-50 text-emerald-900 font-medium';
                  } else if (selectedOptionIndex === index) {
                    optionStyle = 'border-red-200 bg-red-50/50 text-red-900';
                  } else {
                    optionStyle = 'border-slate-100 opacity-60 bg-slate-50/20';
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    disabled={isAnswerSubmitted}
                    className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all flex items-start gap-3 ${
                      !isAnswerSubmitted ? 'cursor-pointer' : 'cursor-default'
                    } ${optionStyle}`}
                    id={`quiz-opt-${index}`}
                  >
                    <span className={`w-5 h-5 rounded-full border shrink-0 flex items-center justify-center font-mono text-[10px] font-bold mt-0.5 ${
                      selectedOptionIndex === index
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'border-slate-300 text-slate-400 bg-white'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="leading-tight">{option}</span>
                  </button>
                );
              })}
            </div>

            {isAnswerSubmitted && (
              <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl text-xs leading-relaxed text-slate-600 flex items-start gap-2.5 animate-fadeIn">
                <AlertCircle className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-800 block mb-0.5">
                    {selectedOptionIndex === currentQuestion.answerIndex ? 'Correct!' : 'Incorrect'}
                  </span>
                  {currentQuestion.explanation}
                </div>
              </div>
            )}

            <div className="pt-2">
              {!isAnswerSubmitted ? (
                <button
                  onClick={handleAnswerSubmit}
                  disabled={selectedOptionIndex === null}
                  className={`w-full py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all ${
                    selectedOptionIndex !== null
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow-sm shadow-emerald-600/10'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  {currentQuestionIndex < FIRST_AID_QUIZ.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-400 leading-relaxed">
        Completing this quiz provides educational feedback only. Practical training from certified instructors is always recommended.
      </div>
    </div>
  );
}
