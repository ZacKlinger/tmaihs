import { QuizQuestion as QuizQuestionType } from "@/lib/bypassQuizData";
import { QuizMultipleChoice } from "./QuizMultipleChoice";
import { QuizTrueFalse } from "./QuizTrueFalse";
import { QuizSelectAll } from "./QuizSelectAll";
import { QuizMatching } from "./QuizMatching";

export type QuizAnswer = 
  | { type: 'multiple-choice'; value: number | null }
  | { type: 'true-false'; value: boolean | null }
  | { type: 'select-all'; value: number[] }
  | { type: 'matching'; value: Record<number, number> };

interface QuizQuestionProps {
  question: QuizQuestionType;
  answer: QuizAnswer;
  onAnswer: (answer: QuizAnswer) => void;
  showResults: boolean;
  questionNumber: number;
}

export const QuizQuestion = ({
  question,
  answer,
  onAnswer,
  showResults,
  questionNumber,
}: QuizQuestionProps) => {
  switch (question.type) {
    case 'multiple-choice':
      return (
        <QuizMultipleChoice
          question={question}
          selectedAnswer={answer.type === 'multiple-choice' ? answer.value : null}
          onSelect={(index) => onAnswer({ type: 'multiple-choice', value: index })}
          showResults={showResults}
          questionNumber={questionNumber}
        />
      );
    
    case 'true-false':
      return (
        <QuizTrueFalse
          question={question}
          selectedAnswer={answer.type === 'true-false' ? answer.value : null}
          onSelect={(value) => onAnswer({ type: 'true-false', value })}
          showResults={showResults}
          questionNumber={questionNumber}
        />
      );
    
    case 'select-all':
      return (
        <QuizSelectAll
          question={question}
          selectedAnswers={answer.type === 'select-all' ? answer.value : []}
          onToggle={(index) => {
            const current = answer.type === 'select-all' ? answer.value : [];
            const newValue = current.includes(index)
              ? current.filter(i => i !== index)
              : [...current, index];
            onAnswer({ type: 'select-all', value: newValue });
          }}
          showResults={showResults}
          questionNumber={questionNumber}
        />
      );
    
    case 'matching':
      return (
        <QuizMatching
          question={question}
          selectedMatches={answer.type === 'matching' ? answer.value : {}}
          onMatch={(leftIndex, rightIndex) => {
            const current = answer.type === 'matching' ? answer.value : {};
            onAnswer({ type: 'matching', value: { ...current, [leftIndex]: rightIndex } });
          }}
          showResults={showResults}
          questionNumber={questionNumber}
        />
      );
    
    default:
      return null;
  }
};

export const createEmptyAnswer = (question: QuizQuestionType): QuizAnswer => {
  switch (question.type) {
    case 'multiple-choice':
      return { type: 'multiple-choice', value: null };
    case 'true-false':
      return { type: 'true-false', value: null };
    case 'select-all':
      return { type: 'select-all', value: [] };
    case 'matching':
      return { type: 'matching', value: {} };
  }
};

export const isAnswerComplete = (question: QuizQuestionType, answer: QuizAnswer | undefined): boolean => {
  if (!answer) return false;
  switch (question.type) {
    case 'multiple-choice':
      return answer.type === 'multiple-choice' && answer.value !== null;
    case 'true-false':
      return answer.type === 'true-false' && answer.value !== null;
    case 'select-all':
      return answer.type === 'select-all' && answer.value.length > 0;
    case 'matching':
      if (answer.type !== 'matching') return false;
      return Object.keys(answer.value).length === question.pairs.length;
  }
};

export const isAnswerCorrect = (question: QuizQuestionType, answer: QuizAnswer): boolean => {
  switch (question.type) {
    case 'multiple-choice':
      return answer.type === 'multiple-choice' && answer.value === question.correctIndex;
    case 'true-false':
      return answer.type === 'true-false' && answer.value === question.correctAnswer;
    case 'select-all':
      if (answer.type !== 'select-all') return false;
      return (
        answer.value.length === question.correctIndices.length &&
        answer.value.every(idx => question.correctIndices.includes(idx))
      );
    case 'matching':
      if (answer.type !== 'matching') return false;
      return question.pairs.every((_, idx) => answer.value[idx] === idx);
  }
};
