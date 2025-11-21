'use client';

import { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import { quizQuestions } from '@/lib/data';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import clsx from 'clsx';

export default function QuizPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const handleAnswerClick = (index: number) => {
        if (isAnswered) return;

        setSelectedAnswer(index);
        setIsAnswered(true);

        if (index === quizQuestions[currentQuestion].answer) {
            setScore(score + 1);
        }

        setTimeout(() => {
            if (currentQuestion < quizQuestions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setSelectedAnswer(null);
                setIsAnswered(false);
            } else {
                setShowScore(true);
            }
        }, 1500);
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setSelectedAnswer(null);
        setIsAnswered(false);
    };

    return (
        <main className="min-h-screen w-full bg-black text-white flex flex-col">
            <Navbar />

            <div className="flex-grow flex items-center justify-center p-6 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[128px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600 rounded-full blur-[128px]" />
                </div>

                <div className="relative z-10 w-full max-w-2xl">
                    <AnimatePresence mode="wait">
                        {showScore ? (
                            <motion.div
                                key="score"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 text-center"
                            >
                                <h2 className="text-4xl font-bold mb-4">Quiz Completed!</h2>
                                <p className="text-xl text-gray-300 mb-8">
                                    You scored <span className="text-orange-400 font-bold">{score}</span> out of {quizQuestions.length}
                                </p>
                                <button
                                    onClick={resetQuiz}
                                    className="px-8 py-3 bg-orange-500 hover:bg-orange-600 rounded-full font-bold transition-colors flex items-center gap-2 mx-auto"
                                >
                                    <RefreshCw className="w-5 h-5" /> Try Again
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="question"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12"
                            >
                                <div className="flex justify-between items-center mb-8">
                                    <span className="text-sm font-mono text-gray-400">
                                        Question {currentQuestion + 1}/{quizQuestions.length}
                                    </span>
                                    <span className="text-sm font-mono text-orange-400">
                                        Score: {score}
                                    </span>
                                </div>

                                <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-relaxed">
                                    {quizQuestions[currentQuestion].question}
                                </h2>

                                <div className="grid gap-4">
                                    {quizQuestions[currentQuestion].options.map((option, index) => {
                                        const isSelected = selectedAnswer === index;
                                        const isCorrect = index === quizQuestions[currentQuestion].answer;

                                        let buttonStyle = "bg-white/5 hover:bg-white/10 border-white/10";
                                        if (isAnswered) {
                                            if (isCorrect) buttonStyle = "bg-green-500/20 border-green-500 text-green-400";
                                            else if (isSelected) buttonStyle = "bg-red-500/20 border-red-500 text-red-400";
                                            else buttonStyle = "bg-white/5 border-white/10 opacity-50";
                                        }

                                        return (
                                            <button
                                                key={index}
                                                onClick={() => handleAnswerClick(index)}
                                                disabled={isAnswered}
                                                className={clsx(
                                                    "w-full p-4 rounded-xl border text-left transition-all duration-200 flex justify-between items-center group",
                                                    buttonStyle
                                                )}
                                            >
                                                <span className="font-medium">{option}</span>
                                                {isAnswered && isCorrect && <CheckCircle className="w-5 h-5 text-green-400" />}
                                                {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-400" />}
                                            </button>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </main>
    );
}
